import { PartialType } from "@nestjs/mapped-types";
import { GameTableDto } from "./game-table.dto";

export class UpdateGameTableDto extends PartialType(GameTableDto) {}
