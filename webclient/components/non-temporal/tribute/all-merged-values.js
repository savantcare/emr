/* this merges 
1. common-terms-collection.js
2. diagnosis-master-collection.js
3. medication-master-collection.js
4. patient-data-dynamic-collection-terms-start-with-equal-to
*/

import commonDataValues from './common-terms-values.js'
import diagnosisMasterValues from './diagnosis-master-values.js'
import medicationsMasterValues from './medications-master-values.js'
import patientDataPoints from './patient-data-dynamic-collection-terms-start-with-equal-to.js'
import providersMasterValues from './providers-master-values.js'

const allMergedValues = commonDataValues
  .concat(diagnosisMasterValues)
  .concat(medicationsMasterValues)
  .concat(patientDataPoints)
  .concat(providersMasterValues)

export default allMergedValues
