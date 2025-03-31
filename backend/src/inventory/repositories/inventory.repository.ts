import { InjectRepository } from "@nestjs/typeorm";
import { Inventory } from "../entities/inventory.entity";
import { Repository } from "typeorm";
import { CreateInventoryDto } from "../dtos/createInventory.dto";
import { InternalServerErrorException } from "@nestjs/common";
import { UpdateInventoryDto } from "../dtos/updateInventory.dto";

export class InventoryRepository{
    constructor(
            @InjectRepository(Inventory)
            private readonly inventoryRepository: Repository<Inventory>,
        ) {}        
    
        async createInventory(createInventoryDto: CreateInventoryDto): Promise<Inventory | null>{
            try{
                const inventory = this.inventoryRepository.create(createInventoryDto);
                return await this.inventoryRepository.save(inventory);
            }catch(error){
                console.error('Error in creating new inventory ', error.message);
                throw new InternalServerErrorException('Error in creating new inventory'); 
            }
        }

        async getAllProducts(user_id: string): Promise<Inventory[] | null>{
            try{
                const products = this.inventoryRepository.find({ where: {user_id }});
                return await products;
            }catch(error){
                console.error('Error in retreiving all the products from the inventory: ', error.message);
                throw new InternalServerErrorException('Error in fetching the products from the inventory');
            }
        }

        async deleteProduct(id: number): Promise<boolean>{
            try{
                const rowsAffected = await this.inventoryRepository.delete(id);
                return (rowsAffected ? true : false);
            }catch(error){
                console.error('Error in dleeting  a product: ', error.message);
                throw new InternalServerErrorException('Error in deleting a product');
            }
        }

        async getInventoryById(id: string): Promise<Inventory | null>{
            try{
                const inventoryItem = await this.inventoryRepository.findOne({ where: {id} });
                return inventoryItem;
            }catch(error){
                console.error('Error in retrieving an inventory Item: ', error.message);
                throw new InternalServerErrorException('Error in retrieving an item');
            }
        }

        async updateInventoryItem(id: string, updateInventoryDto: UpdateInventoryDto): Promise<void>{
            try{
                await this.inventoryRepository.update(id, updateInventoryDto);
            }catch(error){
                console.error('Error in updating an inventory item: ', error.message);
                throw new InternalServerErrorException('Error in updating the inventory item');
            }
        }
}