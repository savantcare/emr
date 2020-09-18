// Reference implementation

// Ref: https://stackoverflow.com/questions/43841778/vue-js-how-to-use-in-mixins-in-single-file-template
import objOrm from '~/components/pt-info/single/1t-Mrow-1Field/recommendation/db/client-side/structure/rec-table.js'

export default {
  methods: {
    mxOpenACtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'add recommendation',
      })
    },
    mxOpenMCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'multi change recommendation',
      })
    },
    mxOpenDDialog() {
      let confirmMessage = 'Are you sure you want to discontinue all the selected recommendations?'
      if (this.daSelectedRecForDiscontinue.length === 0) {
        confirmMessage = 'No recommendation selected. Please select at least one recommendation.'
      }

      this.$confirm(confirmMessage, 'Multi discontinue', {
        confirmButtonText: 'Discontinue',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(async () => {
          if (this.daSelectedRecForDiscontinue.length > 0) {
            const status = await objOrm.fnSendMultiDiscontinueDataToServer(
              this.daSelectedRecForDiscontinue
            )
            if (status.success > 0) {
              this.$message({
                type: 'success',
                message: status.success + ' recommendation discontinued.',
              })
            }
            if (status.failed > 0) {
              this.$message({
                type: 'error',
                message: status.failed + ' recommendation failed to discontinue. Please try again later.',
              })
            }
          }
          console.log('daSelectedRecForDiscontinue=====>', this.daSelectedRecForDiscontinue)
        })
        .catch(() => {
          console.log('multi discontinue cancelled')
        })
    },
    async mxOpenXCtInCl() {
      const discontinuedRows = await objOrm.fnGetDiscontinuedRows()
      const arDrawerData = []
      discontinuedRows.forEach((item) => {
        const arRow = []
        arRow.content = item.description
        const date = new Date(item.ROW_END * 1000)
        arRow.discontinuedAt = date.toLocaleString()

        arDrawerData.push(arRow)
      })
      console.log('discontinuedRows====>', discontinuedRows)
      this.$store.commit('mtfSetDiscontinuedDrawerValue', {
        visibility: true,
        drawerTitle: 'Discontinued recommendations',
        drawerData: arDrawerData,
      })
    },
    mxOpenCCtInCl(pOrmDataRowId) {
      /*
       We need rowID of vuexORM inside the change ct. Since change ct needs the exiting Desc of the recinber to change
       Option 1: Send the whole data row
       Option 2: Send just the ID in a prop.
        +ves:
          1. At some places I may need to call change where I have the recommendation ID but
          i do not have the recainder of the data row. Hence this makes the Change Ct possible
          to use at other places
          2. When I send a paramter it is like calling a function. Sending the whole data row
          is like working on a gloal variable. So other Cts can also modify this global variable.
      */
      const payload = { searchTerm: 'change recommendation', pPropsToGiveToCt: pOrmDataRowId }
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', payload)
    },
    mxOpenDPrompt(pOrmDataRowId) {
      const arResultsFromOrm = objOrm.find(pOrmDataRowId)

      this.$prompt(arResultsFromOrm.description, 'Discontinue recommendation', {
        confirmButtonText: 'Discontinue',
        cancelButtonText: 'Cancel',
        inputPlaceholder: 'Enter discontinue note',
      })
        .then(async ({ value }) => {
          const status = await objOrm.fnSendDiscontinueDataToServer(
            pOrmDataRowId,
            arResultsFromOrm.uuid,
            value
          )
          if (status === 1) {
            this.$message({
              type: 'success',
              message: 'Recommendation discontinued.',
            })
          } else {
            this.$message({
              type: 'error',
              message: 'Something went wrong. Please try again later.',
            })
          }
          console.log('discontinue status ======> ', status)
        })
        .catch(() => {
          console.log('Discontinue cancelled')
        })
    },
    mxHandleSelectionForDiscontinue(val) {
      this.daSelectedRecForDiscontinue = val
    },
  },
}
