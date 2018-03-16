import {ProductService} from '../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../common/Product';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
 products:Product[]=[];
  constructor(private productservice:ProductService) {
    
   }

  ngOnInit() {
    
   this.productservice.findAll().subscribe((res:Product[])=>this.products=res,err=>console.log(err));
 
  }
  deleteproduct(product:Product):void{
    this.productservice.DeleteProduct(product).subscribe((data=>{
     this.products= this.products.filter(f=>f !== product);
    }))
  }

}
