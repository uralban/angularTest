import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService, Driver} from "../../services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  public showMap: boolean = false;
  public mapType: string = 'google';
  public driver: Driver;
  private subscriptions: Subscription[] = []

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.dataService.position.subscribe(driver => {
        if (driver) {
          this.driver = driver;
          this.showMap = true;
        } else {
          this.showMap = false;
        }
      })
    );
    this.subscriptions.push(
      this.dataService.mapType.subscribe(mapType => {
        if (this.mapType !== mapType) {
          this.mapType = mapType;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
