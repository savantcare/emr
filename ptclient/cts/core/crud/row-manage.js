import { Model } from '@vuex-orm/core'

class rowManage extends Model {
  // For Class syntax https://javascript.info/class
  static entity = 'rowstatus'

  /*
Question 1
----------
I have:

class rowManage extends Model {
  static arOrmRowsCached = []
(https://github.com/savantcare/emr/blob/master/ptclient/cts/core/crud/row-manage.js#L5)

export default class ptHeight extends rowManage {
(https://github.com/savantcare/emr/blob/master/ptclient/cts/spi/1t-1rMf/height/db/orm.js#L9)

export default class ptWeight extends rowManage {
(https://github.com/savantcare/emr/blob/master/ptclient/cts/spi/1t-1rMf/height/db/orm.js#L9)

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
    this.arOrmRowsCached = []       // If I do this each row of the orm model will have arOrmRowsCached = []
  }
  */

  static fields() {
    return {
      // the following fields only exist on client
      vnRowStateInSession: this.number(1), // Details read: ./forms.md
      validationClass: this.string(''),
      isValidationError: this.boolean(false),
    }
  }

  static getDiscontinuedRows() {
    /* 
    Method 1: Get discontinued rows from orm using query like: select max(id) where ROW_END < current_time group by 'uuid'
    Problem:- But I am unable to find vuex-orm groupBy query
 
    Method 2: Get all the rows having ROW_END is less then current_time. Then after, using forEach loop remove the record that have been changed and not discontinued.
    Problem:- But it is not standard method.
    Decided to use this.  

    Method 3: When i click on 'X' button, send a api request to the server and get all the discontinued rows.
    Problem: It is not satisfying our P20 architecture.
 
    Method 4: Maintain a 'isDiscontinued' enum(0 ,1) flag in database. But need to approval from Vikas sir.
    Need to discuss
    */
    // Following query makes sure I get all the discontimued rows
    const currentTime = Math.floor(Date.now() / 1000)
    const arFromORM = this.query()
      .where('ROW_END', (value) => value < currentTime)
      .orderBy('ROW_END', 'desc')
      .get()

    const arDiscontinuedRows = []
    const arDiscontinuedRowUniqueUuid = []
    const currentUniqueUuidRows = this.getValidUniqueUuidRows()

    arFromORM.forEach((item) => {
      let foundInArToReturn = false
      currentUniqueUuidRows.forEach((currentItem) => {
        if (item.uuid === currentItem.uuid) {
          foundInArToReturn = true
        }
      })
      if (!foundInArToReturn && !arDiscontinuedRowUniqueUuid.includes(item.uuid)) {
        arDiscontinuedRowUniqueUuid.push(item.uuid)
        arDiscontinuedRows.push(item)
      }
    })
    return arDiscontinuedRows
  }

  static getApiErrorStateRows() {
    // C3/3
    // New -> Changed -> Requested save -> Sent to server -> Failure
    const arFromOrm = this.query().where('vnRowStateInSession', 24578).get()
    return arFromOrm
  }

  static getApiSendingStateRows() {
    // New -> Changed -> Requested save -> Sending to server
    const arFromOrm = this.query().where('vnRowStateInSession', 2457).get()
    return arFromOrm
  }

  static getApiSuccessStateRows() {
    // New -> Changed -> Requested save -> Sent to server -> Success
    const arFromOrm = this.query().where('vnRowStateInSession', 24571).get()
    return arFromOrm
  }

  static getAllChangeRowsInEditState() {
    const arFromOrm = this.query()
      .where('vnRowStateInSession', 3) // Copy
      .orWhere('vnRowStateInSession', 34) // Copy -> Changed
      .orWhere('vnRowStateInSession', 3456) // Copy -> Changed -> Requested save -> form error
      .get()
    return arFromOrm
  }

