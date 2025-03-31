import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InventoryRepository } from "../repositories/inventory.repository";
import { CreateInventoryDto } from "../dtos/createInventory.dto";
import { Inventory } from "../entities/inventory.entity";
import { InventoryGateway } from "../gateways/inventory.gateway";
import { UpdateInventoryDto } from "../dtos/updateInventory.dto";

@Injectable()
export class InventoryService{
    lowStockThreshold: number = 5;
    private readonly logger = new Logger(InventoryService.name);
    constructor(
        private readonly inventoryRepository: InventoryRepository,
        private inventoryGateway: InventoryGateway
    ) {}

    async createInventory(createInventoryDto: CreateInventoryDto):  Promise<{ success: boolean; message: string }>{
        try{
            const inventory = await this.inventoryRepository.createInventory(createInventoryDto);
            if(inventory)
                this.checkStockLevel(inventory);
            return {
              success: true,
              message: 'New Product is added successfully',
            }
        }catch(error){
            console.error('Error in adding new product: ', error.message);
            return {
              success: false,
              message: 'Internal Server Error'
            }
        }
    }
    
    async getAllInventory(user_id: string): Promise<{ success: boolean; message: string; products?: Inventory[] | null }> {
        try{
            const products = await this.inventoryRepository.getAllProducts(user_id);
            return{
                success: true,
                message: 'All products are fetched',
                products: products
            }
        }catch(error){
            console.error('Error in fetching the products from the inventory: ', error.message);
            return{
                success: false,
                message: 'Failed to fetch the products'
            }
        }
    }
    
    async deleteProduct(id: number): Promise<{success: boolean; message: string;}>{
        try{
            const isDeleted = await this.inventoryRepository.deleteProduct(id);
            if(isDeleted){
                return {
                    success: true,
                    message: 'Product is deleted from the  inventory'
                }
            }
            return{
                success: false,
                message: 'Failed to deleted the product'
            }
        }catch(error){
            console.error('Error in deleting a product: ', error.message);
            return{
                success: false,
                message: 'Failed to delete the product'
            }
        }
    }

    async getInventoryById(id: string): Promise<{success: boolean; message: string; inventoryItem?:Inventory | null}>{
        try{
            const product = await this.inventoryRepository.getInventoryById(id);
            return {
                success: true,
                message: 'Inventory Item is retrieved',
                inventoryItem: product
            }
        }catch(error){
            console.error('Error in get a product: ', error.message);
            return{
                success: false,
                message: 'Failed to get the product'
            }
        }
    }

    async updateInventoryItem(id: string, updateInventoryDto: UpdateInventoryDto){
        try{
            const existingItem = await this.inventoryRepository.getInventoryById(id);
            if (!existingItem) {
                throw new NotFoundException(`Inventory item with ID ${id} not found`);
            }

            await this.inventoryRepository.updateInventoryItem(id, updateInventoryDto);
            const inventory = await this.inventoryRepository.getInventoryById(id);
            if(inventory){
                this.checkStockLevel(inventory);
            }

            return {
                success: true,
                message: 'Item is updated successfully'
            }
        }catch(error){
            console.error('Error in updating the item: ', error.message);
            return {
                success: false,
                message: 'Failed to update the item'
            }
        }
    }
    private checkStockLevel(inventory: Inventory) {
        if (inventory.quantity < this.lowStockThreshold) {
          this.logger.warn(`Low stock alert: ${inventory.product_name} (Stock: ${inventory.quantity})`);
          this.inventoryGateway.sendLowStockAlert(inventory); // Emit WebSocket Event
        }
    }

}