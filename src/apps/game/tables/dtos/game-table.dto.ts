import { 
    IsBoolean, 
    IsEnum, 
    IsNotEmpty, 
    IsNumber, 
    IsPositive,
    IsString,
    IsUUID,
    ValidateIf, 
} from "class-validator";
import { 
    DEFAULT_PLAYERS_TO_START, 
    RoundName, 
    TimeoutMs, 
} from "src/shared/common/constants";
import { GameTable } from "../entities/game-table.entity";

export class GameTableDto extends GameTable {
    @IsBoolean()
    inProgress: boolean = false;

    @IsEnum(RoundName)
    currentRound: RoundName = RoundName.WAITING;

    @IsNumber({ 
        allowInfinity: false,
        allowNaN: false,
    })
    @IsPositive()
    timeoutBeforeAutoFold: number = TimeoutMs.AutoFold;

    @IsNumber({ 
        allowInfinity: false,
        allowNaN: false,
    })
    @IsPositive()
    timeoutBeforeAutoSitOut: number = TimeoutMs.SitOut;

    @IsNumber({ 
        allowInfinity: false,
        allowNaN: false,
    })
    @IsPositive()
    timeoutBeforeGameStart: number = TimeoutMs.TimerBeforeStart;

    @IsNumber({ 
        allowInfinity: false,
        allowNaN: false,
    })
    @IsPositive()
    minimumPlayers: number = DEFAULT_PLAYERS_TO_START;

    @IsNumber({ 
        allowInfinity: false,
        allowNaN: false,
    })
    @IsPositive()
    gamesPlayed: number = 0;

    @IsUUID()
    currentTurnId: string = null;

    @IsUUID()
    lastBettor: string = null;

    @IsUUID()
    dealerId: string = null;

    @ValidateIf((o) => o.isPrivate === true)
    @IsString()
    @IsNotEmpty()
    password: string;
}
