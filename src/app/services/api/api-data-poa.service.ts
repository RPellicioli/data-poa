import { Injectable } from "@angular/core";
import { ApiBase } from './api-base';
import { environment } from 'src/environments/environment';
import { Line } from 'src/app/models/line';
import { Direction } from 'src/app/models/direction';

@Injectable()
export class ApiDataPOAService extends ApiBase {
    protected apiBaseUrl: string = environment.apiUrl;
    protected routePath: string = 'process.php';

    public getBus(): Promise<Line[]> {
        return super.get<Line[]>('?a=nc&p=%25&t=o');
    }

    public getStocking(): Promise<Line[]> {
        return super.get<Line[]>('?a=nc&p=%25&t=l');
    }

    public async getLineDirections(id: number): Promise<Direction[]> {
        const it = await super.get<any>(`?a=il&p=${id}`);

        delete it.idlinha;
        delete it.nome;
        delete it.codigo;

        const result = Object.keys(it).map(key => ({type: key, value: it[key]}));

        let directions: Direction[] = [];

        result.forEach(r => {
            directions.push({
                lat: Number(r.value.lat),
                lng: Number(r.value.lng)
            });
        });

        return directions;
    }
}
