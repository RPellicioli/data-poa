import { Injectable } from "@angular/core";
import { ApiBase } from './api-base';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiLinesService extends ApiBase {
    protected apiBaseUrl: string = environment.apiUrl;
    protected routePath: string = 'process.php?a=nc&p=%25&t=o';

    public getLines(): Promise<any> {
        return super.get<any>('');
    }
}
