import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { BetAction, RoundName } from "src/shared/common/constants";

export class CreateBetDto {
    @IsNumber({ 
        allowNaN: false, 
        allowInfinity: false,
    })
    @IsPositive()
    @IsNotEmpty()
    amount: number;

    @IsEnum(RoundName)
    @IsNotEmpty()
    round: RoundName;

    @IsEnum(BetAction)
    @IsNotEmpty()
    action: BetAction;

    @IsBoolean()
    @IsNotEmpty()
    isAutoBet: boolean;
}
