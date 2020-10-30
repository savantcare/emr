// Reference implementation
// Ref: https://stackoverflow.com/questions/43841778/vue-js-how-to-use-in-mixins-in-single-file-template
import reminderClientTbl from '~/components/temporal/reminders/db/client-side/structure/reminders-of-a-patient-table.js' // Path without @ can be resolved by vsCode. Hence do not use webpack specific @ sign that represents src folder.
import recommendationClientTbl from '~/components/temporal/recommendations/db/client-side/structure/recommendations-of-a-patient-table.js'
import miscNotesClientTbl from '~/components/temporal/miscellaneous-notes/db/client-side/structure/miscellaneous-notes-of-a-patient-table.js'
import planCommentsClientTbl from '~/components/temporal/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'
import processNotesClientTbl from '~/components/temporal/process-notes/db/client-side/structure/process-notes-of-a-patient-table.js'
import chiefComplaintClientTbl from '~/components/temporal/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'
import familyHistoryClientTbl from '~/components/temporal/family-history/db/client-side/structure/family-history-of-a-patient-table.js'

// defining all rows in this object
const clientTbl = {
  reminders: reminderClientTbl,
  recommendations: recommendationClientTbl,
  plan_comments: planCommentsClientTbl,
  miscellaneous_notes: miscNotesClientTbl,
  process_notes: processNotesClientTbl,
  chief_complaint: chiefComplaintClientTbl,
  family_history: familyHistoryClientTbl,
} // 1st row

export default {
  props: {
    firstProp: {
      type: Number,
    },
  },
  methods: {
    mxOpenAddCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: this.propFormDef.id,
      })
    },
    mxOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: this.propFormDef.id,
      })
    },
    mxOpenDDialog() {
      let confirmMessage = 'Are you sure you want to delete all the selected ' + this.propFormDef.plural + '?'
      if (this.daSelectedRemForDelete.length === 0) {
        confirmMessage =
          'No  ' +
          this.propFormDef.singular +
          ' selected. Please select at least one  ' +
          this.propFormDef.singular +
          '.'
      }

      this.$confirm(confirmMessage, 'Multi delete', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(async () => {
          if (this.daSelectedRemForDelete.length > 0) {
            const status = await clientTbl[this.propFormDef.id].fnSendMultiDeleteDataToServer(
              this.daSelectedRemForDelete
            )
            if (status.success > 0) {
              this.$message({
                type: 'success',
                message: status.success + this.propFormDef.singular + ' deleted.',
              })
            }
            if (status.failed > 0) {
              this.$message({
                type: 'error',
                message: status.failed + this.propFormDef.singular + ' failed to delete. Please try again later.',
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
      const deletedRows = await clientTbl[this.propFormDef.id].fnGetDeletedRows()
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
        drawerTitle: 'Deleted ' + this.propFormDef.plural,
        drawerData: arDrawerData,
      })
    },
    mxOpenEditCtInEditLayer(pClientDataRowId) {
      /*
       We need rowID of vuexORM inside the change ct. Since change ct needs the exiting Desc of the reminber to change
       Option 1: Send the whole data row
       Option 2: Send just the ID in a prop.
        +ves:
          1. At some places I may need to call change where I have the component ID but
          i do not have the remainder of the data row. Hence this makes the Change Ct possible
          to use at other places
          2. When I send a paramter it is like calling a function. Sending the whole data row
          is like working on a gloal variable. So other Cts can also modify this global variable.
      */
      const payload = { searchTerm: 'edit ' + this.propFormDef.id, pPropsToGiveToCt: pClientDataRowId }
      console.log(payload)
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', payload)
    },
    async mfIconDeleteClickedOnChildCard(pClientDataRowId) {
      const arResultsFromOrm = clientTbl[this.propFormDef.id].find(pClientDataRowId)

      // if data is on not-reviewed state data remove from orm
      if (arResultsFromOrm.vnRowStateInSession === 24) {
        const deleteStatus = await clientTbl[this.propFormDef.id].delete(pClientDataRowId)
        if (deleteStatus != null) {
          this.$message({
            type: 'success',
            message: this.propFormDef.singular + ' deleted.',
          })
        } else {
          this.$message({
            type: 'error',
            message: 'Something went wrong. Please try again later.',
          })
        }
        return
      }

      this.$prompt(arResultsFromOrm.description, 'Delete ' + this.propFormDef.singular, {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        inputPlaceholder: 'Enter delete note',
      })
        .then(async ({ value }) => {
          const status = await clientTbl[this.propFormDef.id].fnSendDeleteDataToServer(
            pClientDataRowId,
            arResultsFromOrm.serverSideRowUuid,
            value
          )
          if (status === 1) {
            this.$message({
              type: 'success',
              message: this.propFormDef.plural + ' deleted.',
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
