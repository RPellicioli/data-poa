import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';
import { ApiModule } from 'src/app/services/api/api.module';
import { FilterPipe } from 'src/app/pipes/filter';
import { Line } from 'src/app/models/line';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HomeModule,
                ApiModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should get bus lines', async () => {
        await component.loadBus();
        expect(component.lines.length).toBeGreaterThan(0);
    });

    it('should get stocking lines', async () => {
        await component.loadStocking();
        expect(component.lines.length).toBeGreaterThan(0);
    });

    it('should select nav', () => {
        component.selectNav(component.navs[1]);

        expect(component.navs[1].active).toBeTruthy();
        expect(component.navs[0].active).toBeFalsy();
    });

    it('should select line', async () => {
        await component.loadBus();

        component.selectLine(component.lines[0]);

        expect(component.lines[0].active).toBeTruthy();
    });

    it('html should render line list', async(() => {
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector(".line-list");

        expect(el).toBeTruthy();
    }));

    it('should valid filter pipe', () => {
        const pipe = new FilterPipe();
        const lines: Line[] = [
            {
                id: 1,
                codigo: '1',
                nome: 'teste',
                active: false
            },
            {
                id: 2,
                codigo: '2',
                nome: 'linha 2',
                active: false
            }
        ]

        const search = pipe.transform(lines, { codigo: 'test', nome: 'test' }, false) as Line[];
        const empty = pipe.transform(lines, { codigo: '5', nome: 'elon musk' }, false) as Line[];

        expect(search[0].nome).toEqual('teste');
        expect(empty.length).toEqual(0);
    });
});
