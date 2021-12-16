import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService, Driver} from "../../../services/data.service";

@Component({
  selector: 'app-single-truck',
  templateUrl: './single-truck.component.html',
  styleUrls: ['./single-truck.component.scss']
})
export class SingleTruckComponent implements OnInit {

  @Input('name') name: string;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  public showMap($event): void {
    if ($event.target.tagName === 'BUTTON') return;

    const drivers: Driver[] = this.dataService.readStorage();
    const driver: Driver = drivers.find(driver => driver.name === this.name);
    this.dataService.setPosition(driver);
  }

  public deleteAsset(): void {
    this.dataService.openDeleteAssetModal(this.name);
  }
}
