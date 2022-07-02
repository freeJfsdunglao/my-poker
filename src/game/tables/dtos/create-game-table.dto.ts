import { PartialType } from "@nestjs/mapped-types";
import { GameTableDto } from "./game-table.dto";

export class CreateGameTableDto extends PartialType(GameTableDto) {}
