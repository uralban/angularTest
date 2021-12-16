import {Component, Input, OnInit} from '@angular/core';
import {Driver} from "../../../services/data.service";

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {

  @Input('driver') driver: Driver;

  constructor() { }

  ngOnInit() {
  }

}
