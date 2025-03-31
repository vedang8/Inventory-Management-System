import { Injectable } from "@nestjs/common";
import { InventoryRepository } from "../repositories/inventory.repository";
import { CreateInventoryDto } from "../dtos/createInventory.dto";
import { Inventory } from "../entities/inventory.entity";

@Injectable()
export class InventoryService{
    constructor(private readonly inventoryRepository: InventoryRepository) {}

    async createInventory(createInventoryDto: CreateInventoryDto):  Promise<{ success: boolean; message: string }>{
        try{
            const inventory = await this.inventoryRepository.createInventory(createInventoryDto);
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
    
    async deleteProduct(id: string): Promise<{success: boolean; message: string;}>{
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

}