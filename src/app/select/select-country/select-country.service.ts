import { Injectable, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CountryClass } from '../../shared/country/country.class';
import { CountryTally, FormModelUpdate, IndeterminateStatus, FormModelObject } from 'src/app/shared/model/select.interface';
import { CountryService } from 'src/app/shared/country/country.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SelectCountryService extends CountryClass {

  constructor(
    countryService: CountryService,
    private fb: FormBuilder
  ) {
    super(countryService)
  }

  createForm(initValue: boolean): FormGroup {
    const formModel = this.createFormModelObject(this.regions, this.subregions, initValue);
    return this.fb.group(formModel);
  }

  createRegionUpdate(form: FormGroup, region: string): FormModelUpdate {
    const { allSubregionsChecked, allSubregionsUnchecked } = this.evaluateIndeterminate(form, region);
    const formModelUpdate = {
      [region]: {
        checked: undefined,
        indeterminate: undefined
      }
    };
    if (!allSubregionsChecked && !allSubregionsUnchecked) {
      formModelUpdate[region].checked = null;
      formModelUpdate[region].indeterminate = true
    }
    else if (allSubregionsChecked) {
      formModelUpdate[region].checked = true;
      formModelUpdate[region].indeterminate = false
    }
    else if (allSubregionsUnchecked) {
      formModelUpdate[region].checked = false;
      formModelUpdate[region].indeterminate = false
    }
    return formModelUpdate;
  }

  createRegionAndSubregionsUpdate(region: string, subregions: string[], isChecked: boolean): FormModelUpdate {
    const formModelUpdate = {};
    formModelUpdate[region] = { indeterminate: false };
    _.forEach(subregions, (subregion) => {
      formModelUpdate[subregion] = isChecked;
    });
    return formModelUpdate;
  }

  updateTally(form: FormGroup): CountryTally {
    const formModel = form.value;
    const tally = { total: 0 };
    _.forEach(this.subregionsByRegion, (subregions, region) => {
      tally[region] = 0;
      _.forEach(subregions, (subregion) => {
        if (formModel[subregion]) {
          const numberOfCountries = this.countriesBySubregion[subregion].length;
          tally[region] += numberOfCountries;
          tally.total += numberOfCountries;
        }
      });
    });
    return tally;
  }

  private evaluateIndeterminate(form: FormGroup, region: string): IndeterminateStatus {
    const formModel = form.value;
    const subregions = this.subregionsByRegion[region];
    const allSubregionsChecked = subregions.every((subregion) => {
      return formModel[subregion] === true;
    });
    const allSubregionsUnchecked = subregions.every((subregion) => {
      return formModel[subregion] === false;
    });
    return {
      allSubregionsChecked,
      allSubregionsUnchecked
    };
  }

  private createFormModelObject(regions: string[], subregions: string[], isChecked: boolean): FormModelObject {
    const formModelObject = {};
    _.forEach(regions, (region) => {
      formModelObject[region] = this.fb.group({
        checked: isChecked,
        indeterminate: false
      })
    });
    _.forEach(subregions, (subregion) => {
      formModelObject[subregion] = isChecked;
    });
    return formModelObject;
  }

}
