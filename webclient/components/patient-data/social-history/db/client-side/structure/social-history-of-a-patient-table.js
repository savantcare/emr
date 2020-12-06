// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class social_history extends clientTblManage {
  static entity = 'tblSocialHistory'

  /* 
    Goal: Change baseurl as per NODE_ENV value. eg: If NODE_ENV == dev then baseurl = "http://localhost:8000" or If NODE_ENV == test then baseurl = "http://ptserver:8000"
    baseurl is defined in nuxt.config.js
    on 3000 json-server runs
    on 8000 nodejs runs along with sequalize
    On 8001 php/lumen/eloquent is running
    
    To check if the api is working you can enter this in the browser:
    http://127.0.0.1:8000/social-history/getAll

    To make post request:
    enter http://127.0.0.1:8000/social-history/getAll in https://hoppscotch.io/

    Options:
    1. static apiUrl = process.env.baseUrl + '/social-history'

  */

  static apiUrl = process.env.baseUrlForLumen + '/public/api/social-history/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      ptUuid: this.string(null),
      current_social_situation: this.string(''),
      education_work_history: this.string(''),
      social_supports: this.string(''),
      developmental_history: this.string(''),
      trauma_history: this.string(''),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}

export const socialHistoryFormDef = {
  id: 'social_history',
  plural: 'social history',
  singular: 'social history',
  fieldsDef: [
    { nameInDb: 'current_social_situation', nameInUi: 'Current social situation', type: 'textarea', showLabel: true },
    {
      nameInDb: 'education_work_history',
      nameInUi: 'Education / Work / Military Hx',
      type: 'textarea',
      showLabel: true,
    },
    { nameInDb: 'social_supports', nameInUi: 'Social supports', type: 'textarea', showLabel: true },
    { nameInDb: 'developmental_history', nameInUi: 'Developmental history', type: 'textarea', showLabel: true },
    { nameInDb: 'trauma_history', nameInUi: 'Trauma history', type: 'textarea', showLabel: true },
  ],
  ctrlPlacementOfEveryFieldsNameAndValueInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',
  ctrlPlacementOfEveryRowInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',
  ctrlPlacementOfEveryFieldsNameAndValueInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: .1rem; grid-row-gap: .1rem',

  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['current_social_situation'],
  fnCreated: function () {
    // it is critical that emoty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },
  showReviewedButtonInForm: false,
  showAddMoreButtonInForm: false,
  showResetFormButton: false,
  maxNumberOfTemporallyValidRows: 1,

  // Ref: https://vuelidate.js.org/#sub-dynamic-validation-schema
  validationsObj: {
    value: {
      description: {
        minLength: minLength(8),
      },
    },
  },
}
