import { allergiesFormDef } from '~/components/patient-data/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import { chiefComplaintFormDef } from '~/components/patient-data/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'
import { diagnosisFormDef } from '~/components/patient-data/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'
import { familyHistoryFormDef } from '~/components/patient-data/family-history/db/client-side/structure/family-history-of-a-patient-table.js'
import { medicalHistoryFormDef } from '~/components/patient-data/medical-history/db/client-side/structure/medical-history-of-a-patient-table.js'
import { medicationOrderFormDef } from '~/components/patient-data/medication-order/db/client-side/structure/medication-order-of-a-patient-table.js'
import { heightFormDef } from '~/components/patient-data/height/db/client-side/structure/height-of-a-patient-table.js'
import { examinationFormDef } from '~/components/patient-data/examination/db/client-side/structure/examination-of-a-patient-table.js'
import { medicalReviewOfSystemFormDef } from '~/components/patient-data/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'
import { miscellaneousNotesFormDef } from '~/components/patient-data/miscellaneous-notes/db/client-side/structure/miscellaneous-notes-of-a-patient-table.js'
import { nameFormDef } from '~/components/patient-data/name/db/client-side/structure/name-of-a-patient-table.js'
import { pastPsychHistoryFormDef } from '~/components/patient-data/past-psych-history/db/client-side/structure/past-psych-history-of-a-patient-table.js'
import { planCommentsFormDef } from '~/components/patient-data/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'
import { processNotesFormDef } from '~/components/patient-data/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'
import { recommendationsFormDef } from '~/components/patient-data/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'
import { remindersFormDef } from '~/components/patient-data/reminders/db/client-side/structure/reminders-of-a-patient-table.js'
import { goalsFormDef } from '~/components/patient-data/goals/db/client-side/structure/goals-of-a-patient-table.js'
import { screensFormDef } from '~/components/patient-data/screens/db/client-side/structure/screens-of-a-patient-table.js'
import { serviceStatementsFormDef } from '~/components/patient-data/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'
import { psychReviewOfSystemFormDef } from '~/components/patient-data/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'
import { phq9FormDef } from '~/components/patient-data/phq9/db/client-side/structure/phq9-of-a-patient-table.js'
import { weightFormDef } from '~/components/patient-data/weight/db/client-side/structure/weight-of-a-patient-table.js'
import { pulseFormDef } from '~/components/patient-data/pulse/db/client-side/structure/pulse-of-a-patient-table.js'
import { temperatureFormDef } from '~/components/patient-data/temperature/db/client-side/structure/temperature-of-a-patient-table.js'
import { bloodPressureFormDef } from '~/components/patient-data/blood-pressure/db/client-side/structure/blood-pressure-of-a-patient-table.js'
import { bloodSugarFormDef } from '~/components/patient-data/blood-sugar/db/client-side/structure/blood-sugar-of-a-patient-table.js'
import { waistCircumferenceFormDef } from '~/components/patient-data/waist-circumference/db/client-side/structure/waist-circumference-of-a-patient-table.js'
import { bmiFormDef } from '~/components/patient-data/bmi/db/client-side/structure/bmi-of-a-patient-table.js'
import { oxygenSaturationFormDef } from '~/components/patient-data/oxygen-saturation/db/client-side/structure/oxygen-saturation-of-a-patient-table.js'

const allFormDefs = {
  allergies: allergiesFormDef,
  chief_complaint: chiefComplaintFormDef,
  diagnosis: diagnosisFormDef,
  family_history: familyHistoryFormDef,
  medical_history: medicalHistoryFormDef,
  medication_order: medicationOrderFormDef,
  height: heightFormDef,
  medical_review_of_system: medicalReviewOfSystemFormDef,
  examination: examinationFormDef,
  miscellaneous_notes: miscellaneousNotesFormDef,
  name: nameFormDef,
  past_psych_history: pastPsychHistoryFormDef,
  plan_comments: planCommentsFormDef,
  process_notes: processNotesFormDef,
  recommendations: recommendationsFormDef,
  reminders: remindersFormDef,
  service_statements: serviceStatementsFormDef,
  psych_review_of_system: psychReviewOfSystemFormDef,
  goals: goalsFormDef,
  screens: screensFormDef,
  phq9: phq9FormDef,
  weight: weightFormDef,
  pulse: pulseFormDef,
  temperature: temperatureFormDef,
  blood_pressure: bloodPressureFormDef,
  blood_sugar: bloodSugarFormDef,
  waist_circumference: waistCircumferenceFormDef,
  bmi: bmiFormDef,
  oxygen_saturation: oxygenSaturationFormDef,
}

export default allFormDefs
