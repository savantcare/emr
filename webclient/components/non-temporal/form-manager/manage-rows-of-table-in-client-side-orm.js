import { Model } from '@vuex-orm/core'
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'
import tableStructureForStoreMessageFromOtherComponent from '~/components/non-temporal/feed/db/client-side/structure/store-messages-from-other-components.js'

// Start from new

export const rowState = {
  // Primary
  SameAsDB: 1,
  New: 2,
  Copy: 3,
  Changed: 4,
  RequestedSave: 5,
  FormValidationFail: 6,
  FormValidationPass: 7,
  ApiError: 8,

  // Combined
  New_Changed: 24,
  New_Changed_FormValidationFail: 246,

  New_Changed_FormValidationPass: 247,
  New_Changed_FormValidationPass_RequestedSave: 2475,
  New_Changed_FormValidationPass_RequestedSave_ApiError: 24758,
  New_Changed_FormValidationPass_RequestedSave_SameAsDB: 24751,

  New_Changed_RequestedSave_FormValidationFail: 2456,
  New_Changed_RequestedSave_FormValidationPass: 2457,
  New_Changed_RequestedSave_FormValidationPass_SameAsDB: 24571,
  New_Changed_RequestedSave_FormValidationPass_ApiError: 24578,

  SameAsDB_Copy: 13,

  SameAsDB_Copy_Changed: 134,

  SameAsDB_Copy_Changed_FormValidationPass: 1347,
  SameAsDB_Copy_Changed_FormValidationPass_RequestedSave: 13475,

  SameAsDB_Copy_Changed_RequestedSave: 1345,
  SameAsDB_Copy_Changed_RequestedSave_FormValidationFail: 13456,
  SameAsDB_Copy_Changed_RequestedSave_FormValidationPass_SameAsDB: 134571,
  SameAsDB_Copy_Changed_RequestedSave_ApiError: 13458,
}

// Others

const Future_MilliSecs_In_MariaDB_To_Mark_Row_As_Not_Deleted = 2147483648000

class clientTblManage extends Model {
  // For Class syntax https://javascript.info/class
  static entity = 'clientTblManage'

  /*
Question 1
----------
I have:

class clientTblManage extends Model {
  static arOrmRowsCached = []
(https://github.com/savantcare/emr/blob/master/webclient/cts/def-processors/crud/row-manage.js#L5)

export default class ptHeight extends clientTblManage {
(https://github.com/savantcare/emr/blob/master/webclient/cts/temporal/vital-signs/sub-cts/height/db/table.js#L9)

export default class ptWeight extends clientTblManage {
(https://github.com/savantcare/emr/blob/master/webclient/cts/temporal/vital-signs/sub-cts/height/db/table.js#L9)

I expected ptHeight and ptWeight to have their own copies of arOrmRowsCached
but ptHeight and ptWeight are sharing arOrmRowsCached

Answer (In slack channel core_team on 5th aug 2020)
------
A static class property becomes part of the constructor, therefore applies to anything that inherits it. If it’s to be unique for each model, it should be a prototype property.
The active record approach means Vuex ORM caches the model, therefore it inherits the ctor properties

Question 2 (In slack channel core_team on 5th aug 2020)
----------
How would I define a prototype property
Answer
------
Remove the static keyword.

Question 3 (In slack channel core_team on 5th aug 2020)
----------
I removed the static keyword. Now arOrmRowsCached is not available to ptHeight
Answer
------
I suspect the issue you’ll now face is arOrmRowsCached will be empty each time an instance is created. So you may need to rethink the logic if caching based on class. For example, arOrmRowsCached can be an object who’s properties map to an entity belonging to a model, who’s values will be an array. Does that make sense?
Otherwise, to make sure each class has it’s own arOrmRowsCached , you will need to explicitly declare the property on all classes.


Decision: We will make arOrmRowsCached as a 3D array. Where the 1st D will be entity name
*/

  static arOrmRowsCached = []
  static vOrmSaveScheduled = ''
  static arOrmRowIdSendingToServerQueue = []

