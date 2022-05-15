import { Type } from "class-transformer";
import { 
    IsAlphanumeric, 
    IsArray, 
    IsEnum, 
    IsNotEmpty, 
    IsNumber, 
    IsPositive, 
    IsString, 
    ValidateNested 
} from "class-validator";
import { PlayerStatus, PlayerType } from "src/common/constants";
import { CreateBetDto } from "src/game/bets/dtos/create-bet.dto";

export class CreatePlayerDto {
    @IsString()
    @IsAlphanumeric()
    @IsNotEmpty()
    displayName: string;

    @IsString()
    @IsAlphanumeric()
    @IsNotEmpty()
    playerId: string;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateBetDto)
    bets: CreateBetDto[] = [];

    @IsEnum(PlayerStatus)
    @IsNotEmpty()
    status: PlayerStatus;

    @IsNumber({ 
        allowInfinity: false,
        allowNaN: false,
    })
    @IsNotEmpty()
    @IsPositive()
    chipAmount: number = 0;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
    })
    @IsNotEmpty()
    @IsPositive()
    seatNumber: number;

    @IsEnum(PlayerType)
    @IsNotEmpty()
    type: PlayerType = PlayerType.PLAYER;
}
