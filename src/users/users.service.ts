import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { UserRegistrationDto } from './dtos/user-registration.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
    ) {}
    
    private async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }    
    
    private async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }
    
    private async create(dto: UserRegistrationDto): Promise<User> {
        return await this.userRepository.save(dto);
    }
    
    async update(dto: UserUpdateDto, user: User): Promise<User> {
        if (dto.username) {
            user.username = dto.username;
        }
        
        if (dto.fullName) {
            user.fullName = dto.fullName;
        }
        
        if (dto.password && dto.confirmPassword === dto.password) {
            user.password = dto.password;
        } else if (dto.password && dto.confirmPassword !== dto.password) {
            throw new BadRequestException('Passwords do not match');
        }
        
        if (dto.phoneNumber) {
            user.phoneNumber = dto.phoneNumber;
        }
        
        return await this.userRepository.save(user);
    }
    
    async userUpdate(id: number, dto: UserUpdateDto): Promise<User> {
        const user = await this.findOneById(id);
        
        if (!user) {
            throw new BadRequestException('Invalid user update');
        }
        
        return await this.update(dto, user);
    }
    
    async userCreate(dto: UserRegistrationDto): Promise<User> {
        return await this.create(dto);
    }

    async findOneByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({ username });
    }
}
