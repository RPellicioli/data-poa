import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiDataPOAService } from 'src/app/services/api/api-data-poa.service';
import { Line } from 'src/app/models/line';
import { Direction, WayPoint } from 'src/app/models/direction';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public text: string;
    public placeholder: string;
    public lines: Line[] = [];
    public isLoading: boolean;
    public search: string;

    public navs: HomeComponent.Nav[] = [
        {
            name: "Ônibus",
            active: true
        },
        {
            name: "Lotações",
            active: false
        }
    ];

    //Map Config
    public origin: Direction;
    public destination: Direction;
    public waypoints: WayPoint[] = [];
    public showDirection: boolean = true;
    public zoom: number = 12;

    constructor(
        private apiDataPOAService: ApiDataPOAService
    ) { }

    public ngOnInit(): void {
        this.loadBus();
    }

    public selectNav(nav: HomeComponent.Nav): void {
        this.navs.forEach(n => n.active = false);
        nav.active = true;

        this.reset();

        switch (nav.name) {
            case 'Ônibus':
                this.loadBus();
                break;
            case 'Lotações':
                this.loadStocking();
                break;
        }
    }

    public async selectLine(line: Line): Promise<void> {
        this.lines.forEach(n => n.active = false);
        line.active = true;

        const directions = await this.apiDataPOAService.getLineDirections(line.id);
        
        if(!directions || directions.length === 0){
            alert("Nenhum itinerário encontrato para esta linha.");
        }

        this.origin = {
            lat: directions[0].lat,
            lng: directions[0].lng
        }

        this.waypoints = [];

        directions.forEach((d, index) => {
            // AO UTILIZAR UMA CONTA/KEY GOOGLE MAPS PAGA RETIRAR O INDEX < 25, POIS EM UMA CONTA GRATIS O LIMETE É DE 25 WAYPOINTS DESENHADOS NO MAPA
            if(index > 0 && index < directions.length -1 && index < 25){
                let wp = {
                    location: {
                        lat: d.lat,
                        lng: d.lng
                    }
                }

                this.waypoints.push(wp);
            }
        });

        this.destination = {
            lat: directions[directions.length - 1].lat,
            lng: directions[directions.length - 1].lng
        }

        this.showDirection = true;
    }

    private reset(): void {
        this.search = "";
    }

    public async loadBus(): Promise<void> {
        this.isLoading = true;
        this.text = "seu ônibus";
        this.placeholder = "Buscar ônibus";

        try {
            this.lines = await this.apiDataPOAService.getBus();
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error(error);
            alert("Erro ao carregar a lista de ônibus, tente mais tarde.");
        }
    }

    public async loadStocking(): Promise<void> {
        this.isLoading = true;
        this.text = "sua lotação";
        this.placeholder = "Buscar lotação";

        try {
            this.lines = await this.apiDataPOAService.getStocking();
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error(error);
            alert("Erro ao carregar a lista de lotações, tente mais tarde.");
        }
    }
}

export namespace HomeComponent {
    export interface Nav {
        name: string;
        active: boolean;
    }
}