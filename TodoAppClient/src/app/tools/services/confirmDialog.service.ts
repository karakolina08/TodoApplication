import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from "../components/confirmDialog/confirmDialog.component";

@Injectable()
export class DialogsService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, message: string, styleHeader: any): Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmDialogComponent>;
        let config = {disableClose: false, width: '850px', height: '' };

        dialogRef = this.dialog.open(ConfirmDialogComponent, config);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        if(styleHeader) dialogRef.componentInstance.styleHeader = styleHeader;

        return dialogRef.afterClosed();
    }

    /* EXAMPLE
    let result;
    this._dialogsService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?', {'background-color': '#26A69A' })
      .subscribe(res => result = res);
    */
}