import { Model } from '@vuex-orm/core'

export default class ormSearchPhrasesOfCt extends Model {
  static entity = 'ormSearchPhrasesOfCt'

  static fields() {
    return {
      id: this.uid(), // vuex-orm generates a unique ID https://vuex-orm.org/guide/model/defining-models.html#uid-type
      value: this.string(''), // this is the search term in the dropdown of the autcocomplete in view layer and change layer. I call it value since autocomplete function expects the object property to be called value
      ctAbbr: this.string(''), // These are industry terms like social history is called shx in medical industry
      ctToShowInCL: this.string(''), // ctToShowInCL => Ct to show in change layer
      ctToShowInCsOfVl: this.string(''), // ctToShowInCsOfVl => ct To Show In Cs Of View layer.
      layer: this.string(''), // This can have the value of "change" or "view"
      usageCountKeptInLS: this.number(0), // usageCountKeptInLS => usage Count Kept In Local storate. This is used to order the search results.
      ctWidth: this.string(''), // In CL we want to box to be as small as possible to more area of Vl is visible.
    }
  }
}
