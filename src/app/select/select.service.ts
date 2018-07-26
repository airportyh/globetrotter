import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

import { CountryService } from '../shared/country/country.service';
import { FormModelObject } from '../shared/model/select.interface';
import { CountryClass } from '../shared/country/country.class';

@Injectable({
  providedIn: 'root'
})
export class SelectService extends CountryClass {

  constructor(
    countryService: CountryService
  ) {
    super(countryService)
  }

}
