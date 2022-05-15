import { Type } from "class-transformer";
import { 
    IsArray, 
    IsBoolean, 
    IsEnum, 
    IsNotEmpty, 
    IsNumber, 
    IsPositive, 
    ValidateNested, 
} from "class-validator";
import { RoundName, TableType } from "src/common/constants";
import { CreatePlayerDto } from "src/game/players/dtos/create-player.dto";

export class CreateTableDto {
    @IsBoolean()
    @IsNotEmpty()
    inProgress: boolean = false;

    @IsEnum(RoundName)
    @IsNotEmpty()
    currentRound: RoundName = RoundName.WAITING;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePlayerDto)
    players: CreatePlayerDto[] = [];

    @IsNumber({ 
        allowInfinity: false,
        allowNaN: false,
    })
    @IsPositive()
    @IsNotEmpty()
    timeoutBeforeAutoFold: number;

    @IsNumber({ 
        allowInfinity: false,
        allowNaN: false,
    })
    @IsPositive()
    @IsNotEmpty()
    timeoutBeforeAutoSitOut: number;

    @IsNumber({ 
        allowInfinity: false,
        allowNaN: false,
    })
    @IsPositive()
    @IsNotEmpty()
    timeoutBeforeGameStart: number;

    @IsNumber({ 
        allowInfinity: false,
        allowNaN: false,
    })
    @IsPositive()
    @IsNotEmpty()
    seatLimit: number;

    @IsEnum(TableType)
    @IsNotEmpty()
    type: TableType = TableType.TEXAS_HOLDEM;

    @IsNumber({ 
        allowInfinity: false,
        allowNaN: false,
    })
    @IsPositive()
    @IsNotEmpty()
    minimumPlayers: number;
}