  static getChangeRowIdInEditState(pUuid) {
    /*
      Q) Why we remove orWhere clause?
        Multiple 'where' with 'orWhere' clause not returning correct data. The 'orWhere' clause skips the first where clause like: 
        where (uuid=4545d6 AND vnRowStateInSession=3) 
        OR vnRowStateInSession=34 
        OR vnRowStateInSession=3456

        But we want the following query:
        where uuid=4545d6 AND 
        (vnRowStateInSession=3 OR vnRowStateInSession=34 OR vnRowStateInSession=3456)
    */
    const arFromOrm = this.query()
      .where('uuid', pUuid)
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

    if (arFromOrm.length) {
      const idx = arFromOrm.length - 1
      return arFromOrm[idx].id
    } else {
      return false
    }
  }

  static getFieldValue(pOrmRowId, pFieldName) {
    // first time it will have to find in model. This is needed to show the initial content in the field.
    if (
      typeof this.arOrmRowsCached[this.entity] === 'undefined' ||
      typeof this.arOrmRowsCached[this.entity][pOrmRowId] === 'undefined'
    ) {
      // finding in model
      const arFromOrm = this.find(pOrmRowId)
      if (arFromOrm) {
        if (typeof this.arOrmRowsCached[this.entity] === 'undefined') {
          this.arOrmRowsCached[this.entity] = []
        }
        this.arOrmRowsCached[this.entity][pOrmRowId] = arFromOrm
        return arFromOrm[pFieldName]
      }
    } else {
      // if caching is removed then typing will update every 1 second when the vuex store gets updated.
      // returning from cache
      return this.arOrmRowsCached[this.entity][pOrmRowId][pFieldName]
    }
  }

  static getAllNewRowsInEditState() {
    const arFromOrm = this.query()
      .where('vnRowStateInSession', 2) // New
      .orWhere('vnRowStateInSession', 24) // New -> Changed
      .orWhere('vnRowStateInSession', 2456) // New -> Changed -> Requested save -> form error
      .get()
    return arFromOrm
  }

  static getNewRowsInReadyToSubmitState() {
    // Following query makes sure I get all the newly added row having field value
    const arFromOrm = this.query()
      .where('vnRowStateInSession', 24) // New -> Changed
      .get()
    return arFromOrm
  }

  static getNotEmptyRows(pFieldForNonEmptyCheck) {
    // Following query makes sure I get valid data and not discontimued data fromm temporal table. Ref: https://mariadb.com/kb/en/temporal-data-tables/
    const arFromOrm = this.query()
      .where('ROW_END', 2147483647.999999)
      .where(pFieldForNonEmptyCheck, (value) => value.length > 0)
      .get()
    return arFromOrm
  }

  /*  This function finds data in client side vuex-orm. This fn is not making a API query to the server.
      If there are 10 rows with same UUID then it will return the latest row
  */
  static getValidUniqueUuidNotEmptyRows(pFieldForNonEmptyCheck) {
    // Following query makes sure I get valid data and not discontimued data fromm temporal table. Ref: https://mariadb.com/kb/en/temporal-data-tables/
    const arFromOrm = this.query()
      .where('ROW_END', 2147483647.999999)
      .where(pFieldForNonEmptyCheck, (value) => value.length > 0)
      .get()
    const uniqueUuidRows = []

    // Goal: From the set of valid data, find unique UUIDs since it is possible that some UUID is being changed and now there are 2 records with same UUID
    let foundInArToReturn = false
    for (let i = 0; i < arFromOrm.length; i++) {
      for (let j = 0; j < uniqueUuidRows.length; j++) {
        if (arFromOrm[i].uuid === uniqueUuidRows[j].uuid) {
          /* Suppose a row is being changed. Now 2 rows have the same uuid. The old row and the new changed row.
          In the array that is returned from this Fn I am returning the array with the new data.       
          Hence in the following line I over write the old row
          */
          uniqueUuidRows[j] = arFromOrm[i]
          foundInArToReturn = true
        }
      }
      if (foundInArToReturn) {
      } else {
        uniqueUuidRows.push(arFromOrm[i])
      }
    }

    return uniqueUuidRows
  }

