import { allergiesFormDef } from '@/components/temporal/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import { chiefComplaintFormDef } from '@/components/temporal/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'
import { diagnosisFormDef } from '@/components/temporal/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'
import { familyHistoryFormDef } from '@/components/temporal/family-history/db/client-side/structure/family-history-of-a-patient-table.js'
import { heightFormDef } from '@/components/temporal/height/db/client-side/structure/height-of-a-patient-table.js'
import { mentalStatusExamOfAFormDef } from '@/components/temporal/mental-status-exam/db/client-side/structure/mental-status-exam-of-a-patient-table.js'
import { medicalReviewOfSystemOfAFormDef } from '@/components/temporal/medical-review-of-system/db/client-side/structure/medical-review-of-system-of-a-patient-table.js'
import { miscNotesFormDef } from '~/components/temporal/miscellaneous-notes/db/client-side/structure/miscellaneous-notes-of-a-patient-table.js'
import { nameFormDef } from '~/components/temporal/name/db/client-side/structure/name-of-a-patient-table.js'
import { pastPsychHistoryFormDef } from '~/components/temporal/past-psych-history/db/client-side/structure/past-psych-history-of-a-patient-table.js'
import { planCommentsFormDef } from '@/components/temporal/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'
import { processNotesFormDef } from '@/components/temporal/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'
import { recommendationFormDef } from '@/components/temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'
import { reminderFormDef } from '@/components/temporal/reminders/db/client-side/structure/reminders-of-a-patient-table.js'
import { goalsFormDef } from '@/components/temporal/goals/db/client-side/structure/goals-of-a-patient-table.js'
import { screensFormDef } from '@/components/temporal/screens/db/client-side/structure/screens-of-a-patient-table.js'
import { serviceStatementsOfAFormDef } from '@/components/temporal/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'
import { psychReviewOfSystemOfAFormDef } from '@/components/temporal/psych-review-of-system/db/client-side/structure/psych-review-of-system-of-a-patient-table.js'
import { phq9FormDef } from '@/components/temporal/phq9/db/client-side/structure/phq9-of-a-patient-table.js'
import { weightFormDef } from '@/components/temporal/weight/db/client-side/structure/weight-of-a-patient-table.js'
import { pulseFormDef } from '@/components/temporal/pulse/db/client-side/structure/pulse-of-a-patient-table.js'
import { temperatureFormDef } from '@/components/temporal/temperature/db/client-side/structure/temperature-of-a-patient-table.js'
import { bloodPressureFormDef } from '@/components/temporal/blood-pressure/db/client-side/structure/blood-pressure-of-a-patient-table.js'
import { bloodSugarFormDef } from '@/components/temporal/blood-sugar/db/client-side/structure/blood-sugar-of-a-patient-table.js'
import { waistCircumferenceFormDef } from '@/components/temporal/waist-circumference/db/client-side/structure/waist-circumference-of-a-patient-table.js'
import { bmiFormDef } from '@/components/temporal/bmi/db/client-side/structure/bmi-of-a-patient-table.js'
import { oxygenSaturationFormDef } from '@/components/temporal/oxygen-saturation/db/client-side/structure/oxygen-saturation-of-a-patient-table.js'

const allFormDefinations = {
  allergies: allergiesFormDef,
  chief_complaint: chiefComplaintFormDef,
  diagnosis: diagnosisFormDef,
  family_history: familyHistoryFormDef,
  height: heightFormDef,
  medical_review_of_system: medicalReviewOfSystemOfAFormDef,
  mental_status_exam: mentalStatusExamOfAFormDef,
  miscellaneous_notes: miscNotesFormDef,
  name: nameFormDef,
  past_psych_history: pastPsychHistoryFormDef,
  plan_comments: planCommentsFormDef,
  process_notes: processNotesFormDef,
  recommendations: recommendationFormDef,
  reminders: reminderFormDef,
  service_statements: serviceStatementsOfAFormDef,
  psych_review_of_system: psychReviewOfSystemOfAFormDef,
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

export default allFormDefinations
