import { NgModule, signal } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './resetpassword/reset-password.component';
const routes: Routes = [
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
   { path: 'forgot-password', component: ForgotPasswordComponent },
   {
  path: 'forgot-password',
  component: ForgotPasswordComponent
},
{
  path: 'reset-password',
  component: ResetPasswordComponent
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
