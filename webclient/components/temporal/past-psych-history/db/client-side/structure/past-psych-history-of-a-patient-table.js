// For docs read webclient/docs/models.md
import clientTblManage from '~/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'
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

  static apiUrl = 'http://localhost:8000/public/api/past-psych-history/v20'

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
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliseconds is used.
    }
  }
}

export const pastPsychHistoryFormDef = {
  id: 'past_psych_history',
  plural: 'past psych history',
  singular: 'past psych history',
  fieldsDef: [
    {
      fieldNameInDb: 'past_outpatient_treatment',
      fieldNameInUi: 'Past outpatient treatment',
      fieldType: 'textarea',
      span: 24,
      showFieldLabel: true,
    },
    {
      fieldNameInDb: 'past_meds_trials',
      fieldNameInUi: 'Past meds trials',
      fieldType: 'textarea',
      span: 24,
      showFieldLabel: true,
    },
    {
      fieldNameInDb: 'hospitalization',
      fieldNameInUi: 'Hospitalization',
      fieldType: 'textarea',
      span: 24,
      showFieldLabel: true,
    },
    {
      fieldNameInDb: 'history_of_violence',
      fieldNameInUi: 'History of violence',
      fieldType: 'textarea',
      span: 24,
      showFieldLabel: true,
    },
    {
      fieldNameInDb: 'history_of_self_harm',
      fieldNameInUi: 'History of self harm',
      fieldType: 'textarea',
      span: 24,
      showFieldLabel: true,
    },
    {
      fieldNameInDb: 'past_substance_abuse',
      fieldNameInUi: 'Past substance abuse',
      fieldType: 'textarea',
      span: 24,
      showFieldLabel: true,
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
  showFormReviewedButton: false,
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
  styleForEachRowInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 1rem',
}
