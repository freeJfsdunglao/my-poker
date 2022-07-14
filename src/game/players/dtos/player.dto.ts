import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { PlayerStatus } from "src/common/constants";
import { Player } from "../entity/player.entity";

export class PlayerDto extends Player {
    @IsEnum(PlayerStatus)
    @IsNotEmpty()
    status: PlayerStatus = PlayerStatus.PLAYING;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
    })
    @IsNotEmpty()
    @IsPositive()
    seatNumber: number;

    @IsArray()
    handCards: string[] = [];

    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
    })
    @IsPositive()
    totalBetAmount: number = 0;
}