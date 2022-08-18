import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePlayerDto } from "../dtos/create-player.dto";
import { UpdatePlayerDto } from "../dtos/update-player.dto";
import { Player } from "../entity/player.entity";

@Injectable()
export class PlayerDbFactory {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
    ) {}

    public get repository(): Repository<Player> {
        return this.playerRepository;
    }

    public async create(dto: CreatePlayerDto): Promise<Player> {
        return await this.playerRepository.save({
            username: dto.username,
            chipAmount: dto.chipAmount,
        });
    }

    public async update(uuid: string, dto: UpdatePlayerDto): Promise<void> {
        await this.playerRepository.update({ uuid }, dto);
    }

    public async fetch(uuid: string): Promise<Player> {
        return await this.playerRepository.findOneOrFail(uuid);
    }
}