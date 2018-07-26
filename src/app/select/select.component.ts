import { Component, OnInit } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { Country } from '../shared/model/country.interface';
import { CountryService } from '../shared/country/country.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('300ms ease-in', style({ opacity: '1' }))
      ])
    ])
  ]
})
export class SelectComponent implements OnInit {
  public countries: Country[];

  constructor(
    private countryService: CountryService,
  ) { }

  ngOnInit() {
    this.countries = this.countryService.countries;
  }

}
