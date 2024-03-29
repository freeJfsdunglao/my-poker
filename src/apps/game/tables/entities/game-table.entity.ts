import { 
    IsBoolean, 
    IsEnum, 
    IsNumber, 
    IsPositive,
    Max,
    Min, 
} from "class-validator";
import { 
    DEFAULT_BLIND_AMOUNT, 
    DEFAULT_PLAYERS_TO_START, 
    DEFAULT_SEAT_LIMIT, 
    MAX_SEAT_LIMIT, 
    TableType, 
} from "src/shared/common/constants";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index('idx_blindamount', ['blindAmount'])
@Index('idx_type', ['type'])
@Entity()
export class GameTable {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    
    @Column({
        default: TableType.TEXAS_HOLDEM,
        length: 20
    })
    @IsEnum(TableType)
    type: TableType = TableType.TEXAS_HOLDEM;

    @Column({
        default: DEFAULT_BLIND_AMOUNT,
    })
    @IsNumber({ 
        allowInfinity: false,
        allowNaN: false,
    })
    @IsPositive()
    blindAmount: number = DEFAULT_BLIND_AMOUNT;

    @Column({
        default: DEFAULT_SEAT_LIMIT
    })
    @IsNumber({ 
        allowInfinity: false,
        allowNaN: false,
    })
    @IsPositive()
    @Min(DEFAULT_PLAYERS_TO_START)
    @Max(MAX_SEAT_LIMIT)
    seatLimit: number = DEFAULT_SEAT_LIMIT;

    @Column({
        default: false,
    })
    @IsBoolean()
    isPrivate: boolean = false;
}