  /*
  constructor() {
    super()
    this.arOrmRowsCached = []       // If I do this each row of the clientTbl model will have arOrmRowsCached = []
  }
  */

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      // the following flds only exist on client
      vnRowStateInSession: this.number(1), // For different values of vnRowStateInSession and what they mean see: ./forms.md
      isValidationError: this.boolean(false),
    }
  }

  static fnGetNewRows() {
    const arFromClientTbl = this.query().where('vnRowStateInSession', rowState.New).get()
    return arFromClientTbl
  }

  static fnGetNewRowsInEditState() {
    const arFromClientTbl = this.query()
      .where('vnRowStateInSession', rowState.New)
      .orWhere('vnRowStateInSession', rowState.New_Changed)
      .orWhere('vnRowStateInSession', rowState.New_Changed_FormValidationFail)
      .orWhere('vnRowStateInSession', rowState.New_Changed_FormValidationPass)
      .get()
    return arFromClientTbl
  }

  static fnGetNewRowsInApiErrorState() {
    // New(2) -> Changed(4) -> Requested save(5) -> Sent to server(7) -> Failure(8)
    const arFromClientTbl = this.query()
      .where('vnRowStateInSession', rowState.New_Changed_RequestedSave_FormValidationPass_ApiError)
      .get()
    return arFromClientTbl
  }

  static fnGetNewRowsInFormValidationPassState() {
    // Following query makes sure I get all the newly added row having fld value
    const arFromClientTbl = this.query().where('vnRowStateInSession', rowState.New_Changed_FormValidationPass).get()
    return arFromClientTbl
  }

  static fnGetNewRowsInApiSendingState() {
    const arFromClientTbl = this.query()
      .where('vnRowStateInSession', rowState.New_Changed_RequestedSave_FormValidationPass)
      .get()
    return arFromClientTbl
  }

  static fnGetNewRowsInApiSuccessState() {
    const arFromClientTbl = this.query()
      .where('vnRowStateInSession', rowState.New_Changed_RequestedSave_FormValidationPass_SameAsDB)
      .get()
    return arFromClientTbl
  }

  static fnGetAllRowsPossibleToEdit() {
    /*
        Need
        1) Present ROW_END has to be future. Since past rows cannot be edited
        2) Start with 1 (already saved to  DB)
        3) Unique UUID. Since each row is copied before editing. If I dont take unique UUID then I will edit the present row in DB and the new copied row being changed.
    */
    const arFromClientTbl = this.query()
      .where('ROW_END', Future_MilliSecs_In_MariaDB_To_Mark_Row_As_Not_Deleted)
      .where('vnRowStateInSession', (value) => value.toString().startsWith('1'))
      .get()

    // Goal: From the set of valid data, find unique UUIDs since it is possible that some UUID is being changed and in that scenario there are 2 records with same UUID
    const uniqueUuidRows = []
    let foundInArToReturn = false
    for (let i = 0; i < arFromClientTbl.length; i++) {
      for (let j = 0; j < uniqueUuidRows.length; j++) {
        if (arFromClientTbl[i].serverSideRowUuid === uniqueUuidRows[j].serverSideRowUuid) {
          /* Suppose a row is being changed. Now 2 rows have the same serverSideRowUuid. The old row and the new changed row.
          In the array that is returned from this Fn I am returning the array with the new data.
          Hence in the following line I over write the old row
          */
          uniqueUuidRows[j] = arFromClientTbl[i]
          foundInArToReturn = true
        }
      }
      if (foundInArToReturn) {
      } else {
        uniqueUuidRows.push(arFromClientTbl[i])
      }
    }

    return uniqueUuidRows
  }

  static fnGetAllChangeRowsInEditState() {
    const arFromClientTbl = this.query()
      .where('vnRowStateInSession', rowState.SameAsDB_Copy)
      .orWhere('vnRowStateInSession', rowState.SameAsDB_Copy_Changed)
      .orWhere('vnRowStateInSession', rowState.SameAsDB_Copy_Changed_RequestedSave_FormValidationFail)
      .orWhere('vnRowStateInSession', rowState.SameAsDB_Copy_Changed_RequestedSave_ApiError)
      .get()
    return arFromClientTbl
  }

  static fnGetChangeRowIdInEditState(pUuid) {
    /*
      Q) Why did we remove orWhere clause?
        Multiple 'where' with 'orWhere' clause not returning correct data. The 'orWhere' clause skips the first where clause like:
        where (serverSideRowUuid=4545d6 AND vnRowStateInSession=3)
        OR vnRowStateInSession=34
        OR vnRowStateInSession=3456

        But we want the following query:
        where serverSideRowUuid=4545d6 AND
        (vnRowStateInSession=3 OR vnRowStateInSession=34 OR vnRowStateInSession=3456)
    */
    const arFromClientTbl = this.query()
      .where('serverSideRowUuid', pUuid)
      .where((record) => {
        return (
          record.vnRowStateInSession === rowState.SameAsDB_Copy ||
          record.vnRowStateInSession === rowState.SameAsDB_Copy_Changed ||
          record.vnRowStateInSession === rowState.SameAsDB_Copy_Changed_FormValidationPass
        )
      })
      .get()

    if (arFromClientTbl.length) {
      const idx = arFromClientTbl.length - 1
      return arFromClientTbl[idx].clientSideUniqRowId
    } else {
      return false
    }
  }

  static isThereSavedPresentDataInTable() {
    const arFromClientTbl = this.query()
      .where('ROW_END', Future_MilliSecs_In_MariaDB_To_Mark_Row_As_Not_Deleted)
      //.where('vnRowStateInSession', (value) => value.toString().startsWith('1'))
      .where('vnRowStateInSession', (value) => value === 1)
      .get()

    if (arFromClientTbl.length > 0) return arFromClientTbl
    return false
  }

  static fnGetNotEmptyRows(pFldForNonEmptyCheck) {
    // Following query makes sure I get valid data and not discontimued data fromm temporal table. Ref: https://mariadb.com/kb/en/temporal-data-tables/
    const arFromClientTbl = this.query()
      .where('ROW_END', Future_MilliSecs_In_MariaDB_To_Mark_Row_As_Not_Deleted)
      .where(pFldForNonEmptyCheck, (value) => value.length > 0)
      .get()
    return arFromClientTbl
  }

  static fnGetNonEmptyRowsToChange(pFldForNonEmptyCheck) {
    // Step 1/2: Get valid data and not deleted data from temporal table. Ref: https://mariadb.com/kb/en/temporal-data-tables/
    const arFromClientTbl = this.query()
      .where('ROW_END', Future_MilliSecs_In_MariaDB_To_Mark_Row_As_Not_Deleted)
      .where(pFldForNonEmptyCheck, (value) => value.length > 0)
      .get()

    // DataSet -> It is possible that some UUID is being changed and now there are 2 records with same UUID

    // Step 2/3: Discard all entries from this dataset where it does not end in 1. Ending in 1 implies that the data has been saved to DB
    for (let i = 0; i < arFromClientTbl.length; i++) {
      if (arFromClientTbl[i].vnRowStateInSession % 10 === 1) {
      } else {
        arFromClientTbl.splice(i, 1)
      }
    }

    /* At this step: It is not possible for dataset to have 2 rows with the same UUID. Since:
    Since everytime a row is updated the previous row is marked as deleted
    So deleted rows will not cross step 1 query */
    return arFromClientTbl
  }

  static fnGetRowsToChange() {
    // Step 1/2: Get valid data and not deleted data from temporal table. Ref: https://mariadb.com/kb/en/temporal-data-tables/
    const arFromClientTbl = this.query().where('ROW_END', Future_MilliSecs_In_MariaDB_To_Mark_Row_As_Not_Deleted).get()

    // DataSet -> It is possible that some UUID is being changed and now there are 2 records with same UUID

    // Step 2/3: Discard all entries from this dataset where it does not end in 1. Ending in 1 implies that the data has been saved to DB
    for (let i = 0; i < arFromClientTbl.length; i++) {
      if (arFromClientTbl[i].vnRowStateInSession % 10 === 1) {
      } else {
        arFromClientTbl.splice(i, 1)
      }
    }

    /* At this step: It is not possible for dataset to have 2 rows with the same UUID. Since:
    Since everytime a row is updated the previous row is marked as deleted
    So deleted rows will not cross step 1 query */
    return arFromClientTbl
  }

  /*  1. This function finds data in client side vuex-orm. This fn is not making a API query to the server.
      2. If there are 10 rows with same UUID then it will return the latest row
      3. The term "valid" is same as used in mariadb https://mariadb.com/kb/en/temporal-data-tables/
          this means that the row has not been deleted.

      This Fn is important when:
      1. A row is created
      2. The same row is changed
      Now in the view layer only 2 should appear. And there is an option to undo the changes in 2 to get back to 1
  */
  static fnGetPresentUniqueUuidNotEmptyRows(pFldsForNonEmptyCheck) {
    // Following query makes sure I get valid data and not discontimued data fromm temporal table. Ref: https://mariadb.com/kb/en/temporal-data-tables/

    if (!pFldsForNonEmptyCheck) return

    const arFromClientTbl = this.query().where('ROW_END', Future_MilliSecs_In_MariaDB_To_Mark_Row_As_Not_Deleted).get()

    if (arFromClientTbl.length < 1) {
      // no records came back. Returning empty array instead of null since others may do a length check
      return arFromClientTbl
    }

    // for all the rows in the array delete the rows which do not pass the empty check
    for (let i = 0; i < arFromClientTbl.length; i++) {
      const row = arFromClientTbl[i]
      let atLeastOneFieldIsNotEmpty = false
      // looping through the array of fields. Out of this atleast one field needs to be non empty
      for (let j = 0; j < pFldsForNonEmptyCheck.length; j++) {
        let fieldName = pFldsForNonEmptyCheck[j]
        let fieldValue = row[fieldName]
        // fieldValue can be string (in case of recs) or integer (in case of psych review of systems)
        if (fieldValue && fieldValue.toString().length > 0) {
          atLeastOneFieldIsNotEmpty = true
        }
      }
      if (atLeastOneFieldIsNotEmpty === false) {
        arFromClientTbl.splice(i, 1)
      }
    }

    // Goal: From the set of valid data, find unique UUIDs since it is possible that some UUID is being changed and in that scenario there are 2 records with same UUID
    const uniqueUuidRows = []
    let foundInArToReturn = false
    for (let i = 0; i < arFromClientTbl.length; i++) {
      for (let j = 0; j < uniqueUuidRows.length; j++) {
        if (arFromClientTbl[i].serverSideRowUuid === uniqueUuidRows[j].serverSideRowUuid) {
          /* Suppose a row is being changed. Now 2 rows have the same serverSideRowUuid. The old row and the new changed row.
          In the array that is returned from this Fn I am returning the array with the new data.
          Hence in the following line I over write the old row
          */
          uniqueUuidRows[j] = arFromClientTbl[i]
          foundInArToReturn = true
        }
      }
      if (foundInArToReturn) {
      } else {
        uniqueUuidRows.push(arFromClientTbl[i])
      }
    }

    return uniqueUuidRows
  }

  static fnGetPresentUniqueUuidRows() {
    // Following query makes sure I get valid data and not discontimued data fromm temporal table. Ref: https://mariadb.com/kb/en/temporal-data-tables/
    const arFromClientTbl = this.query().where('ROW_END', Future_MilliSecs_In_MariaDB_To_Mark_Row_As_Not_Deleted).get()
    const uniqueUuidRows = []

    // Goal: From the set of valid data, find unique UUIDs since it is possible that some UUID is being changed and now there are 2 records with same UUID
    for (let i = 0; i < arFromClientTbl.length; i++) {
      let foundInArToReturn = false
      for (let j = 0; j < uniqueUuidRows.length; j++) {
        if (arFromClientTbl[i].serverSideRowUuid === uniqueUuidRows[j].serverSideRowUuid) {
          /* Suppose a row is being changed. Now 2 rows have the same serverSideRowUuid. The old row and the new changed row.
          In the array that is returned from this Fn I am returning the array with the new data.
          Hence in the following line I over write the old row
          */
          if (arFromClientTbl[i].clientSideUniqRowId > uniqueUuidRows[j].clientSideUniqRowId) {
            uniqueUuidRows[j] = arFromClientTbl[i]
          } else {
            // The existing data is newer hence not replacing
          }
          foundInArToReturn = true
        }
      }
      if (foundInArToReturn) {
        // Already found in array to be returned hence no need to add to arary
      } else {
        uniqueUuidRows.push(arFromClientTbl[i])
      }
    }

    // console.log(uniqueUuidRows)
    return uniqueUuidRows
  }

  static fnGetDeletedRows() {
    /*

    Method 1: Get deleted rows from clientTbl using query like: select max(id) where ROW_END < current_time group by 'serverSideRowUuid'
    Problem:- But I am unable to find vuex-orm groupBy query

    Method 2: Get all the rows having ROW_END is less then current_time. Then after, using forEach loop remove the record that have been changed and not deleted.
    Problem:- But it is not standard method.
    Decided to use this.

    Method 3: When i click on 'X' button, send a api request to the server and get all the deleted rows.
    Problem: It is not satisfying our P20 architecture.

    Method 4: Maintain a 'isDeleted' enum(0 ,1) flag in database. But need to approval from Vikas sir.
    Need to discuss
    */
    // Following query makes sure I get all the discontimued rows
    const currentTime = Math.floor(Date.now())
    const arFromORM = this.query()
      .where('ROW_END', (value) => value < currentTime)
      .orderBy('ROW_END', 'desc')
      .get()

    const arDeletedRows = []
    const arDeletedRowUniqueUuid = []
    const currentUniqueUuidRows = this.fnGetPresentUniqueUuidRows()

    arFromORM.forEach((item) => {
      let foundInArToReturn = false
      currentUniqueUuidRows.forEach((currentItem) => {
        if (item.serverSideRowUuid === currentItem.serverSideRowUuid) {
          foundInArToReturn = true
        }
      })
      if (!foundInArToReturn && !arDeletedRowUniqueUuid.includes(item.serverSideRowUuid)) {
        arDeletedRowUniqueUuid.push(item.serverSideRowUuid)
        arDeletedRows.push(item)
      }
    })
    return arDeletedRows
  }

  static fnGetFldValue(pClientRowId, pFldName) {
    // first time it will have to find in model. This is needed to show the initial content in the fld.
    if (
      typeof this.arOrmRowsCached[this.entity] === 'undefined' ||
      typeof this.arOrmRowsCached[this.entity][pClientRowId] === 'undefined'
    ) {
      // finding in vuex-orm model
      const arFromClientTbl = this.find(pClientRowId)
      if (arFromClientTbl) {
        if (typeof this.arOrmRowsCached[this.entity] === 'undefined') {
          this.arOrmRowsCached[this.entity] = []
        }
        this.arOrmRowsCached[this.entity][pClientRowId] = arFromClientTbl
        return arFromClientTbl[pFldName]
      }
    } else {
      // if caching is removed then typing will update every 1 second when the vuex store gets updated.
      // returning from cache
      const value = this.arOrmRowsCached[this.entity][pClientRowId][pFldName]
      return value
    }
  }

  /*
    Suppose the row of Name has had 3 changes and 1 change is in edit state.
    The inferences we can draw are:
    1. The Orm Ids are 1,2,3,4
    2. Id 1,2 are deleted
    3. Id 3,4 are valid (Valid implies that RPW_END time is > then the current time)
    4. Id 3 is Orm Id Of Row To Change
    5. Id 4 is Orm Id Of CopiedRowBeingChanged

    This function will return 3.

    For multiple row Cts this for each row will return the highest ID that has been saved to DB

  */

  static fnIsThereDuplicateUuid(pUuid) {
    const num = this.query().where('serverSideRowUuid', pUuid).count()
    if (num > 1) {
      return true
    } else {
      return false
    }
  }

  static fnIsDataFldsOfRowsSame(pRow1Id, pRow2Id) {
    const objRow1 = this.find(pRow1Id)
    const objRow2 = this.find(pRow2Id)

    // delete flds that are not data flds. Since only data flds need to be compared.
    delete objRow1.clientSideUniqRowId
    delete objRow2.clientSideUniqRowId

    delete objRow1.ROW_START
    delete objRow2.ROW_START

    delete objRow1.$id
    delete objRow2.$id

    delete objRow1.vnRowStateInSession
    delete objRow1.vnRowStateInSession

    const ObjFldsThatAreDiff = {}

    // Code for comparing 2 objects comes from https://stackoverflow.com/a/5859028
    for (const p in objRow1) {
      if (objRow1[p] !== objRow2[p]) {
        ObjFldsThatAreDiff[p] = objRow2[p]
      }
    }

    if (Object.keys(ObjFldsThatAreDiff).length > 0) return ObjFldsThatAreDiff

    return true // implies that data flds of row are same
  }

  static fnSetValueOfFld(pEvent, pClientRowId, pFldName, pRowStatus) {
    // Step 1/2: Putting the value in cache so that getFldValue can get the data from cache and user can get fast feedback to typing
    this.fnPutFldValueInCache(pEvent, pClientRowId, pFldName)
    // Step 2/2
    this.fnCreateTimeoutToSaveToState(pEvent, pClientRowId, pFldName, pRowStatus)
  }

  /*
    Why?
    Put the value of what the user is typing in cache?
       so that the user can see form fld has the charecters that he has typed.

    How?
    Step 1: This is called in the form on each key press (@input is invoked on each key press)
            Ref: The chain is started at add.vue
            The sequence is: add.vue-> mfSetFldUsingCache
                              => mfSetFldUsingCache -> ormRem.setfld
                                => ormRem.setfld -> this.fnPutFldValueInCache

    Step 2: The work done by this function is used on each key press at:
                            add.vue:15:value="mfGetFld"
                              => add.vue:113:ormRem.getfld
                                => rowStatus.js:97

    Problem?
      When the cache array is update we want vue to react to the change and update add.vue:15:value="mfGetFld"

      forceUpdates are not good quality code. With 2 dimensional array if we do not follow right approach then force update will be needed
  */
  static fnPutFldValueInCache(pEvent, pClientRowId, pFldName) {
    // Method 1: of updating cache array. Checked by VK and RJ in July 2020 the force update is needed inside add.vue:115:setfldInEditLayerientSideTableOnTimeOut

    /*
      Q) Why we are using three dimensional array of arOrmRowsCached?
        A) Ref: row-manage.js:Line-8 to 46
    */
    if (typeof this.arOrmRowsCached[this.entity] === 'undefined') {
      this.arOrmRowsCached[this.entity] = [] // setting this to a blank row since later I do splice. For splice that row needs to exist.
    }
    if (typeof this.arOrmRowsCached[this.entity][pClientRowId] === 'undefined') {
      this.arOrmRowsCached[this.entity][pClientRowId] = [] // setting this to a blank row since later I do splice. For splice that row needs to exist.
    }
    this.arOrmRowsCached[this.entity][pClientRowId][pFldName] = pEvent

    /*
    // Method 2: https://vuejs.org/2016/02/06/common-gotchas/#Why-isn%E2%80%99t-the-DOM-updating
    // of updating cache array Ref: https://stackoverflow.com/questions/45644781/update-value-in-multidimensional-array-in-vue
    let newRow = []
    if (typeof this.arOrmRowsCached[pClientRowId] === 'undefined') {
      this.arOrmRowsCached[pClientRowId] = [] // setting this to a blank row since later I do splice. For splice that row needs to exist.
      console.log('Creating a new blank row')
    } else {
      newRow = this.arOrmRowsCached.slice(pClientRowId, pClientRowId + 1) // Existing row may have 5 flds so I need to pull it out before updating 1 fld
      console.log('Existing row pulled out is', newRow)
    }
    newRow[pFldName] = pEvent // Upadted the fld value in the new row
    this.arOrmRowsCached.splice(pClientRowId, 1, newRow) // Put the single row back inside the array of a lot of rows.
    // Problem: A tree structure of elements is getting made and can be verified by doing console.log
    console.log(this.arOrmRowsCached)
*/

    /*
      Method 3 of updating cache:
      this.arOrmRowsCached[pClientRowId] = newRow // vue does not react. Now add.vue:115:setfldInEditLayerientSideTableOnTimeOut needs this.$forceUpdate
      */
    /*
      Method 4 of updating cache:
      This will not work since $set is not available outside vue conetxt this is not vue context
      this.$set(this.arOrmRowsCached, pClientRowId, newRow)
      */

    /* Method 5: Delete old rows and create new row Checked by RJ and VK on 15th July
    if (typeof this.arOrmRowsCached[pClientRowId] === 'undefined') {
      this.arOrmRowsCached[pClientRowId] = [] // setting this to a blank row since later I do splice. For splice that row needs to exist.
    }
    this.arOrmRowsCached[pClientRowId][pFldName] = pEvent

    const copyOfOldRow = this.arOrmRowsCached
    // this.arOrmRowsCached = []
    this.arOrmRowsCached.length = 0
    console.log(this.arOrmRowsCached)
    this.arOrmRowsCached = copyOfOldRow
    */
  }

  static fnCreateTimeoutToSaveToState(pEvent, pClientRowId, pFldName, pRowStatus) {
    // Goal: debouncing. If A and B are pressed quickly. Timeout for "A" keypress will get cancelled and timeout for "B" keypress will get scheduled.
    if (this.vOrmSaveScheduled) {
      clearTimeout(this.vOrmSaveScheduled)
    }
    /* Ref: https://stackoverflow.com/questions/38399050/vue-equivalent-of-settimeout */

    if (pFldName.includes('select')) {
      // if it is a select type field no need for waiting since a user cannot click on and off as fast as typing
      this.fnSetFldInVuex(pEvent, pClientRowId, pFldName, pRowStatus)
    } else {
      this.vOrmSaveScheduled = setTimeout(
        function (scope) {
          scope.fnSetFldInVuex(pEvent, pClientRowId, pFldName, pRowStatus)
        },
        50,
        this
      )
    }
  }

  static fnSetFldInVuex(pEvent, pClientRowId, pFldName, pRowStatus) {
    let row = {}

    /* check if fldName has the word "select" or "multiselect" since in those cases:
        1. Take current pFldName value out of the row
        2. If the incoming value:
            Exists inside pFldName then remove it and update the value of pFldName
            Does not exist inside pFldName then add it to the previous value of pFldName and then update the value of pFldName
    */
    if (pFldName.includes('select')) {
      // get the current value
      const currentValue = this.find(pClientRowId)
      let valueForThisField = null

      if (currentValue[pFldName] && currentValue[pFldName].includes(pEvent)) {
        valueForThisField = currentValue[pFldName]
        valueForThisField = valueForThisField.replace(pEvent, '') // Scenario 1/2: Removed. User has clicked on the same button again hence removing it.
      } else {
        valueForThisField = currentValue[pFldName] ? currentValue[pFldName] + pEvent : pEvent // Scenario 2/2: User clicked on this for first time hence added
      }

      // When I did valueForThisField = valueForThisField.replace(pEvent, '') I am not sure if that resulted in the field being empty or not. So here I am checking if the field is empty. And hence setting it to null
      if (valueForThisField.length < 1) {
        valueForThisField = null
      }

      // Goal: when user select option "None" remove old selected values from vuex-orm
      if (valueForThisField && valueForThisField.includes('#None#')) {
        valueForThisField = '#None#'
      }

      row = {
        [pFldName]: valueForThisField,
        vnRowStateInSession: pRowStatus,
        isValidationError: false,
      }
      // end SELECT field processing
    } else {
      row = {
        [pFldName]: pEvent,
        vnRowStateInSession: pRowStatus,
        isValidationError: false,
      }
    }

    const arFromClientTbl = this.update({
      where: pClientRowId,
      data: row,
    })
    if (!arFromClientTbl) {
      console.log('FATAL ERROR')
    }
  }

  static async fnCopyRowAndGetCopiedRowId(pOrmSourceRowId) {
    // the copied row will have the same serverSideRowUuid as the first row
    // In temporal table when row is updated first a copy is made but UUID remains same
    // Since primary key is internally set as UUID.row_start
    const arToCopy = this.find(pOrmSourceRowId)
    delete arToCopy.clientSideUniqRowId // removing the id fld from source so that vuexOrm will create a new primary key in destination
    arToCopy.ROW_START = Math.floor(Date.now()) // set ROW_START to now
    arToCopy.vnRowStateInSession = rowState.SameAsDB_Copy // // Since this row is copied set the correct rowState For meaning of diff values read ./forms.md
    const newRow = await this.insert({
      data: arToCopy,
    })
    /* Goal: Get id of the row that has been inserted into the ORM
    Option1:
    const idOfNewRow = newRow.ptName[0].clientSideUniqRowId
    Cannot use this since ptName is hardcoded. For different Ct this will be different.
    Hence need a dynamic way to get the value in place of ptName
    Code for getting the first key when I do not know the name of the first key comes from https://stackoverflow.com/questions/983267/how-to-access-the-first-property-of-a-javascript-object
    */
    const firstKey = newRow[Object.keys(newRow)[0]]
    const idOfNewRow = firstKey[0].clientSideUniqRowId
    return idOfNewRow
  }

  static fnDeleteNewRowsInEditState() {
    const arFromClientTbl = this.fnGetNewRowsInEditState()
    if (arFromClientTbl.length) {
      for (let i = 0; i < arFromClientTbl.length; i++) {
        this.delete(arFromClientTbl[i].clientSideUniqRowId)
      }
    }
  }

  static fnDeleteChangeRowsInEditState() {
    const arFromClientTbl = this.fnGetAllChangeRowsInEditState()
    if (arFromClientTbl.length) {
      for (let i = 0; i < arFromClientTbl.length; i++) {
        this.delete(arFromClientTbl[i].clientSideUniqRowId)
      }
    }
  }

  // This function will return 1 (Success) or 0 (Failure)
  static async sfSendNewChangedRowsToServer() {
    const arFromClientTbl = this.query().where('vnRowStateInSession', rowState.New_Changed_FormValidationPass).get()

    /*
      Q) Why we use promise in following code?
      A)
        In real time, user may add data and hit save button of add form and again tries to save data before the previous data gets saved in DB. The system got confused in such case.
        We are using asynchronous promises to deal with the case.
    */
    const promises = arFromClientTbl.map(async (row) => {
      try {
        /*
        Q) Why we put the api call code in if/else statement?
        A)
          We are dealing cases like:
            1. User adds data, hits save button twice or double click
            2. user adds data, hits save button and again tries to add another data and click save button before previous api call finished.
          Here is the problem and how we are resolving this:
            Save process starts with searching from clientTbl for the records having 'vnRowStateInSession' = 2457.
            Now, 'vnRowStateInSession' of clientTbl record gets updated only after api call finishes and in above mentioned cases, system initiates this save process again before 'vnRowStateInSession' update.
            That means the second time searching for 'vnRowStateInSession' = 2457 will point to the same record multiple times which should not be the actual case.
            To solve this, we are maintaining an array 'arOrmRowIdSendingToServerQueue' during the process, which contains clientTbl row id that are going to be saved.
            In if statement we are searching if clientTbl row id exist in that array. if yes then api sending process already happened for the row, hence not to do anything. if not found then in else statement we are initiating the api calling process after pushing clientTbl row id in 'arOrmRowIdSendingToServerQueue'.
      */

        if (typeof this.arOrmRowIdSendingToServerQueue[this.entity] === 'undefined') {
          this.arOrmRowIdSendingToServerQueue[this.entity] = []
        }
        if (this.arOrmRowIdSendingToServerQueue[this.entity].includes(row.clientSideUniqRowId)) {
          // console.log('Already sent to server')
        } else {
          this.arOrmRowIdSendingToServerQueue[this.entity].push(row.clientSideUniqRowId)
          const status = await this.sfMakeApiCAll(row)
          if (status === 0) {
            // Handle api returned failure
            this.update({
              where: (record) => record.clientSideUniqRowId === row.clientSideUniqRowId,
              data: {
                vnRowStateInSession: rowState.New_Changed_FormValidationPass_RequestedSave_ApiError,
              },
            })
          } else {
            // Handle api returned success
            this.update({
              where: (record) => record.clientSideUniqRowId === row.clientSideUniqRowId,
              data: {
                vnRowStateInSession: rowState.SameAsDB,
                /* The sequence at this point is ->  New_Changed_FormValidationPass_RequestedSave_SameAsDB.
                   SameAsDB is always considered a marker. So whenever SameAsDB is reached we forget the old state. If we keep remembering the old state then the whole state can be 100 steps long.
                   No need to set ROW_END: Math.floor(Date.now()), since that is set when row is deleted or updated. (For temporal update is like delete and insert)
                */
                ROW_START: Math.floor(Date.now()), // This overwites prev ROW_START. This is done so new rows ROW_START does not overlap the ROW that was just endeed in prev line of code.
              },
            })

            /* Remove clientTbl row id from 'arOrmRowIdSendingToServerQueue' after this promise finished. */
            const index = this.arOrmRowIdSendingToServerQueue[this.entity].indexOf(row.clientSideUniqRowId)
            if (index > -1) {
              this.arOrmRowIdSendingToServerQueue[this.entity].splice(index, 1)
            }

            /**
             * Insert into feed
             */
            tableStructureForStoreMessageFromOtherComponent.insert({
              data: {
                description: row.description,
                component: this.entity,
              },
            })
          }
        }
      } catch (err) {
        return err.message || 'Some error occured while get user info'
      }
    })

    await Promise.all(promises)
  }

  static async sfMakeApiCAll(pOrmRowArray) {
    const socketClientObj = await clientTblOfCommonForAllComponents
      .query()
      .where(
        'fieldName',
        'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change'
      )
      .first()

    const ptUuidFromOrm = await clientTblOfCommonForAllComponents.query().where('fieldName', 'ptUuid').first()

    // console.log(tableCommonForAllComponents)
    pOrmRowArray.ptUuid = ptUuidFromOrm.fieldValue
    pOrmRowArray.recordChangedByUuid = 'bua674fa-073b-4223-8c69-0540ee786kj8'
    pOrmRowArray[
      'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change'
    ] = socketClientObj.fieldValue

    if (process.env.makeFetchPostApiCalls === true) {
      try {
        const response = await fetch(this.apiUrl, {
          // @raj TODO Why not using User.api().post(url, data, config) from https://vuex-orm.github.io/plugin-axios/guide/usage.html#performing-requests
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // Authorization: 'Bearer ' + TOKEN,
          },
          body: JSON.stringify({
            data: pOrmRowArray,
          }),
        })
        if (!response.ok) {
          return 0 // Returns error code when api fails to update record in DB
        } else {
          return 1 // Returns success code when api successfully updates record in DB
        }
      } catch (ex) {
        return 0 // Returns error code when try block gets an exception and fails
      }
    } else {
      // This is the scenario when in the nuxt.config.js make apoi calls has been set to false. This is done when I want to run the s/w on client side without depending on the server.
      return 1
    }
  }

  static async sfSendDeleteDataToServer(pClientDataRowId, rowUuid, deletedNote) {
    try {
      if (process.env.makeFetchPostApiCalls === true) {
        const socketClientObj = await clientTblOfCommonForAllComponents
          .query()
          .where(
            'fieldName',
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change'
          )
          .first()

        const response = await fetch(`${this.apiUrl}/${rowUuid}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            // "Authorization": "Bearer " + TOKEN
          },
          body: JSON.stringify({
            dNotes: deletedNote,
            client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change:
              socketClientObj.fieldValue,
          }),
        })
        if (!response.ok) {
          return 0
        } else {
          this.update({
            where: (record) => record.serverSideRowUuid === rowUuid,
            data: {
              ROW_END: Math.floor(Date.now()),
            },
          })
          return 1
        }
      } else {
        this.update({
          where: (record) => record.serverSideRowUuid === rowUuid,
          data: {
            ROW_END: Math.floor(Date.now()),
          },
        })
        return 1
      }
    } catch (ex) {
      return 0
    }
  }
  /*
  static async mfSendNewRowsToServer() {

      Goal: If i submitted 4 records with a empty record at once. We need to run submit process on those records which is not empty.
      The computed function 'cfGetClientTblReadyToReviewedStateRows' returns all the newly added row which is not empty from allPatientDataTbls[this._formDef.id] ie; 'vnRowStateInSession' = 24

    const arFromClientTbl = this.fnGetNewRowsInFormValidationPassState() // calling cf instead of allPatientDataTbls[this._formDef.id] since get benefit of caching.
    if (arFromClientTbl.length) {
      for (let i = 0; i < arFromClientTbl.length; i++) {
         I cannot do validation here. Since this is getting invoked when button has already been pressed
          I need to tell the user a row is valid or not when he is editing that row / field.
          The theme colors are at: https://element.eleme.io/#/en-US/component/color
          data same as DB: Regular text
          Valid data in edit state: success color
          data in error state: warning color

        await this.update({
          where: (record) => record.clientSideUniqRowId === arFromClientTbl[i].clientSideUniqRowId,
          data: {
            vnRowStateInSession: rowState.New_Changed_RequestedSave_FormValidationPass,
            isValidationError: false,
          },
        })
      }
    }
    await this.sfSendNewChangedRowsToServer()
  }
*/
  static async fnSendMultiDeleteDataToServer(dataRow) {
    let success = 0
    let failed = 0
    /*
      Q: Why we use .map instead of forEach loop?
      -- We want to be able to loop over an array/list (dataRow) in sequential order. Furthermore, each iteration using async/await. forEach is unable to deal with this kind of scenario but .map function is suitable in this case.
      Hence we are using .map instead of forEach loop.
      Ref: https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
    */
    const promises = dataRow.map(async (row) => {
      try {
        const status = await this.sfSendDeleteDataToServer(row.clientSideUniqRowId, row.serverSideRowUuid, null)
        if (status === 1) {
          success++
        } else {
          failed++
        }
      } catch (err) {
        return err.message || 'Some error occured while get user info'
      }
    })

    await Promise.all(promises)
    const response = []
    response.success = success
    response.failed = failed
    return response
  }

  // send edited data to server
  static async sfSendCopyChangedRowsToServer() {
    const arFromClientTbl = this.query()
      .where('vnRowStateInSession', rowState.SameAsDB_Copy_Changed_FormValidationPass)
      .get()

    const promises = arFromClientTbl.map(async (changedRowBeingSaved) => {
      try {
        await this.update({
          where: changedRowBeingSaved.clientSideUniqRowId,
          data: {
            vnRowStateInSession: rowState.SameAsDB_Copy_Changed_FormValidationPass_RequestedSave,
          },
        })

        let response = {}
        if (process.env.makeFetchPostApiCalls === true) {
          const response = await fetch(this.apiUrl + '/' + changedRowBeingSaved.serverSideRowUuid, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              // "Authorization": "Bearer " + TOKEN
            },
            // this.mfGetCopiedRowBeingChangedFldVal(this._formDef.atLeastOneOfFieldsForCheckingIfRowIsEmpty),
            body: JSON.stringify({
              data: changedRowBeingSaved,
            }),
          })
        } else {
          response.ok = true
        }
        if (!response.ok) {
          /* Goal: Update the value of 'vnRowStateInSession' to success or failure depending on the api response */
          this.update({
            where: this.dnClientIdOfCopiedRowBeingChanged,
            data: {
              vnRowStateInSession: rowState.SameAsDB_Copy_Changed__FormValidationPass_RequestedSave_ApiError,
            },
          })
          console.log('Failed to update')
        } else {
          /* Goal: Update old version of the reminder's ROW_END to current timestamp if change is successful
          Edge case: Say id 2 is changed that created id 3. User then closes the change layer. The table now displays id 3. Now when user clicks change for id 3 firstProp is 3.
          dnClientIdOfRowToChange is = firstProp. So dnClientIdOfRowToChange is also 3. But 3 is the new changed changedRowBeingSaved. And we want to set ROW_END for id 2 and not id 3
          How to update the ROW_END for id = 2?
            option 1: update that changedRowBeingSaved that has state = "I am from DB" and UUID = UUID of current changedRowBeingSaved
            option 2: This requires adding another state ->  "I am being changed" -> and then -> update that changedRowBeingSaved that has state = "I am being changed" and UUID = UUID of current changedRowBeingSaved
                      Option 2 is rejected. Since ID2 will now require update in following 3 cases:
                        1. When ID 3 is created it will require changing state of id 2.
                        2. Also when id3 is deleted without saving to DB.
                        3. Or ID 3 is saved to DB.

          Q): Why following where clause needed?
          A):
              Whenever we change a record and hit save button, we get two records in allPatientDataTbls with the same uuid and old one needs to be marked as histry by updating ROW_END to current timestamp.
              In real time 3 cases may happen.
                1. User changes an existing record. i.e. rowState = 1
                2. User already changed a record and then again changes that record i.e. rowState = 34571
                3. User adds a record and then changes that newly added record again i.e. rowState = 24571

          Following logic of where clause deals with these 3 types of cases.

          Q) What we have done to deal with the above mentioned problem?
          A)
              We are following below mentioned logic in where clause of allPatientDataTbls update:
              -- The expression looks like: "exp A" && ("exp B1" || "exp B2" || "exp B3")
                "exp A" -> search record from allPatientDataTbls whose uuid = this.dnOrmUuidOfRowToChange
                "exp B1" -> "vnRowStateInSession === 1",
                    allPatientDataTbls record that came from database (Case: User changes an existing record)
                "exp B2" -> "vnRowStateInSession === 34571",
                    allPatientDataTbls record that once changed successfully ie: API Success and than going to be change again (Case: User already changed a record and then again changes that record)
                "exp B3" -> "vnRowStateInSession === 24571",
                    allPatientDataTbls record that once added successfully ie: API Success and than going to be change (Case: User adds a record and then changes that newly added record again)
       */
          await this.update({
            where: (record) => {
              return (
                record.serverSideRowUuid === changedRowBeingSaved.serverSideRowUuid &&
                record.ROW_END === Future_MilliSecs_In_MariaDB_To_Mark_Row_As_Not_Deleted &&
                record.clientSideUniqRowId !== changedRowBeingSaved.clientSideUniqRowId
              )
            },
            data: {
              ROW_END: Math.floor(Date.now()),
            },
          })
          /* Goal: Update the value of 'vnRowStateInSession' to success or failure depending on the api response */
          this.update({
            where: changedRowBeingSaved.clientSideUniqRowId,
            data: {
              vnRowStateInSession: rowState.SameAsDB,
              ROW_START: Math.floor(Date.now()), // This overwites prev ROW_START. This is done so new rows ROW_START does not overlap the ROW that was just endeed in prev line of code.
            },
          })
          // console.log('update success')
        }

        /*
          Goal:
          According to our change layer architecture, when i click to open change layer, a duplicate changedRowBeingSaved (copy of changedRowBeingSaved) inserted into allPatientDataTbls and it displayed on the top of timeline.
          When change api request then we should need to insert a duplicate changedRowBeingSaved (copy of changedRowBeingSaved) again in allPatientDataTbls for further change.
        */
        this.dnClientIdOfRowToChange = this.dnClientIdOfCopiedRowBeingChanged
        this.dnClientIdOfCopiedRowBeingChanged = null
      } catch (ex) {
        console.log('update error', ex)
      }
    })
    // console.log('sfSendCopyChangedRowsToServer-> ', this.dnOrmUuidOfRowToChange)
  }
}

export default clientTblManage
