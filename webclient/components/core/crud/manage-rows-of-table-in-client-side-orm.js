import { Model } from '@vuex-orm/core'

class clientSideTableManage extends Model {
  // For Class syntax https://javascript.info/class
  static entity = 'clientSideTableManage'

  /*
Question 1
----------
I have:

class clientSideTableManage extends Model {
  static arOrmRowsCached = []
(https://github.com/savantcare/emr/blob/master/webclient/cts/core/crud/row-manage.js#L5)

export default class ptHeight extends clientSideTableManage {
(https://github.com/savantcare/emr/blob/master/webclient/cts/ptinfo-single/1time-1row-mField/bm/sub-cts/height/db/table.js#L9)

export default class ptWeight extends clientSideTableManage {
(https://github.com/savantcare/emr/blob/master/webclient/cts/ptinfo-single/1time-1row-mField/bm/sub-cts/height/db/table.js#L9)

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
  static arOrmRowIdSendToServer = []

  /*
  constructor() {
    super()
    this.arOrmRowsCached = []       // If I do this each row of the clientSideTable model will have arOrmRowsCached = []
  }
  */

  static primaryKey = 'clientSideUniqRowId'

  static fields() {
    return {
      // the following flds only exist on client
      vnRowStateInSession: this.number(1), // For different values of vnRowStateInSession and what they mean see: ./forms.md
      validationClass: this.string(''),
      isValidationError: this.boolean(false),
    }
  }

  static fnGetNewRowsInEditState() {
    const arFromClientSideTable = this.query()
      .where('vnRowStateInSession', 2) // New
      .orWhere('vnRowStateInSession', 24) // New -> Changed
      .orWhere('vnRowStateInSession', 2456) // New -> Changed -> Requested save -> form error
      .get()
    return arFromClientSideTable
  }

  static fnGetNewRowsInApiErrorState() {
    // New(2) -> Changed(4) -> Requested save(5) -> Sent to server(7) -> Failure(8)
    const arFromClientSideTable = this.query().where('vnRowStateInSession', 24578).get()
    return arFromClientSideTable
  }

  static fnGetNewRowsInReadyToReviewedState() {
    // Following query makes sure I get all the newly added row having fld value
    const arFromClientSideTable = this.query()
      .where('vnRowStateInSession', 24) // New -> Changed
      .get()
    return arFromClientSideTable
  }

  static fnGetNewRowsInApiSendingState() {
    // New(2) -> Changed(4) -> Requested save(5) -> Sending to server(7)
    const arFromClientSideTable = this.query().where('vnRowStateInSession', 2457).get()
    return arFromClientSideTable
  }

  static fnGetNewRowsInApiSuccessState() {
    // New(2) -> Changed(4) -> Requested save(5) -> Sent to server(7) -> Success(1)
    const arFromClientSideTable = this.query().where('vnRowStateInSession', 24571).get()
    return arFromClientSideTable
  }

  static fnGetAllChangeRowsInEditState() {
    const arFromClientSideTable = this.query()
      .where('vnRowStateInSession', 3) // Copy(3)
      .orWhere('vnRowStateInSession', 34) // Copy(3) -> Changed(4)
      .orWhere('vnRowStateInSession', 3456) // Copy(3) -> Changed(4) -> Requested save(5) -> form error(6)
      .get()
    return arFromClientSideTable
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
    const arFromClientSideTable = this.query()
      .where('serverSideRowUuid', pUuid)
      .where((record) => {
        return (
          record.vnRowStateInSession === 3 ||
          record.vnRowStateInSession === 34 ||
          record.vnRowStateInSession === 3456
        )
      })
      // .where('vnRowStateInSession', 3) // Copy
      // .orWhere('vnRowStateInSession', 34) // Copy -> Changed
      // .orWhere('vnRowStateInSession', 3456) // Copy -> Changed -> Requested save -> form error
      .get()

    if (arFromClientSideTable.length) {
      const idx = arFromClientSideTable.length - 1
      return arFromClientSideTable[idx].clientSideUniqRowId
    } else {
      return false
    }
  }