  static getValidUniqueUuidRows() {
    // Following query makes sure I get valid data and not discontimued data fromm temporal table. Ref: https://mariadb.com/kb/en/temporal-data-tables/
    const arFromOrm = this.query().where('ROW_END', 2147483647.999999).get()
    const uniqueUuidRows = []

    // Goal: From the set of valid data, find unique UUIDs since it is possible that some UUID is being changed and now there are 2 records with same UUID
    for (let i = 0; i < arFromOrm.length; i++) {
      let foundInArToReturn = false
      for (let j = 0; j < uniqueUuidRows.length; j++) {
        if (arFromOrm[i].uuid === uniqueUuidRows[j].uuid) {
          /* Suppose a row is being changed. Now 2 rows have the same uuid. The old row and the new changed row.
          In the array that is returned from this Fn I am returning the array with the new data.       
          Hence in the following line I over write the old row
          */
          if (arFromOrm[i].id > uniqueUuidRows[j].id) {
            uniqueUuidRows[j] = arFromOrm[i]
          } else {
            // The existing data is newer hence not replacing
          }
          foundInArToReturn = true
        }
      }
      if (foundInArToReturn) {
        // Already found in array to be returned hence no need to add to arary
      } else {
        uniqueUuidRows.push(arFromOrm[i])
      }
    }

    // console.log(uniqueUuidRows)
    return uniqueUuidRows
  }

  static findIfDuplicateExists(pUuid) {
    const num = this.query().where('uuid', pUuid).count()
    if (num > 1) {
      return true
    } else {
      return false
    }
  }

  static deleteNewRowsInEditState() {
    const arFromOrm = this.getAllNewRowsInEditState()
    if (arFromOrm.length) {
      for (let i = 0; i < arFromOrm.length; i++) {
        this.delete(arFromOrm[i].id)
      }
    }
  }

  static deleteChangeRowsInEditState() {
    const arFromOrm = this.getAllChangeRowsInEditState()
    if (arFromOrm.length) {
      for (let i = 0; i < arFromOrm.length; i++) {
        this.delete(arFromOrm[i].id)
      }
    }
  }

  static setFieldValue(pEvent, pOrmRowId, pFieldName, pRowStatus) {
    // Step 1/2
    this.putFieldValueInCache(pEvent, pOrmRowId, pFieldName)
    // Step 2/2
    this.createTimeoutToSaveToState(pEvent, pOrmRowId, pFieldName, pRowStatus)
  }

