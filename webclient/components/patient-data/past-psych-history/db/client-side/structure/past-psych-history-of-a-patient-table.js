// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class past_psych_history extends clientTblManage {
  static entity = 'tblPastPsychHistory'

  /*
    Goal: Change baseurl as per NODE_ENV value. eg: If NODE_ENV == dev then baseurl = "http://localhost:8000" or If NODE_ENV == test then baseurl = "http://ptserver:8000"
    baseurl is defined in nuxt.config.js
    on 3000 json-server runs
    on 8000 nodejs runs along with sequalize
    On 8001 php/lumen/eloquent is running

    To check if the api is working you can enter this in the browser:
    http://127.0.0.1:8000/family-history/getAll

    To make post request:
    enter http://127.0.0.1:8000/family-history/getAll in https://hoppscotch.io/

    Options:
    1. static apiUrl = process.env.baseUrl + '/family-history'

  */

  static apiUrl = process.env.baseUrlForLumen + '/public/api/past-psych-history/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      ptUuid: this.string(null),
      past_outpatient_treatment: this.string(''),
      past_meds_trials: this.string(''),
      hospitalization: this.string(''),
      history_of_violence: this.string(''),
      history_of_self_harm: this.string(''),
      past_substance_abuse: this.string(''),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}

export const pastPsychHistoryFormDef = {
  id: 'past_psych_history',
  plural: 'past psych history',
  singular: 'past psych history',
  ctrlPlacementOfEveryFieldsNameAndValueInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem; grid-row-gap: 1rem',
  ctrlPlacementOfEveryRowInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',
  ctrlPlacementOfEveryFieldsNameAndValueInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: .1rem; grid-row-gap: .1rem',

  fieldsDef: [
    {
      nameInDb: 'past_outpatient_treatment',
      nameInUi: 'Past outpatient treatment',
      type: 'textarea',
      showLabel: true,
      showHistory: 'onFocus',
    },
    {
      nameInDb: 'past_meds_trials',
      nameInUi: 'Past meds trials',
      type: 'textarea',
      showLabel: true,
      showHistory: 'onFocus',
    },
    {
      nameInDb: 'hospitalization',
      nameInUi: 'Hospitalization',
      type: 'textarea',
      showLabel: true,
      showHistory: 'onFocus',
    },
    {
      nameInDb: 'history_of_violence',
      nameInUi: 'History of violence',
      type: 'textarea',
      showLabel: true,
      showHistory: 'onFocus',
    },
    {
      nameInDb: 'history_of_self_harm',
      nameInUi: 'History of self harm',
      type: 'textarea',
      showLabel: true,
      showHistory: 'onFocus',
    },
    {
      nameInDb: 'past_substance_abuse',
      nameInUi: 'Past substance abuse',
      type: 'textarea',
      showLabel: true,
      showHistory: 'onFocus',
    },
  ],
  atLeastOneOfFieldsForCheckingIfRowIsEmpty: [
    'past_outpatient_treatment',
    'past_meds_trials',
    'hospitalization',
    'history_of_violence',
    'history_of_self_harm',
    'past_substance_abuse',
  ],
  maxNumberOfTemporallyValidRows: 1,
  showReviewedButtonInForm: false,
  showResetFormButton: false,
  validationsObj: {
    value: {
      past_outpatient_treatment: {
        minLength: minLength(8),
      },
      past_meds_trials: {
        minLength: minLength(8),
      },
      hospitalization: {
        minLength: minLength(8),
      },
      history_of_violence: {
        minLength: minLength(8),
      },
      history_of_self_harm: {
        minLength: minLength(8),
      },
      past_substance_abuse: {
        minLength: minLength(8),
      },
    },
  },
  fnCreated: function () {
    // it is critical that empty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },
}
