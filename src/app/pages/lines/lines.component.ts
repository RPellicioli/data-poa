import { Component, OnInit } from '@angular/core';
import { ApiLinesService } from 'src/app/services/api/api-lines.service';

@Component({
    selector: 'app-lines',
    templateUrl: './lines.component.html',
    styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit {
    public lines: any;

    constructor(
        private apiLinesService: ApiLinesService
    ) { }

    public ngOnInit(): void {
        this.loadLines();
    }

    private async loadLines(): Promise<void> {
        this.lines = await this.apiLinesService.getLines();
        console.log(this.lines);
    }
}
