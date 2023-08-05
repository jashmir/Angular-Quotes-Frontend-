import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDemoComponent } from './form-demo/form-demo.component';
import { LoginComponent } from './login/login.component';
import { QuoteComponentComponent } from './quote-component/quote-component.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationComponent } from './registration/registration.component';
import { TodoListComponentComponent } from './todo-list-component/todo-list-component.component';
import { AuthGuardService } from './auth-guard.service';
import { ViewQuoteComponent } from './view-quote/view-quote.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'quotes', component: QuoteComponentComponent, canActivate: [AuthGuardService] },
  { path: 'quotes/:id', component: ViewQuoteComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
