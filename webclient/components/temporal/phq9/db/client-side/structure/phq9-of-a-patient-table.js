// For docs read webclient/docs/models.md
import clientTblManage from '~/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'
import phq9MasterClass from './phq9-all-select-options.js'
import phq9AllSelectOptionsTbl from './phq9-all-select-options.js'
import phq9OfAPatientTbl from '~/components/temporal/phq9/db/client-side/structure/phq9-of-a-patient-table.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class phq9ForPatientClass extends clientTblManage {
  static entity = 'tblPhq9'

  static apiUrl = process.env.baseUrlForLumen + '/public/api/phq9/v20'

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      ...super.fields(),

      clientSideUniqRowId: this.uid(() => intUniqueId()), // if this is not set then update based on primary key will not work
      serverSideRowUuid: this.uid(() => uuidv1()),

      /* This field is used to store the value of tblPsychReviewOfSystemsAllSelectOptions/phq9FieldOptionId
         E.g: The  tblPsychReviewOfSystemsAllSelectOptions has:
         phq9FieldOptionId  |         phq9FieldOptionLabel    
              1                    |  Spent 10 min with patient
              2                    |  Spent 20 min with patient

          When doctor assigns 2 to this patient then in this table phq9FieldOptionId = 2 */

      interest: this.number(0),
      depressed: this.number(0),
      sleep: this.number(0),
      energy: this.number(0),
      appetite: this.number(0),
      down: this.number(0),
      concentrating: this.number(0),
      slowly: this.number(0),
      hurting: this.number(0),

      patientUuid: this.string(null),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp*1000 value from mariaDB for ROW_END.  When a record is created new in MariaDB system versioned table, this value is set by MariaDB. Internally everywhere timeInMilliSecs is used.
    }
  }
}

export const phq9FormDef = {
  id: 'phq9',
  plural: 'phq9',
  singular: 'phq9',
  fieldsDef: [
    {
      nameInDb: 'interest',
      nameInUi: 'Little interest or pleasure in doing things?',
      type: 'slider',
      span: 24,
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not at all',
        1: 'Several days',
        2: 'More then half the days',
        3: 'Nearly every day',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
      style: 'padding: 20px',
    },
    {
      nameInDb: 'depressed',
      nameInUi: 'Feeling down depressed or hopeless?',
      type: 'slider',
      span: 24,
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not at all',
        1: 'Several days',
        2: 'More then half the days',
        3: 'Nearly every day',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
      style: 'padding: 20px',
    },
    {
      nameInDb: 'sleep',
      nameInUi: 'Trouble falling or staying asleep, or sleeping too much?',
      type: 'slider',
      span: 24,
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not at all',
        1: 'Several days',
        2: 'More then half the days',
        3: 'Nearly every day',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
      style: 'padding: 20px',
    },
    {
      nameInDb: 'energy',
      nameInUi: 'Feeling tired or having little energy?',
      type: 'slider',
      span: 24,
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not at all',
        1: 'Several days',
        2: 'More then half the days',
        3: 'Nearly every day',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
      style: 'padding: 20px',
    },
    {
      nameInDb: 'appetite',
      nameInUi: 'Poor appetite or overeating?',
      type: 'slider',
      span: 24,
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not at all',
        1: 'Several days',
        2: 'More then half the days',
        3: 'Nearly every day',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
      style: 'padding: 20px',
    },
    {
      nameInDb: 'down',
      nameInUi: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down?',
      type: 'slider',
      span: 24,
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not at all',
        1: 'Several days',
        2: 'More then half the days',
        3: 'Nearly every day',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
      style: 'padding: 20px',
    },
    {
      nameInDb: 'concentrating',
      nameInUi: 'Trouble concentrating on things, such as reading the newspaper or watching television?',
      type: 'slider',
      span: 24,
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not at all',
        1: 'Several days',
        2: 'More then half the days',
        3: 'Nearly every day',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
      style: 'padding: 20px',
    },
    {
      nameInDb: 'slowly',
      fieldNameInUi:
        'Moving or speaking so slowly that other people could have noticed? Or so fidgety or restless that you have been moving a lot more than usual?',
      type: 'slider',
      span: 24,
      showLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
      marks: {
        0: 'Not at all',
        1: 'Several days',
        2: 'More then half the days',
        3: 'Nearly every day',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
      style: 'padding: 20px',
    },
    {
      nameInDb: 'hurting',
      nameInUi: 'Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?',
      type: 'slider',
      span: 24,
      fieldOptions: { min: 0, max: 3, step: 1 },
      showLabel: true,
      marks: {
        0: 'Not at all',
        1: 'Several days',
        2: 'More then half the days',
        3: 'Nearly every day',
      },
      ft: function formatTooltip(val) {
        return this.marks[val]
      },
      style: 'padding: 20px',
    },
  ],
  showReviewedButtonInForm: false,
  maxNumberOfTemporallyValidRows: 1,

  atLeastOneOfFieldsForCheckingIfRowIsEmpty: [
    'interest',
    'depressed',
    'sleep',
    'energy',
    'appetite',
    'down',
    'concentrating',
    'slowly',
    'hurting',
  ],

  fnCreated: function (pRow) {
    // Goal: When it starts i need to initialize value with the initial slider value
    // At start this gets called with empty pRow so I return an empty array
    if (pRow.length < 1) {
      return []
    } else {
      return pRow[0]
    }
  },
  fnGetSelectOptionLabel: function (pFieldNameInDb, pfieldValue) {
    if (pfieldValue === '') return

    // from numbers get the labels

    let arOfAllSelectOptions = phq9AllSelectOptionsTbl
      .query()
      .where('phq9FieldNameInDb', pFieldNameInDb)
      .where('phq9FieldOptionId', pfieldValue)
      .get()

    const optionIdToLabel = arOfAllSelectOptions[0]['phq9FieldOptionLabel']

    return optionIdToLabel
  },
  styleForEachRowInAddForm:
    'padding: 20px; margin: 20px; display: grid; grid-template-columns: 1fr ; grid-column-gap: 1rem',
}
