import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    Unique, 
} from "typeorm";


@Unique('uq_username', ['username'])
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}