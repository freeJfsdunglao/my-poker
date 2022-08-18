import { PartialType, PickType } from "@nestjs/mapped-types";
import { GameTableDto } from "./game-table.dto";

export class ClientCreateGameTableDto 
extends PartialType(PickType(
    GameTableDto, 
    [
        'blindAmount',
        'seatLimit',
        'type',
        'minimumPlayers',
        'seatLimit',
        'isPrivate',
        'password',
    ] as const
)) {}