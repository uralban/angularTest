import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService, Driver} from "../../../services/data.service";

@Component({
  selector: 'app-new-truck',
  templateUrl: './new-truck.component.html',
  styleUrls: ['./new-truck.component.scss']
})
export class NewTruckComponent implements OnInit {

  @Input() addNewModalIsOpen;
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();

  private drivers: Driver[];
  public name: string = '';
  public latitude: string = '';
  public longitude: string = '';
  public errors: string[] = [];

  constructor(
    public dataService: DataService
  ) { }

  ngOnInit() {

  }

  public closeModal(): void {
    this.name = '';
    this.latitude = '';
    this.longitude = '';
    this.errors = [];
    this.addNewModalIsOpen = false;
    this.cancelEvent.emit(this.addNewModalIsOpen);
  }

  public addAsset(): void {
    this.errors = [];
    if (!this.validateInputs()) return;

    const newDriver: Driver = {
      name: this.name.trim(),
      latitude: Number(this.latitude.trim()),
      longitude: Number(this.longitude.trim())
    }
    this.drivers.push(newDriver);
    this.dataService.writeToStorage(this.drivers)

    if (this.dataService.searchFlag) {
      this.dataService.setAddDriverUnderFilter(true);
    } else {
      this.dataService.setDrivers(this.drivers);
    }

    this.closeModal();
  }

  private validateInputs(): boolean {
    let valid: boolean = false;
    this.errors = [];

    if (!this.name.trim().length) {
      this.errors.push('Name must not be empty');
    } else {
      this.drivers = this.dataService.readStorage();
      const filter = this.drivers.filter(driver => driver.name.toLowerCase() === this.name.trim().toLowerCase());
      if (filter.length) {
        this.errors.push('Name must be unique');
      }
    }

    if (!this.latitude.trim().length) {
      this.errors.push('Latitude must not be empty');
    } else if (isNaN(Number(this.latitude.trim()))) {
      this.errors.push('Latitude must be number');
    } else if (Number(this.latitude.trim()) < -85 || Number(this.latitude.trim()) > 85) {
      this.errors.push('Latitude must be in the range from -85 to 85');
    }

    if (!this.longitude.trim().length) {
      this.errors.push('Longitude must not be empty');
    } else if (isNaN(Number(this.longitude.trim()))) {
      this.errors.push('Longitude must be number');
    } else if (Number(this.longitude.trim()) < -180 || Number(this.longitude.trim()) > 180) {
      this.errors.push('Longitude must be in the range from -180 to 180');
    }

    if (!this.errors.length) valid = true;
    return valid;
  }
}
