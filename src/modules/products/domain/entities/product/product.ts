import { AggregateRoot } from '../../../../../shared/domain/aggregateRoot';
import { CreateProductDTO, UpdateProductDTO } from './dto/productDTOs';

export class Product extends AggregateRoot {
   private constructor(
      public handle: string,
      public title: string,
      public description: string,
      public sku: number,
      public grams: number,
      public stock: number,
      public price: number,
      public compare_price: number,
      public barcode: number,
      id?: string,
   ) {
      super(id);
   }

   get productId(): string {
      return this.id;
   }

   public static create(data: CreateProductDTO): Product {
      const product = new Product(
         data.handle,
         data.title,
         data.description,
         data.sku,
         data.grams,
         data.stock,
         data.price,
         data.compare_price,
         data.barcode,
         data.id,
      );

      return product;
   }

   public update(data: UpdateProductDTO): void {
      this.handle = data.handle;
      this.title = data.title;
      this.description = data.description;
      this.sku = data.sku;
      this.grams = data.grams;
      this.stock = data.stock;
      this.price = data.price;
      this.compare_price = data.compare_price;
      this.barcode = data.barcode;
   }
}
