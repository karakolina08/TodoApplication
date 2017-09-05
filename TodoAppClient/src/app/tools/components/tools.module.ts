import { NgModule } from '@angular/core';
import { MaterialModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ConfirmDialogComponent } from "./confirmDialog/confirmDialog.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
    ],
    providers: [
    ],
    declarations: [
        ConfirmDialogComponent,
    ],
    entryComponents: [
        ConfirmDialogComponent,
    ],
    exports: [
    ]
})
export class ToolsModule { }