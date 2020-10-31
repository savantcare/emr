// For docs read webclient/docs/models.md
import clientTblManage from '~/components/framework/crud/manage-rows-of-table-in-client-side-orm.js'
import phq9MasterClass from './phq9-all-select-options.js'
import phq9AllSelectOptionsTbl from './phq9-all-select-options.js'
import phq9OfAPatientTbl from '~/components/temporal/phq9/db/client-side/structure/phq9-of-a-patient-table.js'

const { v1: uuidv1 } = require('uuid')
let count = 0
const intUniqueId = () => ++count

export default class phq9ForPatientClass extends clientTblManage {
  static entity = 'tblPhq9'

  static apiUrl = 'http://localhost:8000/public/api/phq9/v20'

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
      depressive_mood: this.number(0),
      interest: this.number(0),
      sleep: this.number(0),
      selfEsteem: this.number(0),
      energy: this.number(0),
      concDist: this.number(0),
      appetite: this.number(0),
      pmrPma: this.number(0),
      obese: this.number(0),
      thinCachectic: this.number(0),
      disheveledUnkempt: this.number(0),
      malodorous: this.number(0),
      /* Heading fields need default values since there is a empty check on these in paper.vue. 
          The empty check is there to decide if a div should be included in DOM or not. Since Div is used by css:grid.
          If a grid withput content is included then there will be a empty box in the paper note */
      heading_gateway: this.string('heading_gateway'),
      heading_depression: this.string('heading_depression'),

      patientUuid: this.string(null),
      recordChangedByUuid: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483648000), // this is unix_timestamp value from mariaDB for ROW_END when a record is created new in MariaDB system versioned table.
    }
  }
}

export const phq9FormDef = {
  id: 'phq9',
  plural: 'phq9',
  singular: 'phq9',
  fieldsDef: [
    {
      fieldNameInDb: 'depressive_mood',
      fieldNameInUi: 'Little interest or pleasure in doing things?',
      fieldType: 'slider',
      span: 24,
      showFieldLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
    },
    {
      fieldNameInDb: 'interest',
      fieldNameInUi: 'Feeling down depressed or hopeless?',
      fieldType: 'slider',
      span: 24,
      showFieldLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
    },
    {
      fieldNameInDb: 'sleep',
      fieldNameInUi: 'Trouble falling or staying asleep, or sleeping too much?',
      fieldType: 'slider',
      span: 24,
      showFieldLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
    },
    {
      fieldNameInDb: 'selfEsteem',
      fieldNameInUi: 'Feeling tired or having little energy?',
      fieldType: 'slider',
      span: 24,
      showFieldLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
    },
    {
      fieldNameInDb: 'energy',
      fieldNameInUi: 'Poor appetite or overeating?',
      fieldType: 'slider',
      span: 24,
      showFieldLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
    },
    {
      fieldNameInDb: 'concDist',
      fieldNameInUi: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down?',
      fieldType: 'slider',
      span: 24,
      showFieldLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
    },
    {
      fieldNameInDb: 'appetite',
      fieldNameInUi: 'Trouble concentrating on things, such as reading the newspaper or watching television?',
      fieldType: 'slider',
      span: 24,
      showFieldLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
    },
    {
      fieldNameInDb: 'pmrPma',
      fieldNameInUi:
        'Moving or speaking so slowly that other people could have noticed? Or so fidgety or restless that you have been moving a lot more than usual?',
      fieldType: 'slider',
      span: 24,
      showFieldLabel: true,
      fieldOptions: { min: 0, max: 3, step: 1 },
    },
    {
      fieldNameInDb: 'heading_gateway',
      fieldNameInUi: 'Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?',
      fieldType: 'slider',
      span: 24,
      fieldOptions: { min: 0, max: 3, step: 1 },
      showFieldLabel: true,
    },
  ],
  showFormReviewedButton: false,
  maxNumberOfRows: 1,

  atLeastOneOfFieldsForCheckingIfRowIsEmpty: [
    'depressive_mood',
    'interest',
    'sleep',
    'selfEsteem',
    'energy',
    'concDist',
    'appetite',
    'pmrPma',
    'obese',
    'thinCachectic',
    'disheveledUnkempt',
    'malodorous',
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
}