  static fnGetNotEmptyRows(pFldForNonEmptyCheck) {
    // Following query makes sure I get valid data and not discontimued data fromm temporal table. Ref: https://mariadb.com/kb/en/temporal-data-tables/
    const arFromClientSideTable = this.query()
      .where('ROW_END', 2147483648000)
      .where(pFldForNonEmptyCheck, (value) => value.length > 0)
      .get()
    return arFromClientSideTable
  }

  static fnGetNonEmptyRowsToChange(pFldForNonEmptyCheck) {
    // Step 1/2: Get valid data and not deleted data from temporal table. Ref: https://mariadb.com/kb/en/temporal-data-tables/
    const arFromClientSideTable = this.query()
      .where('ROW_END', 2147483648000)
      .where(pFldForNonEmptyCheck, (value) => value.length > 0)
      .get()

    // DataSet -> It is possible that some UUID is being changed and now there are 2 records with same UUID

    // Step 2/3: Discard all entries from this dataset where it does not end in 1. Ending in 1 implies that the data has been saved to DB
    for (let i = 0; i < arFromClientSideTable.length; i++) {
      if (arFromClientSideTable[i].vnRowStateInSession % 10 === 1) {
      } else {
        arFromClientSideTable.splice(i, 1)
      }
    }

    /* At this step: It is not possible for dataset to have 2 rows with the same UUID. Since:
    Since everytime a row is updated the previous row is marked as deleted 
    So deleted rows will not cross step 1 query */
    return arFromClientSideTable
  }

  static fnGetRowsToChange() {
    // Step 1/2: Get valid data and not deleted data from temporal table. Ref: https://mariadb.com/kb/en/temporal-data-tables/
    const arFromClientSideTable = this.query().where('ROW_END', 2147483648000).get()

    // DataSet -> It is possible that some UUID is being changed and now there are 2 records with same UUID

    // Step 2/3: Discard all entries from this dataset where it does not end in 1. Ending in 1 implies that the data has been saved to DB
    for (let i = 0; i < arFromClientSideTable.length; i++) {
      if (arFromClientSideTable[i].vnRowStateInSession % 10 === 1) {
      } else {
        arFromClientSideTable.splice(i, 1)
      }
    }

    /* At this step: It is not possible for dataset to have 2 rows with the same UUID. Since:
    Since everytime a row is updated the previous row is marked as deleted 
    So deleted rows will not cross step 1 query */
    return arFromClientSideTable
  }

  /*  1. This function finds data in client side vuex-orm. This fn is not making a API query to the server.
      2. If there are 10 rows with same UUID then it will return the latest row
      3. The term "valid" is same as used in mariadb https://mariadb.com/kb/en/temporal-data-tables/
          this means that the row has not been deleted.
  */
  static fnGetPresentUniqueUuidNotEmptyRows(pFldForNonEmptyCheck) {
    // Following query makes sure I get valid data and not discontimued data fromm temporal table. Ref: https://mariadb.com/kb/en/temporal-data-tables/
    const arFromClientSideTable = this.query()
      .where('ROW_END', 2147483648000)
      .where(pFldForNonEmptyCheck, (value) => value.length > 0)
      .get()
    const uniqueUuidRows = []

    // Goal: From the set of valid data, find unique UUIDs since it is possible that some UUID is being changed and now there are 2 records with same UUID
    let foundInArToReturn = false
    for (let i = 0; i < arFromClientSideTable.length; i++) {
      for (let j = 0; j < uniqueUuidRows.length; j++) {
        if (arFromClientSideTable[i].serverSideRowUuid === uniqueUuidRows[j].serverSideRowUuid) {
          /* Suppose a row is being changed. Now 2 rows have the same serverSideRowUuid. The old row and the new changed row.
          In the array that is returned from this Fn I am returning the array with the new data.       
          Hence in the following line I over write the old row
          */
          uniqueUuidRows[j] = arFromClientSideTable[i]
          foundInArToReturn = true
        }
      }
      if (foundInArToReturn) {
      } else {
        uniqueUuidRows.push(arFromClientSideTable[i])
      }
    }

    return uniqueUuidRows
  }

