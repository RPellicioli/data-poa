import { Component, OnInit } from '@angular/core';
import { ApiDataPOAService } from 'src/app/services/api/api-data-poa.service';
import { Line } from 'src/app/models/line';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
}

export namespace HomeComponent {
    export interface Nav {
        name: string;
        active: boolean;
    }
}