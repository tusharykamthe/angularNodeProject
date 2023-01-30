import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { ProductComponent } from './component/product/product.component';
import { SignupComponent } from './component/signup/signup.component';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [

  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},

  {path:"header",component:HeaderComponent, canActivate:[AuthGuard]},
  //  {path:'', redirectTo:'product', pathMatch:'full'},
  {path:'product', component:ProductComponent, canActivate:[AuthGuard]},
  {path:'cart', component:CartComponent, canActivate:[AuthGuard]},
  {path:"crud",canActivate:[AuthGuard] ,loadChildren:()=> import('./crud/crud.module').then((m)=>m.CrudModule)},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
