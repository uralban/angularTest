import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService, Driver} from "../../../services/data.service";

@Component({
  selector: 'app-delete-truck',
  templateUrl: './delete-truck.component.html',
  styleUrls: ['./delete-truck.component.scss']
})
export class DeleteTruckComponent implements OnInit {

  @Input('closeModalIsOpen') closeModalIsOpen;
  @Input('name') name;
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();

  private drivers: Driver[];
  private filterDrivers: Driver[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  public closeModal(): void {
    this.closeModalIsOpen = false;
    this.cancelEvent.emit(this.closeModalIsOpen);
  }

  public deleteAsset(): void {
    this.drivers = this.dataService.readStorage();
    this.filterDrivers = (this.dataService.searchFlag) ? this.dataService.getDrivers() : this.dataService.readStorage();
    const newDrivers: Driver[] = this.filterDrivers.filter(driver => driver.name !== this.name);
    const newDriversToWrite: Driver[] = this.drivers.filter(driver => driver.name !== this.name);

    this.dataService.writeToStorage(newDriversToWrite);
    this.dataService.setDrivers(newDrivers);

    const currentDriverOnMap: Driver = this.dataService.getPosition();
    if (currentDriverOnMap) {
      if (currentDriverOnMap.name === this.name) this.dataService.setPosition(null);
    }
    this.closeModal();
  }
}