  static fnGetPresentUniqueUuidRows() {
    // Following query makes sure I get valid data and not discontimued data fromm temporal table. Ref: https://mariadb.com/kb/en/temporal-data-tables/
    const arFromClientSideTable = this.query().where('ROW_END', 2147483648000).get()
    const uniqueUuidRows = []

    // Goal: From the set of valid data, find unique UUIDs since it is possible that some UUID is being changed and now there are 2 records with same UUID
    for (let i = 0; i < arFromClientSideTable.length; i++) {
      let foundInArToReturn = false
      for (let j = 0; j < uniqueUuidRows.length; j++) {
        if (arFromClientSideTable[i].serverSideRowUuid === uniqueUuidRows[j].serverSideRowUuid) {
          /* Suppose a row is being changed. Now 2 rows have the same serverSideRowUuid. The old row and the new changed row.
          In the array that is returned from this Fn I am returning the array with the new data.       
          Hence in the following line I over write the old row
          */
          if (
            arFromClientSideTable[i].clientSideUniqRowId > uniqueUuidRows[j].clientSideUniqRowId
          ) {
            uniqueUuidRows[j] = arFromClientSideTable[i]
          } else {
            // The existing data is newer hence not replacing
          }
          foundInArToReturn = true
        }
      }
      if (foundInArToReturn) {
        // Already found in array to be returned hence no need to add to arary
      } else {
        uniqueUuidRows.push(arFromClientSideTable[i])
      }
    }

    // console.log(uniqueUuidRows)
    return uniqueUuidRows
  }

  static fnGetDeletedRows() {
    /* 
    
    Method 1: Get deleted rows from clientSideTable using query like: select max(id) where ROW_END < current_time group by 'serverSideRowUuid'
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

  static fnGetFldValue(pClientSideRowId, pFldName) {
    // first time it will have to find in model. This is needed to show the initial content in the fld.
    if (
      typeof this.arOrmRowsCached[this.entity] === 'undefined' ||
      typeof this.arOrmRowsCached[this.entity][pClientSideRowId] === 'undefined'
    ) {
      // finding in model
      const arFromClientSideTable = this.find(pClientSideRowId)
      if (arFromClientSideTable) {
        if (typeof this.arOrmRowsCached[this.entity] === 'undefined') {
          this.arOrmRowsCached[this.entity] = []
        }
        this.arOrmRowsCached[this.entity][pClientSideRowId] = arFromClientSideTable
        return arFromClientSideTable[pFldName]
      }
    } else {
      // if caching is removed then typing will update every 1 second when the vuex store gets updated.
      // returning from cache
      return this.arOrmRowsCached[this.entity][pClientSideRowId][pFldName]
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

  static fnSetFldValue(pEvent, pClientSideRowId, pFldName, pRowStatus) {
    // Step 1/2: Putting the value in cache so that getFldValue can get the data from cache and user can get fast feedback to typing
    this.fnPutFldValueInCache(pEvent, pClientSideRowId, pFldName)
    // Step 2/2
    this.fnCreateTimeoutToSaveToState(pEvent, pClientSideRowId, pFldName, pRowStatus)
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
  static fnPutFldValueInCache(pEvent, pClientSideRowId, pFldName) {
    // Method 1: of updating cache array. Checked by VK and RJ in July 2020 the force update is needed inside add.vue:115:setfldInEditLayerientSideTableOnTimeOut

    /*
      Q) Why we are using three dimensional array of arOrmRowsCached?
        A) Ref: row-manage.js:Line-8 to 46
    */
    if (typeof this.arOrmRowsCached[this.entity] === 'undefined') {
      this.arOrmRowsCached[this.entity] = [] // setting this to a blank row since later I do splice. For splice that row needs to exist.
    }
    if (typeof this.arOrmRowsCached[this.entity][pClientSideRowId] === 'undefined') {
      this.arOrmRowsCached[this.entity][pClientSideRowId] = [] // setting this to a blank row since later I do splice. For splice that row needs to exist.
    }
    this.arOrmRowsCached[this.entity][pClientSideRowId][pFldName] = pEvent

    /*
    // Method 2: https://vuejs.org/2016/02/06/common-gotchas/#Why-isn%E2%80%99t-the-DOM-updating
    // of updating cache array Ref: https://stackoverflow.com/questions/45644781/update-value-in-multidimensional-array-in-vue
    let newRow = []
    if (typeof this.arOrmRowsCached[pClientSideRowId] === 'undefined') {
      this.arOrmRowsCached[pClientSideRowId] = [] // setting this to a blank row since later I do splice. For splice that row needs to exist.
      console.log('Creating a new blank row')
    } else {
      newRow = this.arOrmRowsCached.slice(pClientSideRowId, pClientSideRowId + 1) // Existing row may have 5 flds so I need to pull it out before updating 1 fld
      console.log('Existing row pulled out is', newRow)
    }
    newRow[pFldName] = pEvent // Upadted the fld value in the new row
    this.arOrmRowsCached.splice(pClientSideRowId, 1, newRow) // Put the single row back inside the array of a lot of rows.
    // Problem: A tree structure of elements is getting made and can be verified by doing console.log
    console.log(this.arOrmRowsCached)
*/

    /*
      Method 3 of updating cache:
      this.arOrmRowsCached[pClientSideRowId] = newRow // vue does not react. Now add.vue:115:setfldInEditLayerientSideTableOnTimeOut needs this.$forceUpdate
      */
    /* 
      Method 4 of updating cache:
      This will not work since $set is not available outside vue conetxt this is not vue context
      this.$set(this.arOrmRowsCached, pClientSideRowId, newRow)
      */

    /* Method 5: Delete old rows and create new row Checked by RJ and VK on 15th July
    if (typeof this.arOrmRowsCached[pClientSideRowId] === 'undefined') {
      this.arOrmRowsCached[pClientSideRowId] = [] // setting this to a blank row since later I do splice. For splice that row needs to exist.
    }
    this.arOrmRowsCached[pClientSideRowId][pFldName] = pEvent

    const copyOfOldRow = this.arOrmRowsCached
    // this.arOrmRowsCached = []
    this.arOrmRowsCached.length = 0
    console.log(this.arOrmRowsCached)
    this.arOrmRowsCached = copyOfOldRow
    */
  }

