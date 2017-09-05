import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoGridComponent } from "./todo-grid/todo-grid.component";

@Component({
  selector: 'ms-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  private _currentUser : any = {};
  @ViewChild('todoGrid') todoGrid: TodoGridComponent;
  @ViewChild('completedTaskGrid') completedTaskGrid: TodoGridComponent;

  constructor() { }

  ngOnInit() {
  }

  private reloadGrid(isCompletedGrid : boolean){
    if(isCompletedGrid){
      this.todoGrid.loadGrid();
    } else {
      this.completedTaskGrid.loadGrid();
    }
  }

}
