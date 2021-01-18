// For docs read webclient/docs/models.md
import clientTblManage from '~/components/non-temporal/form-manager/manage-rows-of-table-in-client-side-orm.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

const defaultValueOfTimeOfMeasurementInMilliSecs = () => Math.floor(Date.now())

export default class bloodPressureClass extends clientTblManage {
  static entity = 'tblBloodPressure'

  /* 
    Goal: Change baseurl as per NODE_ENV value. eg: If NODE_ENV == dev then baseurl = "http://localhost:8000" or If NODE_ENV == test then baseurl = "http://ptserver:8000"
    baseurl is defined in nuxt.config.js
    on 3000 json-server runs
    on 8000 nodejs runs along with sequalize
    On 8001 php/lumen/eloquent is running
    
    To check if the api is working you can enter this in the browser:
    http://127.0.0.1:8000/blood-pressure/getAll

    To make post request:
    enter http://127.0.0.1:8000/blood-pressure/getAll in https://hoppscotch.io/

    Options:
    1. static apiUrl = process.env.baseUrl + '/blood-pressure'

  */

  static apiUrl = process.env.baseUrlForLumen + '/public/api/blood-pressure/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),
      ptUuid: this.string(null),
      bloodPressureSystolic: this.number(null).nullable(),
      bloodPressureDiastolic: this.number(null).nullable(),
      notes: this.string(null).nullable(), // Ref: https://vuex-orm.org/guide/model/defining-models.html#primitive-types. Without specifying .null notes gets the default value of "null",
      timeOfMeasurementInMilliSecs: this.uid(() => defaultValueOfTimeOfMeasurementInMilliSecs()),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}

export const bloodPressureFormDef = {
  id: 'blood_pressure',
  plural: 'blood pressure',
  singular: 'blood pressure',
  fieldsDef: [
    {
      nameInDb: 'bloodPressureSystolic',
      nameInUi: 'Blood pressure systolic',
      type: 'number',
      showLabel: false,
      unitOfMeasurement: 'systolic',
    },
    {
      nameInDb: 'bloodPressureDiastolic',
      nameInUi: 'Blood pressure diastolic',
      type: 'number',
      showLabel: false,
      unitOfMeasurement: 'diastolic',
    },
    {
      nameInDb: 'notes',
      nameInUi: 'Notes',
      type: 'textarea',
      showLabel: true,
    },
    {
      nameInDb: 'timeOfMeasurementInMilliSecs',
      nameInUi: 'Measured on',
      type: 'date',
      showLabel: true,
    },
  ],
  showReviewedButtonInForm: false,
  showResetFormButton: false,
  maxNumberOfTemporallyValidRows: 1,
  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['bloodPressureSystolic'],
  ctrlPlacementOfEveryRowInViewNote: 'padding:0px',
  ctrlPlacementOfEveryFieldsNameAndValueInViewNote: 'padding:0px',
  fnCreated: function () {
    // it is critical that empty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },

  ctrlPlacementOfEveryFieldsNameAndValueInAddForm:
    'padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr; grid-column-gap: 1rem',
  // Ref: https://vuelidate.js.org/#sub-dynamic-validation-schema
  validationsObj: {
    value: {
      bloodPressureSystolic: {
        minLength: minLength(2),
      },
      bloodPressureDiastolic: {
        minLength: minLength(2),
      },
      notes: {
        minLength: minLength(0),
      },
      timeOfMeasurementInMilliSecs: {
        minLength: minLength(0),
      },
    },
  },
  graphObj: {
    series: [{ fieldName: 'bloodPressureSystolic' }, { fieldName: 'bloodPressureDiastolic' }],
  },
}
