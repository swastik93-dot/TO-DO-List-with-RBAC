
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard'; // Import AuthGuard
import { AdminComponent } from './AdminComponent/AdminComponent';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'todolist', component: TodolistComponent, canActivate: [AuthGuard] } ,// Apply AuthGuard here
  {path:'admin',component:AdminComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    EditTaskModalComponent,
    SignupComponent,
    LoginComponent,
    AdminComponent

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard], // Provide AuthGuard
  bootstrap: [AppComponent]
})
export class AppModule { }
