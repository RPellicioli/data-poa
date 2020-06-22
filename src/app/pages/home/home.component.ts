import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiDataPOAService } from 'src/app/services/api/api-data-poa.service';
import { GoogleMapsUtils } from 'src/app/utils/google-maps-utils';
import { Line } from 'src/app/models/line';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild('mapElement', { static: true }) public mapElement: ElementRef<HTMLDivElement>;
    private map: google.maps.Map;

    public lines: Line[];
    public isLoading: boolean;
    public search: string;

    public navs: HomeComponent.Nav[] = [
        {
            name: "Linhas",
            active: true
        },
        {
            name: "Lotações",
            active: false
        }
    ];

    constructor(
        private apiDataPOAService: ApiDataPOAService
    ) { }

    public ngOnInit(): void {
        this.loadLines();
        this.createMap();
    }

    public selectNav(nav: HomeComponent.Nav): void {
        this.navs.forEach(n => n.active = false);
        nav.active = true;

        this.reset();

        switch (nav.name) {
            case 'Linhas':
                this.loadLines();
                break;
            case 'Lotações':
                this.loadBus();
                break;
        }
    }

    private reset(): void {
        this.search = "";
    }

    private async loadLines(): Promise<void> {
        this.isLoading = true;

        try {
            this.lines = await this.apiDataPOAService.getLines();
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error(error);
        }
    }

    private async loadBus(): Promise<void> {
        this.isLoading = true;

        try {
            this.lines = await this.apiDataPOAService.getBus();
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error(error);
        }
    }

    private async createMap(): Promise<void> {
		try {
            await GoogleMapsUtils.loadScript();
            
            const initialLatitude = -30.0430627;
            const initialLongitude = -51.1579254;

			if (this.mapElement) {
				const options: google.maps.MapOptions = {
					draggable: true,
					scrollwheel: true,
					disableDoubleClickZoom: false,
					disableDefaultUI: true,
					zoomControl: true,
					mapTypeControlOptions: {
						mapTypeIds: ['Styled']
					},
					center: new google.maps.LatLng(Number(initialLatitude), Number(initialLongitude)),
					zoom: 13,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};

				this.map = new google.maps.Map(this.mapElement.nativeElement, options);
				this.map.mapTypes.set('Styled', new google.maps.StyledMapType(GoogleMapsUtils.getDefaultStyles(), { name: 'Styled' }));
			}
		}
		catch (ex) {
			console.log(ex);
		}
	}
}

export namespace HomeComponent {
    export interface Nav {
        name: string;
        active: boolean;
    }
}