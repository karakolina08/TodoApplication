import { NgModule } from '@angular/core';
import { MomentPipe } from "./moment.pipe";

@NgModule({
    imports: [
    ],
    providers: [
    ],
    declarations: [
        MomentPipe,
    ],
    exports: [
        MomentPipe,
    ]
})
export class PipesModule { }
