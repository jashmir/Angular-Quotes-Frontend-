import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightDirective } from './highlight.directive';
import { TodoListComponentComponent } from './todo-list-component/todo-list-component.component';
import { FormDemoComponent } from './form-demo/form-demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './table-component/table-component.component';
import { QuoteComponentComponent } from './quote-component/quote-component.component';
import { AccountServiceService } from './account-service.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { AddQuoteComponent } from './add-quote/add-quote.component';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditQuoteComponent } from './edit-quote/edit-quote.component';
import { ViewQuoteComponent } from './view-quote/view-quote.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { HeaderLogoutComponent } from './header-logout/header-logout.component';



@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    TodoListComponentComponent,
    FormDemoComponent,
    RegistrationComponent, TableComponent, QuoteComponentComponent, LoginComponent, NavBarComponent, RegisterComponent, AddQuoteComponent, EditQuoteComponent, ViewQuoteComponent, HeaderLogoutComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule, BrowserAnimationsModule,
    MatTableModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule, MatSelectModule, MatPaginatorModule, MatIconModule, MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule
  ],
  providers: [
    AccountServiceService,
    {
      provide: MatDialogRef,
       useValue: {}
    }, 
    {
      provide:MAT_DIALOG_DATA,useValue:{}
    },
    MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
