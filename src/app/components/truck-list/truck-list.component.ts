import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService, Driver} from "../../services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.scss']
})
export class TruckListComponent implements OnInit, OnDestroy {

  public drivers: Driver[];
  public subscriptions: Subscription[] = [];

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.drivers.subscribe(drivers => {
        this.drivers = drivers;
      })
    );

    this.drivers = this.dataService.readStorage();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
