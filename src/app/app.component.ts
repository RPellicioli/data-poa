import { Component } from '@angular/core';
import { AlertService } from './components/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private alertService: AlertService){
        try { // Override alert()
            window.alert = this.alertMethod.bind(this);
        } catch (ex) {
            console.log(ex);
        }
    }

    private alertMethod(message: string): void {
        this.alertService.show(message);
    }
}
