import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from '../services/inventory.service';
import { InventoryRepository } from '../repositories/inventory.repository';
import { Inventory } from '../entities/inventory.entity';
import { InventoryController } from '../controllers/inventory.controller';
import { WebsocketGateway } from '../gateways/inventory.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryRepository, WebsocketGateway],
  exports: [InventoryService, InventoryRepository],
})
export class InventoryModule {} 