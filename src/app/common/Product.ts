export class Product{

   id:string;
    InStock:boolean;
    quantity:number;
    price:number;
    sku:string;
    productname:string
    selectedCategory:string;
    imageUrl:string;


	constructor(productname:string,InStock: boolean, quantity: number, price: number, Sku: string) {
		this.InStock = InStock;
		this.quantity = quantity;
        this.price = price;
        this.productname = productname;
		this.sku = Sku;
		
    }
    



	

	

}
    