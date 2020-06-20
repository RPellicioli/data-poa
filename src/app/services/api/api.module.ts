import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { ApiLinesService } from './api-lines.service';

@NgModule({
    imports: [
        HttpClientModule,
        HttpClientJsonpModule
    ],
    providers: [
        ApiLinesService
    ]
})
export class ApiModule { }