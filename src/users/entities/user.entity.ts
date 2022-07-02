import { Role } from "src/common/constants";
import { 
    Column, 
    Entity, 
    Index, 
    PrimaryGeneratedColumn, 
    Unique, 
} from "typeorm";


@Unique('uq_username', ['username'])
@Index('idx_role', ['role'])
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column()
    phoneNumber: string;

    @Column({
        default: Role.User,
    })
    role: Role;
}