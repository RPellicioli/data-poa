import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { ApiDataPOAService } from './api-data-poa.service';

@NgModule({
    imports: [
        HttpClientModule,
        HttpClientJsonpModule
    ],
    providers: [
        ApiDataPOAService
    ]
})
export class ApiModule { }