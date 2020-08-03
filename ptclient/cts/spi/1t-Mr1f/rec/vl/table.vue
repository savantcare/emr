<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Recommendations</span>
        <el-button-group style="float: right;">
          <el-button style="padding: 3px;" type="success" plain tabindex="-1">A</el-button>
          <el-button style="padding: 3px;" type="primary" plain tabindex="-1">M</el-button>
          <el-button style="padding: 3px;" type="warning" plain tabindex="-1">D</el-button>
          <el-button style="padding: 3px;" type="info" plain tabindex="-1">X</el-button>
        </el-button-group>
      </div>
      <el-table :data="daTable" style="width: 100%;" :show-header="false">
        <el-table-column prop="description" label="Description" width="180"> </el-table-column>
        <el-table-column prop="createdAt" label="CreatedAt" width="180"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import ormCTLifeCycle from '@/cts/core/ctMaster/orm-ct-life-cycle'
export default {
  data() {
    return {
      daTable: [],
    }
  },
  // activated lifecycle hook, is called whenever a keep-alive component is activated.
  // Ref: https://stackoverflow.com/questions/46974234/vue-router-keep-alive-and-mounted-behavior
  mounted() {
    /* 
    Goal: Check if this Ct was already mounted. 
    Why? If Ct is already mounted I do not want to do 3 things have already happened
        For the description of the 3 things read Line 65,74,83
        For e.g. If I let search.insert happen multiple times then in the search dropdown multiple results will come
    Why not use keepalive?    
        Sorrounding component with keepAlive in pf/_uuid/index.vue does not help. Since previous rendering of rex
        is not hidden. When user types rex 2 times, rex is being displayed 2 times
    */
    const arFromOrm = ormCTLifeCycle.query().where('name', 'Recommendations').get()
    const objRowFromOrm = arFromOrm[0]
    if (typeof objRowFromOrm !== 'undefined') {
      console.log('already mounted')
    } else {
      // Step 1/3: Store information that this Ct has already been mounted
      // I run this before API to server since API to server takes time and during the wait time 2 Ct may end up running
      // This ORM is used by the manage-ptsvl-cards-ct and once the state is set then the existing ct's update their view
      // Step 3/3: Run API to get data from server

      console.log('Done mounting')
    }
  },
}
</script>
