import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { TodoGridComponent } from './todo-list/todo-grid/todo-grid.component';
import { FormsModule } from "@angular/forms";
import { DxDataGridModule } from 'devextreme-angular';
import { TodoDialogComponent } from './todo-list/todo-dialog/todo-dialog.component';
import { PipesModule } from "../../tools/pipes/pipes.module";
import { MaterialModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    DxDataGridModule,
    PipesModule
  ],
  declarations: [
    TodoListComponent,
    TodoGridComponent,
    TodoDialogComponent
  ],
  entryComponents: [
    TodoDialogComponent
  ]
})
export class TodoModule { }
