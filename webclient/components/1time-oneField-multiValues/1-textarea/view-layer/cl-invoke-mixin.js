// Reference implementation

// Ref: https://stackoverflow.com/questions/43841778/vue-js-how-to-use-in-mixins-in-single-file-template
import reminderClientSideTable from '~/components/1time-oneField-multiValues/1-textarea/cts/reminders/db/client-side/structure/reminders-of-a-patient-table.js' // Path without @ can be resolved by vsCode. Hence do not use webpack specific @ sign that represents src folder.
import recommendationClientSideTable from '~/components/1time-oneField-multiValues/1-textarea/cts/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'
import miscNotesClientSideTable from '~/components/1time-oneField-multiValues/1-textarea/cts/misc-notes/db/client-side/structure/misc-notes-of-a-patient-table.js'
import planCommentsClientSideTable from '~/components/1time-oneField-multiValues/1-textarea/cts/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'
import processNotesClientSideTable from '~/components/1time-oneField-multiValues/1-textarea/cts/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'
// defining all rows in this object
const clientSideTable = {
  reminders: reminderClientSideTable,
  recommendations: recommendationClientSideTable,
  plan_comments: planCommentsClientSideTable,
  misc_notes: miscNotesClientSideTable,
  process_notes: processNotesClientSideTable,
} // 1st row

export default {
  props: {
    firstProp: {
      type: String,
    },
  },
  methods: {
    mxOpenAddCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'add reminder',
      })
    },
    mxOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: this.propComponentName,
      })
    },
    mxOpenDDialog() {
      let confirmMessage = 'Are you sure you want to delete all the selected reminders?'
      if (this.daSelectedRemForDelete.length === 0) {
        confirmMessage = 'No reminder selected. Please select at least one reminder.'
      }

      this.$confirm(confirmMessage, 'Multi delete', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(async () => {
          if (this.daSelectedRemForDelete.length > 0) {
            const status = await clientSideTable[this.propComponentName].fnSendMultiDeleteDataToServer(
              this.daSelectedRemForDelete
            )
            if (status.success > 0) {
              this.$message({
                type: 'success',
                message: status.success + ' reminder deleted.',
              })
            }
            if (status.failed > 0) {
              this.$message({
                type: 'error',
                message: status.failed + ' reminder failed to delete. Please try again later.',
              })
            }
          }
          console.log('daSelectedRemForDelete=====>', this.daSelectedRemForDelete)
        })
        .catch(() => {
          console.log('multi delete cancelled')
        })
    },
    async mxOpenTrashCanCtInEditLayer() {
      const deletedRows = await clientSideTable[this.propComponentName].fnGetDeletedRows()
      const arDrawerData = []
      deletedRows.forEach((item) => {
        const arRow = []
        arRow.content = item.description
        const date = new Date(item.ROW_END * 1000)
        arRow.deletedAt = date.toLocaleString()

        arDrawerData.push(arRow)
      })
      console.log('deletedRows====>', deletedRows)
      this.$store.commit('mtfSetDeletedDrawerValue', {
        visibility: true,
        drawerTitle: 'Deleted reminders',
        drawerData: arDrawerData,
      })
    },
    mxOpenEditCtInEditLayer(pClientSideDataRowId) {
      /*
       We need rowID of vuexORM inside the change ct. Since change ct needs the exiting Desc of the reminber to change
       Option 1: Send the whole data row
       Option 2: Send just the ID in a prop.
        +ves:
          1. At some places I may need to call change where I have the reminder ID but
          i do not have the remainder of the data row. Hence this makes the Change Ct possible
          to use at other places
          2. When I send a paramter it is like calling a function. Sending the whole data row
          is like working on a gloal variable. So other Cts can also modify this global variable.
      */
      const payload = { searchTerm: 'edit ' + this.propComponentName, pPropsToGiveToCt: pClientSideDataRowId }
      console.log(payload)
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', payload)
    },
    mfIconDeleteClickedOnChildCard(pClientSideDataRowId) {
      const arResultsFromOrm = clientSideTable[this.propComponentName].find(pClientSideDataRowId)

      this.$prompt(arResultsFromOrm.description, 'Delete reminder', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        inputPlaceholder: 'Enter delete note',
      })
        .then(async ({ value }) => {
          const status = await clientSideTable[this.propComponentName].fnSendDeleteDataToServer(
            pClientSideDataRowId,
            arResultsFromOrm.serverSideRowUuid,
            value
          )
          if (status === 1) {
            this.$message({
              type: 'success',
              message: 'Reminder deleted.',
            })
          } else {
            this.$message({
              type: 'error',
              message: 'Something went wrong. Please try again later.',
            })
          }
          console.log('delete status ======> ', status)
        })
        .catch(() => {
          console.log('Delete cancelled')
        })
    },
    mxHandleSelectionForDelete(val) {
      this.daSelectedRemForDelete = val
    },
  },
}
