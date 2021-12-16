import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "./services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, DoCheck {

  public addNewModalIsOpen: boolean = false;
  public closeModalIsOpen: boolean = false;
  private subscriptions: Subscription[] = [];
  public deleteAssetName: string = ''

  public mapsList: [{ name: string; value: string }, { name: string; value: string }] = [
    {name: 'Google', value: 'google'},
    {name: 'Leaflet', value: 'leaflet'}
  ];
  public currentMap: string = 'google';

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.deleteAssetName.subscribe(name => {
        if (name) {
          this.closeModalIsOpen = true;
          this.deleteAssetName = name;
        }
      })
    );
  }

  ngDoCheck(): void {
    this.dataService.setMapType(this.currentMap);
  }

  public cancelEvent($event: boolean): void {
    this.addNewModalIsOpen = $event;
    this.closeModalIsOpen = $event;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
