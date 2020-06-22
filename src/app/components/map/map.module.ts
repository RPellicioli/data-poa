import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MapComponent } from './map.component';
import { DirectionsMapDirective } from 'src/app/directives/directions-map.directive';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        CommonModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAzr1mHIGsNDsleejl9DMwKCIQ4SEoZ8vQ'
        })
    ],
    declarations: [
        MapComponent,
        DirectionsMapDirective
    ],
    exports: [
        MapComponent
    ]
})
export class MapModule {
}