  static fnCreateTimeoutToSaveToState(pEvent, pClientSideRowId, pFldName, pRowStatus) {
    // Goal: debouncing. If A and B are pressed quickly. Timeout for "A" keypress will get cancelled and timeout for "B" keypress will get scheduled.
    if (this.vOrmSaveScheduled) {
      clearTimeout(this.vOrmSaveScheduled)
    }
    /* Ref: https://stackoverflow.com/questions/38399050/vue-equivalent-of-settimeout */
    this.vOrmSaveScheduled = setTimeout(
      function (scope) {
        scope.fnSetFldInVuex(pEvent, pClientSideRowId, pFldName, pRowStatus)
      },
      500, // setting timeout of 500 ms
      this
    )
  }

  static fnSetFldInVuex(pEvent, pClientSideRowId, pFldName, pRowStatus) {
    const row = {
      [pFldName]: pEvent,
      vnRowStateInSession: pRowStatus,
      validationClass: '',
      isValidationError: false,
    }

    const arFromClientSideTable = this.update({
      where: pClientSideRowId,
      data: row,
    })
    if (!arFromClientSideTable) {
      console.log('FATAL ERROR')
    }
  }

  static async fnCopyRow(pOrmSourceRowId) {
    // the copied row will have the same serverSideRowUuid as the first row
    // In temporal table when row is updated first a copy is made but UUID remains same
    // Since primary key is internally set as UUID.row_start
    const arToCopy = this.find(pOrmSourceRowId)
    delete arToCopy.clientSideUniqRowId // removing the id fld from source so that vuexOrm will create a new primary key in destination
    arToCopy.ROW_START = Math.floor(Date.now()) // set ROW_START to now
    arToCopy.vnRowStateInSession = 3 // // Since this row is copied set the correct rowState For meaning of diff values read ./forms.md
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
    const arFromClientSideTable = this.fnGetNewRowsInEditState()
    if (arFromClientSideTable.length) {
      for (let i = 0; i < arFromClientSideTable.length; i++) {
        this.delete(arFromClientSideTable[i].clientSideUniqRowId)
      }
    }
  }

  static fnDeleteChangeRowsInEditState() {
    const arFromClientSideTable = this.fnGetAllChangeRowsInEditState()
    if (arFromClientSideTable.length) {
      for (let i = 0; i < arFromClientSideTable.length; i++) {
        this.delete(arFromClientSideTable[i].clientSideUniqRowId)
      }
    }
  }

