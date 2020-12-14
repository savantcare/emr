// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class medication_order extends clientTblManage {
  static entity = 'tblMedicationOrder'

  /* 
    Goal: Change baseurl as per NODE_ENV value. eg: If NODE_ENV == dev then baseurl = "http://localhost:8000" or If NODE_ENV == test then baseurl = "http://ptserver:8000"
    baseurl is defined in nuxt.config.js
    on 3000 json-server runs
    on 8000 nodejs runs along with sequalize
    On 8001 php/lumen/eloquent is running
    
    To check if the api is working you can enter this in the browser:
    http://127.0.0.1:8000/medication-order/getAll

    To make post request:
    enter http://127.0.0.1:8000/medication-order/getAll in https://hoppscotch.io/

    Options:
    1. static apiUrl = process.env.baseUrl + '/medication-order'

  */

  static apiUrl = process.env.baseUrlForLumen + '/public/api/medication-order/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      ptUuid: this.string(null),
      drugName: this.string(''),
      directionsForPatient: this.string(''),
      startDate: this.string(''),
      qty: this.string(''),
      daysSupply: this.string(''),
      numberOfRefill: this.number(),
      dispenseAsWritten: this.string(),
      notesToPharmacist: this.string(''),
      orderingProvider: this.string(''),
      pharmacy: this.string(''),
      priority: this.number(),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}

export const medicationOrderFormDef = {
  id: 'medication_orders',
  plural: 'medication order',
  singular: 'medication order',
  fieldsDef: [
    { nameInDb: 'drugName', nameInUi: 'Drug name', type: 'text', showLabel: true },
    { nameInDb: 'directionsForPatient', nameInUi: 'Direction for the patient', type: 'textarea', showLabel: true },
    { nameInDb: 'startDate', nameInUi: 'Start date', type: 'date', showLabel: true },
    { nameInDb: 'qty', nameInUi: 'Quantity', type: 'text', showLabel: true },
    { nameInDb: 'daysSupply', nameInUi: 'Days supply', type: 'text', showLabel: true },
    { nameInDb: 'numberOfRefill', nameInUi: 'Numnber of refill', type: 'text', showLabel: true },
    { nameInDb: 'dispenseAsWritten', nameInUi: 'Dispense as written', type: 'textarea', showLabel: true },
    { nameInDb: 'notesToPharmacist', nameInUi: 'Notes to pharmacist', type: 'textarea', showLabel: true },
    { nameInDb: 'orderingProvider', nameInUi: 'Ordering provider', type: 'textarea', showLabel: true },
    { nameInDb: 'pharmacy', nameInUi: 'Pharmacy', type: 'textarea', showLabel: true },
  ],
  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['diagnosis'],
  fnCreated: function () {
    // it is critical that empty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },
  showReviewedButtonInForm: false,
  showAddMoreButtonInForm: false,
  showResetFormButton: false,

  ctrlPlacementOfEveryFieldsNameAndValueInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 3fr 3fr 1fr; grid-column-gap: 1rem',
  ctrlPlacementOfEveryFieldsNameAndValueInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 3fr 3fr; grid-column-gap: .1rem; grid-row-gap: .1rem',
  ctrlPlacementOfEveryRowInViewNote:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',

  validationsObj: {
    value: {
      description: {
        minLength: minLength(3),
      },
      diagnosis: {
        minLength: minLength(3),
      },
    },
  },
}
