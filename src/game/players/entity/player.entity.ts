import { IsNumber, IsPositive } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique('uq_username', ['username'])
@Entity()
export class Player {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    username: string;

    @Column()
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
    })
    @IsPositive()
    chipAmount: number = 0;
}