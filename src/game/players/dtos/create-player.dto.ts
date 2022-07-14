import { PartialType } from "@nestjs/mapped-types";
import { PlayerDto } from "./player.dto";

export class CreatePlayerDto extends PartialType(PlayerDto) {}
