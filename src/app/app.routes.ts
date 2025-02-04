import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './auth.guard';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { UpdatepassComponent } from './components/updatepass/updatepass.component';
import { ForgetpassComponent } from './components/forgetpass/forgetpass.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { UpdatedataComponent } from './components/updatedata/updatedata.component';


export const routes: Routes = [

  {path:'', canActivate:[authGuard] ,component:BlankLayoutComponent, children:[
    {path:'' , redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent,title:'Home'},
    {path:'updatedata',component:UpdatedataComponent,title:'Update Data'},
    {path:'update',component:UpdatepassComponent,title:'Update Password'},
    {path:'details/:id',component:DetailsProductComponent,title:'Details'},
    {path:'cart',component:CartComponent,title:'Cart'},
    {path:'wishlist',component:WishlistComponent,title:'Wish List'},
    {path:'payment/:id',component:PaymentComponent  ,title:'Payment'},
    {path:'categories',component:CategoriesComponent,title:'Categories'},
    {path:'brands',component:BrandsComponent,title:'Brands'},
  ]},


  {path:'', component:AuthLayoutComponent , children:[
    {path:'login',component:LoginComponent,title:'LogIn'},
    {path:'register',component:RegisterComponent,title:'Register'},
  ]},


  {path:'allorders', canActivate:[authGuard] ,component:AllordersComponent  ,title:'All Orders'},
  {path:'**',component:NotfoundComponent,title:'Not Found'}

];
