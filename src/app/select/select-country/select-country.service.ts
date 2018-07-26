import { Injectable, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { CountryClass } from '../../shared/country/country.class';
import { CountryTally, FormModelUpdate, IndeterminateStatus, FormModelObject } from 'src/app/shared/model/select.interface';
import { CountryService } from 'src/app/shared/country/country.service';
import { Country } from 'src/app/shared/model/country.interface';


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

  groupSubcategoriesByCategory(data: Country[], category: string, subcategory: string): _.Dictionary<string[]> {
    return _.reduce(data, (accum, item) => {
      const itemCategory = item[category];
      const itemSubcategory = item[subcategory];
      if (!accum[itemCategory]) {
        accum[itemCategory] = [];
      }
      if (!accum[itemCategory].includes(itemSubcategory)) {
        accum[itemCategory].push(itemSubcategory);
      }
      return accum;
    }, {});
  }

  createForm(categories: string[], subcategories: string[], initValue: boolean): FormGroup {
    const formModel = this.createFormModelObject(categories, subcategories, initValue);
    return this.fb.group(formModel);
  }

  createCategoryUpdate(form: FormGroup, category: string): FormModelUpdate {
    const { allSubcategoriesChecked, allSubcategoriesUnchecked } = this.evaluateIndeterminate(form, category);
    const formModelUpdate = {
      [category]: {
        checked: undefined,
        indeterminate: undefined
      }
    };
    if (!allSubcategoriesChecked && !allSubcategoriesUnchecked) {
      formModelUpdate[category].checked = null;
      formModelUpdate[category].indeterminate = true
    }
    else if (allSubcategoriesChecked) {
      formModelUpdate[category].checked = true;
      formModelUpdate[category].indeterminate = false
    }
    else if (allSubcategoriesUnchecked) {
      formModelUpdate[category].checked = false;
      formModelUpdate[category].indeterminate = false
    }
    return formModelUpdate;
  }

  createCategoryAndSubcategoryUpdate(region: string, subregions: string[], isChecked: boolean): FormModelUpdate {
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
    // TODO: remove the dependency to this.subregionsByRegion from this service
    const subcategories = this.subregionsByRegion[region];
    const allSubcategoriesChecked = subcategories.every((subcategory) => {
      return formModel[subcategory] === true;
    });
    const allSubcategoriesUnchecked = subcategories.every((subcategory) => {
      return formModel[subcategory] === false;
    });
    return {
      allSubcategoriesChecked,
      allSubcategoriesUnchecked
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
