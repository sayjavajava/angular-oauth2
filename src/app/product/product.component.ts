import {ProductService} from '../services/product.service';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { NotFound } from './../common/NotFound';
import { AppError } from './../common/AppError';
import { BadRequest } from './../common/BadRequest';
import { Observable } from 'rxjs/Observable';
import { Product } from '../common/Product';


@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  rForm :FormGroup;
  name:String;

  
  active:boolean=true;
  submitted:boolean=false;

  
  
 products:Product;

  quantity:number[];

  categoriesItem=[
    {id:1,name:"computer"},
    {id:2,name:"Lcd"},
    {id:3,name:"mobile"},
    {id:4,name:"camera"},
  ]

  constructor(
    private fb : FormBuilder,  
    private router : Router,
    private productservice:ProductService,
    private snackbar:MatSnackBar,
      //      private heroservice?:HeroService 
    ) {

      }

  ngOnInit() {
 
  //let obj = new FormValidator(this.productservice);

  var N = 10; 
  
  this.quantity =Array.apply(null, {length: N}).map(Number.call, Number);

     //pattern for validate only lettere [a-zA-Z_]+
   //pattern for only numbers [0-9]+
     this.rForm =this.fb.group({  
    'productname': [null,Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(4)])],
    'price':[null,Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(8)])],
    'inStock':[null],
   // 'sku': new FormControl('',Validators.required),
   sku:[null,Validators.required],
   quantity:[null,Validators.required]
        // 'imageUrl':[null,Validators.required],
    })
  
  }
AddProduct(post){

//post.originalFileName =this.originalFileName;

if(this.rForm.valid){
  
   //let obj = new Product(post.productname,post.InStock,post.quantity,post.price,post.Sku);
   this.productservice.create(this.rForm.value).subscribe(response =>{
 
    console.log(response);
 
   this.openSnackBar("Product saved","successfully");
  this.rForm.reset();
  this.active=false;
  setTimeout(() => this.active = true, 0);
// this.productservice.create(obj);
  
  },(error :AppError) =>{
  if(error instanceof BadRequest){
    console.log('orig'+error.origionalerror);
    alert("please check your data format ");
  }else  throw error;
})
}
}
openSnackBar(message: string, action: string) {
  this.snackbar.open(message, action, {
    duration: 2000,
  });
}



}






