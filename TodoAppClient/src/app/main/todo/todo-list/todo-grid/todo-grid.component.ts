import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from "../../../../tools/services/todo.service";
import { MdDialog } from "@angular/material";
import { TodoDialogComponent } from "../todo-dialog/todo-dialog.component";
import { AuthService } from "../../../../tools/services/auth.service";
import { User } from "../../../../tools/models/user";
import { ToastrService } from "ngx-toastr";
import { DialogsService } from "../../../../tools/services/confirmDialog.service";

@Component({
  selector: 'ms-todo-grid',
  templateUrl: './todo-grid.component.html',
  styleUrls: ['./todo-grid.component.scss']
})
export class TodoGridComponent implements OnInit {

  @Input() isCompleted : boolean = false;
  @Output() reloadGrid = new EventEmitter();
  private dataSourceTodo: any[];
  private _currentUser: User;

  constructor(
    private _todoService: TodoService,
    private _authService: AuthService, 
    public dialog: MdDialog,
    private _toastrService: ToastrService,
    private _dialogsService: DialogsService,
  ) { }

  ngOnInit() {
    this._currentUser =  this._authService.getInfoUser();
    this.loadGrid();
  }

  // ====================================================================================
  // Private methods
  // ====================================================================================
  public loadGrid(){
    this._todoService.getTodoList(this._currentUser.id, this.isCompleted).subscribe(
      data => {
        this.dataSourceTodo = data;
      }
    );
  }

  private openTask(record : any, isNew : boolean){
    let config = {disableClose: false, width: '800px', data: {task: record, isNew: isNew} };
    let dialogRef = this.dialog.open(TodoDialogComponent, config);
    dialogRef.afterClosed().subscribe(
      resp => {
        let response = resp;
        if(response.result) {
          this.loadGrid();
        }
      }
    );
  }

  private changeStatus(record : any, complete: boolean){
    this._dialogsService.confirm('Completing Task', 'Are you sure you want to do this?', {'background-color': '#2196F3' }).subscribe(
      res => {
        if(res){
          record.isCompleted = complete;
          this._todoService.saveTodoEntity(record).subscribe(
            data => {
              this._toastrService.success('Task Saved Successfully.', "Save");
              this.loadGrid();
              this.reloadGrid.emit(true);
            },
            error => {
              let errorJson = error.json();
              this._toastrService.error(errorJson.error, "Error");
            }
          );
        }
      });
  }

  private completingTask(record : any){
    this.changeStatus(record, true);
  }

  private pendingTask(record : any){
    this.changeStatus(record, false);
  }

  private delete(record : any){
    this._dialogsService.confirm('Removing Task', 'Are you sure you want to do this?', {'background-color': '#2196F3' }).subscribe(
      res => {
        if(res){
          this._todoService.deleteTodoEntity(record).subscribe(
            data => {
              this._toastrService.success('Task Deleted Successfully.', "Save");
              this.loadGrid();
            },
            error => {
              let errorJson = error.json();
              this._toastrService.error(errorJson.error, "Error");
            }
          );
        }
      });
  }

}
