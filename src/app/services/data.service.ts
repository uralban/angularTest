import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface Driver {
  name: string,
  latitude: number,
  longitude: number
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public drivers: BehaviorSubject<Driver[]> = new BehaviorSubject(null);
  public position: BehaviorSubject<Driver> = new BehaviorSubject(null);
  public deleteAssetName: BehaviorSubject<string> = new BehaviorSubject(null);
  public searchFlag: boolean = false;
  public mapType: BehaviorSubject<string> = new BehaviorSubject(null);
  public addDriverUnderFilter: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  public readStorage(): Driver[] {
    return JSON.parse(localStorage.getItem('drivers')) || [];
  }

  public writeToStorage(drivers: Driver[]): void {
    localStorage.setItem('drivers', JSON.stringify(drivers));
  }

  public setDrivers(drivers: Driver[]): void {
    this.drivers.next(drivers);
  }

  public getDrivers(): Driver[] {
    return this.drivers.value;
  }

  public setPosition(driver: Driver): void {
    this.position.next(driver);
  }

  public getPosition(): Driver {
    return this.position.value;
  }

  public openDeleteAssetModal(name: string): void {
    this.deleteAssetName.next(name);
  }

  public setMapType(mapType: string): void {
    this.mapType.next(mapType);
  }

  public setAddDriverUnderFilter(flag: boolean): void {
    this.addDriverUnderFilter.next(flag);
  }
}
