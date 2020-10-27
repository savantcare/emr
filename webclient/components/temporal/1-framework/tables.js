import allergiesClientTbl from '@/components/temporal/allergies/db/client-side/structure/allergies-of-a-patient-table.js'
import chiefComplaintClientTbl from '@/components/temporal/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'
import diagnosisClientTbl from '@/components/temporal/diagnosis/db/client-side/structure/diagnosis-of-a-patient-table.js'
import familyHistoryClientTbl from '@/components/temporal/family-history/db/client-side/structure/family-history-of-a-patient-table.js'
import miscNotesClientTbl from '@/components/temporal/miscellaneous-notes/db/client-side/structure/misc-notes-of-a-patient-table.js'
import planCommentsClientTbl from '@/components/temporal/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'
import processNotesClientTbl from '@/components/temporal/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'
import recommendationClientTbl from '@/components/temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'
import reminderClientTbl from '@/components/temporal/reminders/db/client-side/structure/reminders-of-a-patient-table.js'
import serviceStatementClientTbl from '@/components/temporal/service-statements/db/client-side/structure/service-statements-of-a-patient-table.js'

const clientTbl = {
  allergies: allergiesClientTbl,
  chief_complaint: chiefComplaintClientTbl,
  diagnosis: diagnosisClientTbl,
  family_history: familyHistoryClientTbl,
  miscellaneous_notes: miscNotesClientTbl,
  plan_comments: planCommentsClientTbl,
  process_notes: processNotesClientTbl,
  recommendations: recommendationClientTbl,
  reminders: reminderClientTbl,
  service_statements: serviceStatementClientTbl,
}

export default clientTbl
