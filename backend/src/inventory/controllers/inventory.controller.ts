import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { InventoryService } from '../services/inventory.service';
import { CreateInventoryDto } from '../dtos/createInventory.dto';
import { UpdateInventoryDto } from '../dtos/updateInventory.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guard';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

    @Post()
    createInventory(@Body() createInventoryDto: CreateInventoryDto) {
        return this.inventoryService.createInventory(createInventoryDto);
    }

    @Get()
    getAllInventory(@Req() req: Request) {
        return this.inventoryService.getAllInventory(req['user'].userId);
    }

    @Get(':id')
    getInventoryById(@Param('id') id: string) {
        return this.inventoryService.getInventoryById(id);
    }

    @Put(':id')
    updateInventory(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
        return this.inventoryService.updateInventoryItem(id, updateInventoryDto);
    }

    @Delete(':id')
    deleteInventory(@Param('id') id: number) {
        return this.inventoryService.deleteProduct(id);
    }

    @Get('low-stock')
    getLowStockItems() {
        //return this.inventoryService.getLowStockItems();
    }
}
