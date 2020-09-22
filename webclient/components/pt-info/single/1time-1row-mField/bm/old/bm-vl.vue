<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Body measurement</span>
        <el-button-group style="float: right">
          <el-button
            style="padding: 3px"
            type="success"
            plain
            tabindex="-1"
            class="el-icon-circle-plus-outline"
          ></el-button>
          <el-button style="padding: 3px" type="primary" plain tabindex="-1">M</el-button>
          <el-button
            style="padding: 3px"
            type="warning"
            plain
            tabindex="-1"
            class="el-icon-document-delete"
          ></el-button>
          <el-button
            style="padding: 3px"
            type="info"
            plain
            tabindex="-1"
            class="el-icon-delete"
          ></el-button>
        </el-button-group>
      </div>
      <el-table :data="daTable" :show-header="false" style="width: 100%">
        <el-table-column prop="description" label="Description" width="180"> </el-table-column>
        <el-table-column prop="createdAt" label="Created At" width="180"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      daTable: [
        {
          createdAt: '190 lbs',
          description: 'Weight',
        },
        {
          createdAt: '5\' 8"',
          description: 'Height',
        },
        {
          createdAt: '40 inches',
          description: 'Waist circumference',
        },
      ],
    }
  },
}
</script>