  static async fnSendToServer() {
    // API will return 1 (Success) or 0 (Failure)
    const arFromClientSideTable = this.query().where('vnRowStateInSession', 2457).get()

    /*
      Q) Why we use promise in following code?
      A)
        In real time, user may add data and hit save button of add form and again tries to save data before the previous data gets saved in DB. The system got confused in such case.
        We are using asynchronous promises to deal with the case.
    */
    const promises = arFromClientSideTable.map(async (row) => {
      try {
        /*
        Q) Why we put the api call code in if/else statement?
        A)
          We are dealing cases like:
            1. User adds data, hits save button twice or double click
            2. user adds data, hits save button and again tries to add another data and click save button before previous api call finished. 
          Here is the problem and how we are resolving this:
            Save process starts with searching from clientSideTable for the records having 'vnRowStateInSession' = 2457.
            Now, 'vnRowStateInSession' of clientSideTable record gets updated only after api call finishes and in above mentioned cases, system initiates this save process again before 'vnRowStateInSession' update. 
            That means the second time searching for 'vnRowStateInSession' = 2457 will point to the same record multiple times which should not be the actual case.
            To solve this, we are maintaining an array 'arOrmRowIdSendToServer' during the process, which contains clientSideTable row id that are going to be saved.
            In if statement we are searching if clientSideTable row id exist in that array. if yes then api sending process already happened for the row, hence not to do anything. if not found then in else statement we are initiating the api calling process after pushing clientSideTable row id in 'arOrmRowIdSendToServer'.
      */
        if (this.arOrmRowIdSendToServer.includes(row.clientSideUniqRowId)) {
          console.log('Already sent to server')
        } else {
          this.arOrmRowIdSendToServer.push(row.clientSideUniqRowId)
          const status = await this.fnMakeApiCAll(row)
          if (status === 0) {
            // Handle api returned success
            this.update({
              where: (record) => record.clientSideUniqRowId === row.clientSideUniqRowId,
              data: {
                vnRowStateInSession: '24578', // New -> Changed -> Requested save -> Send to server -> API fail
              },
            })
          } else {
            // Handle api returned failure
            this.update({
              where: (record) => record.clientSideUniqRowId === row.clientSideUniqRowId,
              data: {
                vnRowStateInSession: '24571', // New -> Changed -> Requested save -> Send to server -> API Success
              },
            })

            /* Remove clientSideTable row id from 'arOrmRowIdSendToServer' after this promise finished. */
            const index = this.arOrmRowIdSendToServer.indexOf(row.clientSideUniqRowId)
            if (index > -1) {
              this.arOrmRowIdSendToServer.splice(index, 1)
            }
          }
        }
      } catch (err) {
        return err.message || 'Some error occured while get user info'
      }
    })

    await Promise.all(promises)
  }

  static async fnMakeApiCAll(pOrmRowArray) {
    const socketClientObj = await tableCommonForAllComponents.find(1)
    // console.log(tableCommonForAllComponents)
    pOrmRowArray.ptUUID = 'bfe041fa-073b-4223-8c69-0540ee678ff8'
    pOrmRowArray.recordChangedByUUID = 'bua674fa-073b-4223-8c69-0540ee786kj8'
    pOrmRowArray.clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange =
      socketClientObj.clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange
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
  }

  static async fnSendDeleteDataToServer(pClientSideDataRowId, rowUUID, deletedNote) {
    try {
      const socketClientObj = await tableCommonForAllComponents.find(1)

      const response = await fetch(`${this.apiUrl}/${rowUUID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          // "Authorization": "Bearer " + TOKEN
        },
        body: JSON.stringify({
          dNotes: deletedNote,
          patientId: 'bfe041fa-073b-4223-8c69-0540ee678ff8',
          clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange:
            socketClientObj.clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange,
        }),
      })
      if (!response.ok) {
        return 0
      } else {
        this.update({
          where: pClientSideDataRowId,
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
        const status = await this.fnSendDeleteDataToServer(
          row.clientSideUniqRowId,
          row.serverSideRowUuid,
          null
        )
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
}

export default clientSideTableManage
