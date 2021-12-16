import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService, Driver} from "../../services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  public searchAsset: string = '';
  private drivers: Driver[];
  private subscriptions: Subscription[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.dataService.addDriverUnderFilter.subscribe(flag => {
        if (flag) {
          this.search();
        }
      })
    );
  }

  public search(): void {
    this.drivers = this.dataService.readStorage();
    const newDrivers = this.drivers.filter(driver => driver.name.toLowerCase().indexOf(this.searchAsset) !== -1);
    this.dataService.searchFlag = (this.drivers.length - newDrivers.length > 0);
    this.dataService.setDrivers(newDrivers);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscrition => subscrition.unsubscribe());
  }
}
