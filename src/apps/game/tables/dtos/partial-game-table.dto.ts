import { PartialType } from "@nestjs/mapped-types";
import { GameTable } from "../entities/game-table.entity";

export class PartialGameTable extends PartialType(GameTable) {}