import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGameTableDto } from "../dtos/create-game-table.dto";
import { GameTable } from "../entities/game-table.entity";

@Injectable()
export class GameTableDbFactory {
    constructor(
        @InjectRepository(GameTable)
        private readonly gameTableRepository: Repository<GameTable>,
    ) {}

    async saveToDatabase(dto: CreateGameTableDto): Promise<GameTable> {
        return await this.gameTableRepository.save({
            type: dto.type,
            blindAmount: dto.blindAmount,
            seatLimit: dto.seatLimit,
            isPrivate: dto.isPrivate,
        });
    }
}