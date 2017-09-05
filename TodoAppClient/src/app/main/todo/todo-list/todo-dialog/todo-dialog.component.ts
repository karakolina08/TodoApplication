import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { TodoService } from "../../../../tools/services/todo.service";
import { ToastrService } from "ngx-toastr";
import { User } from "../../../../tools/models/user";
import { AuthService } from "../../../../tools/services/auth.service";

@Component({
  selector: 'ms-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent implements OnInit {

  private allData: any = {};
  private task : any = {};
  private _currentUser : User;

  constructor(
    public dialogRef: MdDialogRef<TodoDialogComponent>,
    @Inject(MD_DIALOG_DATA) public dataDialog: any,
    private _todoService: TodoService,
    private _toastrService: ToastrService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._currentUser =  this._authService.getInfoUser();
    this.allData = this.dataDialog;
    if(this.allData.task) this.task = this.allData.task;
  }

  // ====================================================================================
  // Private methods
  // ====================================================================================
  private save(){
    let resultRequest = false;
    
    if(!this.task.tdUserId) this.task.tdUserId = this._currentUser.id;
    this.task.isCompleted =  this.task.isCompleted ? true : false;
    // creating or updating to-do element
    this._todoService.saveTodoEntity(this.task).subscribe(
      data => {
        resultRequest = true;
        this._toastrService.success('Task Saved Successfully.', "Save");
      },
      error => {
          let errorJson = error.json();
          this._toastrService.error(errorJson.error, "Error");
      },
      () => {
        this.dialogRef.close({result: resultRequest});
      }
    );
  }

  private cancel(){
    this.dialogRef.close({result: false});
  }

}
