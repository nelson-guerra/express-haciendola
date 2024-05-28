import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
   @PrimaryColumn()
   id: string;

   @Column()
   handle: string;

   @Column()
   title: string;

   @Column()
   description: string;

   @Column()
   sku: number;

   @Column({ type: 'decimal', precision: 10, scale: 1 })
   grams: number;

   @Column()
   stock: number;

   @Column({ type: 'decimal', precision: 10, scale: 2 })
   price: number;

   @Column({ type: 'decimal', precision: 10, scale: 2 })
   compare_price: number;

   @Column()
   barcode: number;
}
