export interface CreateProductDTO {
   id?: string;
   handle: string;
   title: string;
   description: string;
   sku: number;
   grams: number;
   stock: number;
   price: number;
   compare_price: number;
   barcode: number;
}

export interface UpdateProductDTO {
   handle: string;
   title: string;
   description: string;
   sku: number;
   grams: number;
   stock: number;
   price: number;
   compare_price: number;
   barcode: number;
}

export interface ResponseProductDTO {
   id: string;
   handle: string;
   title: string;
   description: string;
   sku: number;
   grams: number;
   stock: number;
   price: number;
   compare_price: number;
   barcode: number;
}
