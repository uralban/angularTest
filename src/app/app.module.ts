import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { MapComponent } from './components/map/map.component';
import { TruckListComponent } from './components/truck-list/truck-list.component';
import { SingleTruckComponent } from './components/truck-list/single-truck/single-truck.component';
import { NewTruckComponent } from './components/modals/new-truck/new-truck.component';
import { DeleteTruckComponent } from './components/modals/delete-truck/delete-truck.component';
import {FormsModule} from "@angular/forms";
import {AgmCoreModule} from "@agm/core";
import { GoogleComponent } from './components/map/google/google.component';
import { LeafletComponent } from './components/map/leaflet/leaflet.component';
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MapComponent,
    TruckListComponent,
    SingleTruckComponent,
    NewTruckComponent,
    DeleteTruckComponent,
    GoogleComponent,
    LeafletComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB3dfkdD2TDQ6BNjz63MRFPGGsU1VvVU8w'
        }),
        NgSelectModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
