import { IsNotEmpty, IsNumber, IsInt } from 'class-validator';

export class CreateProductValidateSchema {
   @IsNotEmpty({ message: 'Handle is required' })
   handle: string;

   @IsNotEmpty({ message: 'Title is required' })
   title: string;

   @IsNotEmpty({ message: 'Description is required' })
   description: string;

   @IsInt()
   @IsNotEmpty({ message: 'Sku is required' })
   sku: number;

   @IsNumber()
   @IsNotEmpty({ message: 'Grams is required' })
   grams: number;

   @IsInt()
   @IsNotEmpty({ message: 'Stock is required' })
   stock: number;

   @IsNumber()
   @IsNotEmpty({ message: 'Price is required' })
   price: number;

   @IsNumber()
   @IsNotEmpty({ message: 'Compare price is required' })
   compare_price: number;

   @IsInt()
   @IsNotEmpty({ message: 'Barcode is required' })
   barcode: number;
}

export class UpdateProductValidateSchema {
   @IsNotEmpty({ message: 'Id is required' })
   id: string;

   @IsNotEmpty({ message: 'Handle is required' })
   handle: string;

   @IsNotEmpty({ message: 'Title is required' })
   title: string;

   @IsNotEmpty({ message: 'Description is required' })
   description: string;

   @IsInt()
   @IsNotEmpty({ message: 'Sku is required' })
   sku: number;

   @IsNumber()
   @IsNotEmpty({ message: 'Grams is required' })
   grams: number;

   @IsInt()
   @IsNotEmpty({ message: 'Stock is required' })
   stock: number;

   @IsNumber()
   @IsNotEmpty({ message: 'Price is required' })
   price: number;

   @IsNumber()
   @IsNotEmpty({ message: 'Compare price is required' })
   compare_price: number;

   @IsInt()
   @IsNotEmpty({ message: 'Barcode is required' })
   barcode: number;
}

export class ProductIdValidateSchema {
   @IsNotEmpty({ message: 'Id is required' })
   id: string;
}
