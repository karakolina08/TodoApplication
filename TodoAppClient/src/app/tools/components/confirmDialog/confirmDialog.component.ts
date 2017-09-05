import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirmDialog.component.html',
    styleUrls : ['./confirmDialog.component.scss']
})
export class ConfirmDialogComponent {

    public styleHeader: any = {'background-color': 'gray' };
    public title: string;
    public message: string;

    constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) {
    }

    yes(){
        this.dialogRef.close(true);
    }

    cancel(){
        this.dialogRef.close(false);
    }

}