  /*  
    Why? 
    Put the value of what the user is typing in cache so that the user can see form field has the charecters that he has typed.
  
    How? 
    Step 1: This is called in the form on each key press (@input is invoked on each key press)
            Ref: The chain is started at cts/spi/1t-Mr1f/rem/cl/add.vue:16 
            The sequence is: add.vue:16:mfSetFieldUsingCache 
                              => add.vue:116:ormRem.setField 
                                => rowStatus.js:118:this.putFieldValueInCache

    Step : The work done by this function is used on each key press at:
                            add.vue:15:value="mfGetField"
                              => add.vue:113:ormRem.getField
                                => rowStatus.js:97

    Problem?                              
      When the cache array is update we want vue to react to the change and update add.vue:15:value="mfGetField"

      forceUpdates are not good quality code. With 2 dimensional array if we do not follow right approach then force update will be needed
  */
  static putFieldValueInCache(pEvent, pOrmRowId, pFieldName) {
    // Method 1: of updating cache array. Checked by VK and RJ in July 2020 the force update is needed inside add.vue:115:setFieldInOrmOnTimeOut

    /*
      Q) Why we are using three dimensional array of arOrmRowsCached?
        A) Ref: row-manage.js:Line-8 to 46
    */
    if (typeof this.arOrmRowsCached[this.entity] === 'undefined') {
      this.arOrmRowsCached[this.entity] = [] // setting this to a blank row since later I do splice. For splice that row needs to exist.
    }
    if (typeof this.arOrmRowsCached[this.entity][pOrmRowId] === 'undefined') {
      this.arOrmRowsCached[this.entity][pOrmRowId] = [] // setting this to a blank row since later I do splice. For splice that row needs to exist.
    }
    this.arOrmRowsCached[this.entity][pOrmRowId][pFieldName] = pEvent

    /*
    // Method 2: https://vuejs.org/2016/02/06/common-gotchas/#Why-isn%E2%80%99t-the-DOM-updating
    // of updating cache array Ref: https://stackoverflow.com/questions/45644781/update-value-in-multidimensional-array-in-vue
    let newRow = []
    if (typeof this.arOrmRowsCached[pOrmRowId] === 'undefined') {
      this.arOrmRowsCached[pOrmRowId] = [] // setting this to a blank row since later I do splice. For splice that row needs to exist.
      console.log('Creating a new blank row')
    } else {
      newRow = this.arOrmRowsCached.slice(pOrmRowId, pOrmRowId + 1) // Existing row may have 5 fields so I need to pull it out before updating 1 field
      console.log('Existing row pulled out is', newRow)
    }
    newRow[pFieldName] = pEvent // Upadted the field value in the new row
    this.arOrmRowsCached.splice(pOrmRowId, 1, newRow) // Put the single row back inside the array of a lot of rows.
    // Problem: A tree structure of elements is getting made and can be verified by doing console.log
    console.log(this.arOrmRowsCached)
*/

    /*
      Method 3 of updating cache:
      this.arOrmRowsCached[pOrmRowId] = newRow // vue does not react. Now add.vue:115:setFieldInOrmOnTimeOut needs this.$forceUpdate
      */
    /* 
      Method 4 of updating cache:
      This will not work since $set is not available outside vue conetxt this is not vue context
      this.$set(this.arOrmRowsCached, pOrmRowId, newRow)
      */

    /* Method 5: Delete old rows and create new row Checked by RJ and VK on 15th July
    if (typeof this.arOrmRowsCached[pOrmRowId] === 'undefined') {
      this.arOrmRowsCached[pOrmRowId] = [] // setting this to a blank row since later I do splice. For splice that row needs to exist.
    }
    this.arOrmRowsCached[pOrmRowId][pFieldName] = pEvent

    const copyOfOldRow = this.arOrmRowsCached
    // this.arOrmRowsCached = []
    this.arOrmRowsCached.length = 0
    console.log(this.arOrmRowsCached)
    this.arOrmRowsCached = copyOfOldRow
    */
  }

  static createTimeoutToSaveToState(pEvent, pOrmRowId, pFieldName, pRowStatus) {
    // Goal: debouncing. If A and B are pressed quickly. Timeout for "A" keypress will get cancelled and timeout for "B" keypress will get scheduled.
    if (this.vOrmSaveScheduled) {
      clearTimeout(this.vOrmSaveScheduled)
    }
    /* Ref: https://stackoverflow.com/questions/38399050/vue-equivalent-of-settimeout */
    this.vOrmSaveScheduled = setTimeout(
      function (scope) {
        scope.setFieldInVuex(pEvent, pOrmRowId, pFieldName, pRowStatus)
      },
      500, // setting timeout of 500 ms
      this
    )
  }

  static setFieldInVuex(pEvent, pOrmRowId, pFieldName, pRowStatus) {
    const row = {
      [pFieldName]: pEvent,
      vnRowStateInSession: pRowStatus,
      validationClass: '',
      isValidationError: false,
    }

    const arFromOrm = this.update({
      where: pOrmRowId,
      data: row,
    })
    if (!arFromOrm) {
      console.log('FATAL ERROR')
    }
  }

