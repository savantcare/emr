<!-- Reference implementation 
Why copy the code to other components and not use mixin?
This is the structure and others are supposed to write their own custom code.
-->
<template>
  <div>
    <h5>Name</h5>
    <!-- Passing name of the fld so mfTypeOfButton can decide if the fld is changed or not -->
    <el-button
      :type="mfTypeOfButton('firstName')"
      plain
      :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1"
      >{{ cfDataRow['firstName'] }}</el-button
    >
    <el-button :type="mfTypeOfButton('middleName')" plain>{{ cfDataRow['middleName'] }}</el-button>
    <el-button :type="mfTypeOfButton('lastName')" plain>{{ cfDataRow['lastName'] }}</el-button>
    <el-button
      type="primary"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(cfDataRow['id'])"
      >C</el-button
    >
    <el-button
      v-if="daIsDataFldsOfRowsSame !== true"
      type="success"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfSendSubmitEvent()"
      >S</el-button
    >
    <el-button
      v-if="daIsDataFldsOfRowsSame !== true"
      type="danger"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfSendResetFormEvent()"
      >R</el-button
    >
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'
import orm from '../db/orm.js'
import mxTable from './table-mixin'
export default {
  mixins: [mxFullSyncWithDbServer, mxTable],
  data() {
    return {
      /* This helps stopping race conditions. We do not want to run certain functions till the time data has finished loading.  
          JS is single threaded. But still a function B called After function A can execute before function A ends.
          Ref: https://www.youtube.com/watch?v=8aGhZQkoFbQ
      */
      isMounted: false,
      /* This Ct has 3 flds. This helps deciding which fld to show in orange color.
      Also helps deciding if submit and reset options should be shown */
      daIsDataFldsOfRowsSame: true,
    }
  },
  computed: {
    /*
      This is required for tab indexing
      if this card is in pos 0 then tab index is set as 1
      if this card is in pos 1 then tab index is set as 101
      So the first card on ptsVl will get tabIndex as 1
      So the 2nd card on ptsVl will get tabIndex as 101
      So when the user presses tab
        first Card 1 will focus
        2nd the card 2 will focus
      */
    cfPosInArCardsInPtsOfVl() {
      if (!this.isMounted) return false
      const arOfCardsInPtsOfVl = this.$store.state.vstObjCardsInPtsOfVl.arOfCardsInPtsOfVl
      const obj = arOfCardsInPtsOfVl.find((x) => x.label === 'name')
      const idx = arOfCardsInPtsOfVl.indexOf(obj)
      return idx
    },
  },
  methods: {
    mfOpenCCtInCl(pOrmId) {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'name - change',
      })
    },
  },
}
</script>
