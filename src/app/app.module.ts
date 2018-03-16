
import { MatDialogModule } from '@angular/material/dialog';


import { FlexLayoutModule } from '@angular/flex-layout';

import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorHandler, NgModule, Component } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import {AppErrorHandler} from './common/AppErrorHandler';

import { Routes, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';	
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ShowProductComponent } from './show-product/show-product.component';
import { ProductService } from './services/product.service';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './Component/login/login.component';


@NgModule(<NgModule>{
  declarations: [
    AppComponent,
   
    NavbarComponent,
    ProductComponent,
    ShowProductComponent,
    LoginComponent
  
  ],
 
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule,
 
    MatIconModule,
    

    
    FlexLayoutModule,

    Ng2Charts,
    RouterModule.forRoot([
      {path :'',component:ShowProductComponent},
     
      {path :'home',component:ShowProductComponent},
      {path :'login',component:LoginComponent},
     
      //{path :'update',component:UpdateRoleComponent},
    
     
      
    //   {
    //     path :'ShowProducts',
    //     component:ShowProductComponent,
    //     canActivate:[AuthGuard,AdminAuthGuard] 
    // },
      {path :'productadd',component:ProductComponent},
    ]),
    HttpModule,
    
  ],
  providers: [ProductService,
    
    {provide: ErrorHandler, useClass: AppErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true },
    AuthService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
    ],

  bootstrap: [AppComponent],
 
  //bootstrap(HomeComponent, [provide(MessageService, {useValue: new MessageService()})]);
  //bootstrap(TestComponent, [provide(MessageService, {useValue: new MessageService()})]);

})
export class AppModule { }
