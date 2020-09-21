import { Model } from '@vuex-orm/core'

export default class tblSearchPhrasesOfCt extends Model {
  static entity = 'tblSearchPhrasesOfCt'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      id: this.uid(), // vuex-orm generates a unique ID https://vuex-orm.org/guide/model/defining-models.html#uid-type
      value: this.string(''), // this is the search term in the dropdown of the autcocomplete in view layer and change layer. I call it value since autocomplete function expects the object property to be called value
      ctAbbr: this.string(''), // These are industry terms like social history is called shx in medical industry
      ctToShow: this.string(''), // ctToShow => ct To Show. This is used in the <component> the special component inside vue that allows any Ct to be placed inside.
      displayLocation: this.string(''), // This can have the value of "ptsvl" or "cl". It is used to decide where to show the ct.
      usageCountKeptInClientSideTable: this.number(0), // This is used to order the search results.
      ctWidthInCl: this.string(''), // In CL we want to box to be as small as possible to more area of Vl is visible. This is used to decide on the width of the tab in the change layer
      needsRowIdToWork: this.string('no'), // needsRowIdToWork can either be yes or no. If needsRowIdToWork is 'Yes' then search term do not come in Vl or Cl search box. needsRowIdToWork='Yes' search terms are only used to invokle Ct when a icon beside a row is click in Vl
    }
  }
}
