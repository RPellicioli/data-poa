import { Injectable } from "@angular/core";
import { ApiBase } from './api-base';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiDataPOAService extends ApiBase {
    protected apiBaseUrl: string = environment.apiUrl;
    protected routePath: string = 'process.php';

    public getLines(): Promise<any> {
        return super.get<any>('?a=nc&p=%25&t=o');
    }

    public getBus(): Promise<any> {
        return super.get<any>('?a=nc&p=%25&t=l');
    }
}
