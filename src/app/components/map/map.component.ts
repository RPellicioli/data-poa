import { Component, OnInit, Input } from '@angular/core';
import { Direction, WayPoint } from 'src/app/models/direction';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    @Input() origin: Direction;
    @Input() destination: Direction;
    @Input() waypoints: WayPoint[];
    @Input() showDirection: boolean;
    @Input() zoom: number;

    constructor() { }

    public ngOnInit(): void {
    }

}
