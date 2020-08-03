<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          placeholder="First name"
          :value="mfGetField(1, 'firstName')"
          @input="mfSetFieldUsingCache($event, 1, 'firstName')"
        >
        </el-input>
        <!-- This gives a error in the console 
          Invalid prop: type check failed for prop "value". Expected String, Number, got Boolean with value false.
        -->
        <el-input
          placeholder="Middle name"
          :value="mfGetField(1, 'middleName')"
          @input="mfSetFieldUsingCache($event, 1, 'middleName')"
        ></el-input>
        <el-input
          placeholder="Last name"
          :value="mfGetField(1, 'lastName')"
          @input="mfSetFieldUsingCache($event, 1, 'lastName')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="mfOnSubmit">Submit</el-button>
        <el-button type="warning" plain @click="mfResetForm">Reset form</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import fullSyncWithServerDBMixin from '../db/full-sync-with-server-db-mixin'
import ormName from '../db/orm-name.js'
export default {
  mixins: [fullSyncWithServerDBMixin],
  data() {
    return {
      mounted: false,
    }
  },
  async mounted() {
    if (ormName.query().count() > 0) {
    } else {
      await this.getDataFromDBMx()
    }
    this.mounted = true
  },
  methods: {
    mfOnSubmit() {},
    mfResetForm() {
      // The original data is no longer on the client side hence I have to fetch the data from the server
      this.getDataFromDBMx()
      // the rowStatus has cached the data so I need to remove the cache from row status
      ormName.arOrmRowsCached = []
    },
    mfGetField(pOrmRowId, pFieldName) {
      /* 
      Even before Ct is mounted this fn starts getting called for each field. 
      Putting a gate here keeps the system optimized
      Without the gate with a debugger statment placed inside getField this function was called 3 times
      even before the data came from the server and got loaded into the ORM.
      */
      if (!this.mounted) return false
      const value = ormName.getField(pOrmRowId, pFieldName)
      return value
    },
    mfSetFieldUsingCache(pEvent, pOrmRowId, pFieldName) {
      /*
      For reason of this gate see comment for mfGetField in this file
      */
      if (!this.mounted) return false
      const rowStatus = 24 // 2 is new on client and 4 is changed on client
      ormName.setField(pEvent, pOrmRowId, pFieldName, rowStatus)
      this.$forceUpdate() // Not able to remove it. For the different methods tried read: cts/core/rowstatus.js:133/putFieldValueInCache
    },
  },
}
</script>
