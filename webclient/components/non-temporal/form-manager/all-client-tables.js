import allergiesClientTbl from '~/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import allergiesPresentClientTbl from '~/components/patient-data/allergies/db/client-side/structure/allergies-present-of-a-patient-table.js'
import commonForAllCts from '@/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'
import chiefComplaintClientTbl from '~/components/patient-data/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'
import dateOfBirthClientTbl from '~/components/patient-data/date-of-birth/db/client-side/structure/date-of-birth-of-a-patient-table.js'
import diagnosisClientTbl from '~/components/patient-data/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'
import familyHistoryClientTbl from '~/components/patient-data/family-history/db/client-side/structure/family-history-of-a-patient-table.js'
import medicalHistoryClientTbl from '~/components/patient-data/medical-history/db/client-side/structure/medical-history-of-a-patient-table.js'
import medicationOrderClientTbl from '~/components/patient-data/medication-orders/db/client-side/structure/medication-order-of-a-patient-table.js'
import heightClientTbl from '~/components/patient-data/height/db/client-side/structure/height-of-a-patient-table.js'
import examinationOfAPatientTbl from '~/components/patient-data/examination/db/client-side/structure/examination-of-a-patient-table.js'
import medicalReviewOfSystemOfAPatientTbl from '~/components/patient-data/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'
import miscNotesClientTbl from '~/components/patient-data/miscellaneous-notes/db/client-side/structure/miscellaneous-notes-of-a-patient-table.js'
import nameClientTbl from '~/components/patient-data/name/db/client-side/structure/name-of-a-patient-table.js'
import pastPsychHistoryClientTbl from '~/components/patient-data/past-psych-history/db/client-side/structure/past-psych-history-of-a-patient-table.js'
import planCommentsClientTbl from '~/components/patient-data/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'
import socialHistoryClientTbl from '~/components/patient-data/social-history/db/client-side/structure/social-history-of-a-patient-table.js'
import processNotesClientTbl from '~/components/patient-data/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'
import recommendationClientTbl from '~/components/patient-data/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'
import reminderClientTbl from '~/components/patient-data/reminders/db/client-side/structure/reminders-of-a-patient-table.js'
import goalsClientTbl from '~/components/patient-data/goals/db/client-side/structure/goals-of-a-patient-table.js'
import screensClientTbl from '~/components/patient-data/screens/db/client-side/structure/screens-of-a-patient-table.js'
import serviceStatementsOfAPatientTbl from '~/components/patient-data/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'
import psychReviewOfSystemOfAPatientTbl from '~/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'
import phq9ClientTbl from '~/components/patient-data/phq9/db/client-side/structure/phq9-of-a-patient-table.js'
import weightClientTbl from '~/components/patient-data/weight/db/client-side/structure/weight-of-a-patient-table.js'
import pulseClientTbl from '~/components/patient-data/pulse/db/client-side/structure/pulse-of-a-patient-table.js'
import temperatureClientTbl from '~/components/patient-data/temperature/db/client-side/structure/temperature-of-a-patient-table.js'
import bloodPressureClientTbl from '~/components/patient-data/blood-pressure/db/client-side/structure/blood-pressure-of-a-patient-table.js'
import bloodSugarClientTbl from '~/components/patient-data/blood-sugar/db/client-side/structure/blood-sugar-of-a-patient-table.js'
import waistCircumferenceClientTbl from '~/components/patient-data/waist-circumference/db/client-side/structure/waist-circumference-of-a-patient-table.js'
import bmiClientTbl from '~/components/patient-data/bmi/db/client-side/structure/bmi-of-a-patient-table.js'
import oxygenSaturationClientTbl from '~/components/patient-data/oxygen-saturation/db/client-side/structure/oxygen-saturation-of-a-patient-table.js'

/* the framework like add uses this object to find the correct vuex-orm-table to run the quries.
 For e.g.
 Step 1:
 ------
 see: temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js
 On line 55 (approx) there is
 > id: 'recommendations',

 Step 2:
 -------
 In temporal/1-/papers/change-appt-note/templates/add-form.vue
On line 164 there us:
> import clientTbl from '../tables.js'

 Step 3:
 -------
 In temporal/1-/papers/change-appt-note/templates/add-form.vue
On line 195 there us:
      return clientTbl[this._formDef.id].fnGetNewRowsInEditState()

    Hence
    import recommendationClientTbl from '@/components/patient-data/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'

    is used to run the line 30 described above.

*/
const allPatientDataTbls = {
  allergies: allergiesClientTbl,
  allergies_present: allergiesPresentClientTbl,
  chief_complaint: chiefComplaintClientTbl,
  date_of_birth: dateOfBirthClientTbl,
  diagnosis: diagnosisClientTbl,
  family_history: familyHistoryClientTbl,
  medical_history: medicalHistoryClientTbl,
  medication_orders: medicationOrderClientTbl,
  height: heightClientTbl,
  medical_review_of_system: medicalReviewOfSystemOfAPatientTbl,
  examination: examinationOfAPatientTbl,
  miscellaneous_notes: miscNotesClientTbl,
  name: nameClientTbl,
  past_psych_history: pastPsychHistoryClientTbl,
  plan_comments: planCommentsClientTbl,
  social_history: socialHistoryClientTbl,
  process_notes: processNotesClientTbl,
  recommendations: recommendationClientTbl,
  reminders: reminderClientTbl,
  service_statements: serviceStatementsOfAPatientTbl,
  psych_review_of_system: psychReviewOfSystemOfAPatientTbl,
  goals: goalsClientTbl,
  screens: screensClientTbl,
  phq9: phq9ClientTbl,
  weight: weightClientTbl,
  pulse: pulseClientTbl,
  temperature: temperatureClientTbl,
  blood_pressure: bloodPressureClientTbl,
  blood_sugar: bloodSugarClientTbl,
  waist_circumference: waistCircumferenceClientTbl,
  bmi: bmiClientTbl,
  oxygen_saturation: oxygenSaturationClientTbl,
}

export default allPatientDataTbls
