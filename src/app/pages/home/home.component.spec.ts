import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';
import { ApiModule } from 'src/app/services/api/api.module';

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
});
