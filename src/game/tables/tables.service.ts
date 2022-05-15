import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dtos/create-table.dto';
import { UpdateTableDto } from './dtos/update-table.dto';

@Injectable()
export class TablesService {
    async defaultTable() {

    }
    
    async createTable(dto: CreateTableDto) {

    }

    async deleteTable(tableId: string) {

    }

    async getTable(tableId: string) {

    }

    async getRandomTable() {

    }

    async updateTable(tableId: string, dto: UpdateTableDto) {

    }
}
