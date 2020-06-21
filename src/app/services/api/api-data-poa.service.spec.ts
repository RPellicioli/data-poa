import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiDataPOAService } from './api-data-poa.service';
import { ApiModule } from './api.module';

describe('ApiDataPOAService', () => {
    let injector: TestBed;
    let service: ApiDataPOAService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ApiModule
            ]
        });
        injector = getTestBed();
        service = injector.get(ApiDataPOAService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    // it('should return an lines', () => {
    //     const lines = [
    //         { id: '1', nome: 'teste', codigo: '123' },
    //         { id: '2', nome: 'teste 2', codigo: '123' },
    //     ];

    //     service.getLines().then(l => {
    //         expect(l.length).toBeGreaterThan(0);
    //     });

    //     const req = httpMock.expectOne('http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%25&t=o');
    //     expect(req.request.method).toBe("GET");
    //     req.flush(lines);
    // });
});