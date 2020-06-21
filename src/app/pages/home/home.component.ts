import { Component, OnInit } from '@angular/core';
import { ApiLinesService } from 'src/app/services/api/api-lines.service';
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

    constructor(
        private apiLinesService: ApiLinesService
    ) { }

    public ngOnInit(): void {
        this.loadLines();
    }

    private async loadLines(): Promise<void> {
        this.isLoading = true;

        try {
            this.lines = await this.apiLinesService.getLines();
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error(error);
        }
    }
}
