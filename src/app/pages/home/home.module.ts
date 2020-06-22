import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HomeComponent } from './home.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { FilterPipe } from 'src/app/pipes/filter';
import { ApiModule } from 'src/app/services/api/api.module';
import { MapModule } from 'src/app/components/map/map.module';

@NgModule({
    imports: [
        CommonModule,
        LoadingModule,
        HeaderModule,
        FormsModule,
        ApiModule,
        MapModule,
        RouterModule.forChild([
            { path: '', component: HomeComponent }
        ])
    ],
    exports: [
        HomeComponent
    ],
    declarations: [
        HomeComponent,
        FilterPipe
    ]
})
export class HomeModule { }