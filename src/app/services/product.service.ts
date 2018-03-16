import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Product } from '../common/Product';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BadRequest } from '../common/BadRequest';
import { NotFound } from '../common/NotFound';
import { AppError } from '../common/AppError';
import { Http } from '@angular/http';


@Injectable()
export class ProductService {
 producturl='api/product';

  constructor(private httpclient:HttpClient) {
  
   }
  
   create(resource){
    
        const options = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            
          })
        };
        
     console.log('in service'+resource.InStock);
    return this.httpclient.post<Product[]>(this.producturl, resource);
  }


  findAll(){
    console.log('find1F');
    let headers = new HttpHeaders();
    headers = headers.append("Authorization","basic");
    return this.httpclient.get<Product[]>(this.producturl,{headers:headers});
  }

  DeleteProduct(product:Product){
   return this.httpclient.delete(this.producturl + "/" + product.id)
  }
   private handleError(error:Response){
    if (error.status === 400){
       return Observable.throw(new BadRequest());
        }
        if (error.status === 404){
         return  Observable.throw(new NotFound());
        }else
      return  Observable.throw(new AppError(error)); }
 }
