import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateInventoryDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    product_name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    supplier_name: string;

    @IsString()
    @IsNotEmpty()
    category: string;
}