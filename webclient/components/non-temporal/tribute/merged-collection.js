/* this merges 
1. common-terms-collection.js
2. diagnosis-master-collection.js
3. medication-master-collection.js
4. patient-data-dynamic-collection-terms-start-with-equal-to
*/

import commonDataPoints from './common-terms-collection.js'
import diagnosisMasterDataPoints from './diagnosis-master-collection.js'
import medicationsMasterDataPoints from './medications-master-collection.js'
import patientDataPoints from './patient-data-dynamic-collection-terms-start-with-equal-to.js'

const mergedDataPoints = commonDataPoints
  .concat(diagnosisMasterDataPoints)
  .concat(medicationsMasterDataPoints)
  .concat(patientDataPoints)

export default mergedDataPoints
