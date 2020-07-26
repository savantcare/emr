// Ref: https://stackoverflow.com/questions/43841778/vue-js-how-to-use-in-mixins-in-single-file-template
import ormRem from '@/cts/spi/rem/db/vuex-orm/rem.js'

export default {
  methods: {
    mxOpenACtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'add reminder',
      })
    },
    mxOpenMCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'multi change reminder',
      })
    },
    mxOpenDDialog() {
      let confirmMessage = 'Are you sure you want to discontinue all the selected reminders?'
      if (this.daSelectedRemForDiscontinue.length === 0) {
        confirmMessage = 'No reminder selected. Please select at least one reminder.'
      }

      this.$confirm(confirmMessage, 'Multi discontinue', {
        confirmButtonText: 'Discontinue',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          if (this.daSelectedRemForDiscontinue.length > 0) {
            this.daSelectedRemForDiscontinue.forEach((row) => {
              ormRem.sendDiscontinueDataToServer(row.id, row.uuid, null)
            })
          }
          console.log('daSelectedRemForDiscontinue=====>', this.daSelectedRemForDiscontinue)
        })
        .catch(() => {
          console.log('multi discontinue cancelled')
        })
    },
    mxOpenXCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'discontinued reminders',
      })
    },
    mxOpenCCtInCl(pORMDataRowID) {
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
      const payload = { searchTerm: 'change reminder', pPropsToGiveToCt: pORMDataRowID }
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', payload)
    },
    mxOpenDPrompt(pORMDataRowID) {
      const arResultsFromORM = ormRem.find(pORMDataRowID)

      this.$prompt(arResultsFromORM.remDesc, 'Discontinue reminder', {
        confirmButtonText: 'Discontinue',
        cancelButtonText: 'Cancel',
        inputPlaceholder: 'Enter discontinue note',
      })
        .then(({ value }) => {
          const status = ormRem.sendDiscontinueDataToServer(
            pORMDataRowID,
            arResultsFromORM.uuid,
            value
          )
          console.log('discontinue status ======> ', status)
        })
        .catch(() => {
          console.log('Discontinue cancelled')
        })
    },
    mxHandleSelectionForDiscontinue(val) {
      this.daSelectedRemForDiscontinue = val
    },
  },
}
