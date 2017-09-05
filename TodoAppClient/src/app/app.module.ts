import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MdIconRegistry, } from "@angular/material";
import { RoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from './core/core.module';
import { SortablejsModule, SortablejsOptions } from 'angular-sortablejs';
import { AuthenticationModule } from "./main/authentication/authentication.module";
import { ToastrModule } from 'ngx-toastr';
import { TodoModule } from "./main/todo/todo.module";
import { apiService } from "./tools/services/api.service";
import { TodoService } from "./tools/services/todo.service";
import { AuthService } from "./tools/services/auth.service";
import { ToolsModule } from "./tools/components/tools.module";
import { DialogsService } from "./tools/services/confirmDialog.service";
import { AppGuard } from "./app-guard.service";
import { UserService } from "./tools/services/user.service";

const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  swipePropagation: false
};

const sortablejsConfig: SortablejsOptions = {
  animation: 300
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SortablejsModule,
    PerfectScrollbarModule.forRoot(perfectScrollbarConfig),
    AuthenticationModule,
    TodoModule,
    ToastrModule.forRoot(),
    ToolsModule
  ],
  providers: [
    MdIconRegistry,
    apiService,
    TodoService,
    AuthService,
    DialogsService,
    UserService,
    AppGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
