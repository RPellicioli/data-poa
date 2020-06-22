import { Directive, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Direction, WayPoint } from '../models/direction';

declare var google: any;

@Directive({
    selector: '[appDirectionsMap]'
})
export class DirectionsMapDirective implements OnInit, OnChanges {
    @Input() origin: Direction;
    @Input() destination: Direction;
    @Input() waypoints: WayPoint[];
    @Input() showDirection: boolean;

    private directionsRenderer: any;

    constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

    public ngOnInit(): void {
        this.drawDirectionsRoute();
    }

    public drawDirectionsRoute(): void {
        this.gmapsApi.getNativeMap().then(map => {
            if (!this.directionsRenderer) {
                this.directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
            }

            const directionsRenderer = this.directionsRenderer;

            if (this.showDirection && this.destination) {
                const directionsService = new google.maps.DirectionsService;

                directionsRenderer.setMap(map);
                
                directionsService.route({
                    origin: { 
                        lat: this.origin.lat, 
                        lng: this.origin.lng 
                    },
                    destination: { 
                        lat: this.destination.lat, 
                        lng: this.destination.lng 
                    },
                    waypoints: this.waypoints,
                    optimizeWaypoints: true,
                    travelMode: 'DRIVING'
                }, (response, status) => {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(response);
                    } else {
                        console.log('Erro ao renderizar as direções ' + status);
                    }
                });
            }

        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.destination || changes.showDirection) {
            if (changes.showDirection && !changes.showDirection.currentValue) {
                if (this.directionsRenderer !== undefined) {
                    this.directionsRenderer.setDirections({ routes: [] });
                    return;
                }
            } else {
                this.drawDirectionsRoute();
            }
        }
    }
}