  static async copyRow(pOrmRowId) {
    const arToCopy = this.find(pOrmRowId)

    // remove the id field so that vuexOrm will create a new primary key
    delete arToCopy.id
    // set ROW_START to now
    arToCopy.ROW_START = Math.floor(Date.now() / 1000)
    // Since this row is copied set the correct rowState
    arToCopy.vnRowStateInSession = 3 // For meaning of diff values read cts/core/crus/forms.md

    const newRow = await this.insert({
      data: arToCopy,
    })

    // Cannot use this since ptName is hardcoded. For different Ct this will be different.
    // const idOfNewRow = newRow.ptName[0].id

    /* How to get the first key when I do not know the name of the first key 
    Ref: https://stackoverflow.com/questions/983267/how-to-access-the-first-property-of-a-javascript-object
    */
    const firstKey = newRow[Object.keys(newRow)[0]]
    const idOfNewRow = firstKey[0].id
    return idOfNewRow
  }

  static async sendToServer() {
    // API will return 1 (Success) or 0 (Failure)
    const arFromOrm = this.query().where('vnRowStateInSession', 2457).get()

    /*
      Q) Why we use promise in following code?
      A)
        In real time, user may add data and hit save button of add form and again tries to save data before the previous data gets saved in DB. The system got confused in such case.
        We are using asynchronous promises to deal with the case.
    */
    const promises = arFromOrm.map(async (row) => {
      try {
        /*
        Q) Why we put the api call code in if/else statement?
        A)
          We are dealing cases like:
            1. User adds data, hits save button twice or double click
            2. user adds data, hits save button and again tries to add another data and click save button before previous api call finished. 
          Here is the problem and how we are resolving this:
            Save process starts with searching from orm for the records having 'vnRowStateInSession' = 2457.
            Now, 'vnRowStateInSession' of orm record gets updated only after api call finishes and in above mentioned cases, system initiates this save process again before 'vnRowStateInSession' update. 
            That means the second time searching for 'vnRowStateInSession' = 2457 will point to the same record multiple times which should not be the actual case.
            To solve this, we are maintaining an array 'arOrmRowIdSendToServer' during the process, which contains orm row id that are going to be saved.
            In if statement we are searching if orm row id exist in that array. if yes then api sending process already happened for the row, hence not to do anything. if not found then in else statement we are initiating the api calling process after pushing orm row id in 'arOrmRowIdSendToServer'.
      */
        if (this.arOrmRowIdSendToServer.includes(row.id)) {
          console.log('Already sent to server')
        } else {
          this.arOrmRowIdSendToServer.push(row.id)
          const status = await this.fnMakeApiCAll(row)
          if (status === 0) {
            // Handle api returned success
            this.update({
              where: (record) => record.id === row.id,
              data: {
                vnRowStateInSession: '24578', // New -> Changed -> Requested save -> Send to server -> API fail
              },
            })
          } else {
            // Handle api returned failure
            this.update({
              where: (record) => record.id === row.id,
              data: {
                vnRowStateInSession: '24571', // New -> Changed -> Requested save -> Send to server -> API Success
              },
            })

            /* Remove orm row id from 'arOrmRowIdSendToServer' after this promise finished. */
            const index = this.arOrmRowIdSendToServer.indexOf(row.id)
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
    pOrmRowArray.ptUUID = 'bfe041fa-073b-4223-8c69-0540ee678ff8'
    pOrmRowArray.recordChangedByUUID = 'bua674fa-073b-4223-8c69-0540ee786kj8'
    try {
      const response = await fetch(this.apiUrl, {
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

  static async sendDiscontinueDataToServer(pOrmDataRowId, rowUUID, discontinuedNote) {
    try {
      const response = await fetch(`${this.apiUrl}/${rowUUID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          // "Authorization": "Bearer " + TOKEN
        },
        body: JSON.stringify({
          dNotes: discontinuedNote,
          patientId: 'bfe041fa-073b-4223-8c69-0540ee678ff8',
        }),
      })
      if (!response.ok) {
        return 0
      } else {
        this.update({
          where: pOrmDataRowId,
          data: {
            ROW_END: Math.floor(Date.now() / 1000),
          },
        })
        return 1
      }
    } catch (ex) {
      return 0
    }
  }

  static async sendMultiDiscontinueDataToServer(dataRow) {
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
        const status = await this.sendDiscontinueDataToServer(row.id, row.uuid, null)
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

export default rowManage
