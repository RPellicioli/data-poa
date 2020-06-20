import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LinesComponent } from './lines.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: LinesComponent }
        ])
    ],
    exports: [
        LinesComponent
    ],
    declarations: [
        LinesComponent
    ]
})
export class LinesModule { }