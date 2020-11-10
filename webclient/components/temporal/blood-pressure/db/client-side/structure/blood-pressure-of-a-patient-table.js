// For docs read webclient/docs/models.md
import clientTblManage from '~/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'
import { required, minLength, between } from 'vuelidate/lib/validators'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

const defaultValueOfTimeOfMeasurementInMilliseconds = () => Math.floor(Date.now())

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
      bloodPressureSystolic: this.string(''),
      bloodPressureDiastolic: this.string(''),
      notes: this.string(null).nullable(), // Ref: https://vuex-orm.org/guide/model/defining-models.html#primitive-types. Without specifying .null notes gets the default value of "null",
      timeOfMeasurementInMilliseconds: this.uid(() => defaultValueOfTimeOfMeasurementInMilliseconds()),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliseconds is used.
    }
  }
}

export const bloodPressureFormDef = {
  id: 'blood_pressure',
  plural: 'blood pressure',
  singular: 'blood pressure',
  fieldsDef: [
    {
      fieldNameInDb: 'bloodPressureSystolic',
      fieldNameInUi: 'Blood pressure systolic',
      fieldType: 'number',
      span: 12,
      showFieldLabel: false,
      unitOfMeasurement: 'systolic',
    },
    {
      fieldNameInDb: 'bloodPressureDiastolic',
      fieldNameInUi: 'Blood pressure diastolic',
      fieldType: 'number',
      span: 12,
      showFieldLabel: false,
      unitOfMeasurement: 'diastolic',
    },
    {
      fieldNameInDb: 'notes',
      fieldNameInUi: 'Notes',
      fieldType: 'textarea',
      span: 24,
      showFieldLabel: true,
    },
    {
      fieldNameInDb: 'timeOfMeasurementInMilliseconds',
      fieldNameInUi: 'Measured on',
      fieldType: 'date',
      span: 24,
      showFieldLabel: true,
    },
  ],
  showFormReviewedButton: false,
  maxNumberOfTemporallyValidRows: 1,
  atLeastOneOfFieldsForCheckingIfRowIsEmpty: ['bloodPressureSystolic'],
  fnCreated: function () {
    // it is critical that empty array is returned. Since v-model uses it. And validation uses v-model
    return []
  },

  styleForEachRowInAddForm:
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
      timeOfMeasurementInMilliseconds: {
        minLength: minLength(0),
      },
    },
  },
  graphObj: {
    series: [{ fieldName: 'bloodPressureSystolic' }, { fieldName: 'bloodPressureDiastolic' }],
  },
}
