import { PartialType, PickType } from "@nestjs/mapped-types";
import { GameTableDto } from "./game-table.dto";

export class JoinGameTableDto 
extends PartialType(
    PickType(
        GameTableDto, 
        [ 'uuid' ]
    )
) {}