import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./core/admin/admin.component";
import { LoginComponent } from "./main/authentication/login/login.component";
import { RegisterComponent } from "./main/authentication/register/register.component";
import { TodoListComponent } from "./main/todo/todo-list/todo-list.component";
import { AppGuard } from "./app-guard.service";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '', redirectTo: '/login', pathMatch: 'full'
      },
      {
        path: 'todo',
        component: TodoListComponent,
        canActivate: [AppGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
