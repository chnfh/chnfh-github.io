<template>
  <el-table :data="this.$store.state.tableData" style="width: 100%"  height="860" stripe>
    <el-table-column type="expand" >
      <template #default="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="单词ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="总检测次数">
            <span>{{ props.row.allTesting }}</span>
          </el-form-item>
          <el-form-item label="单词" >
            <span>{{ props.row.word }}</span>
          </el-form-item>
          <el-form-item label="正确次数">
            <span>{{ props.row.successTesting }}</span>
          </el-form-item>
          <el-form-item label="单词词意">
            <span>{{ props.row.mean }}</span>
          </el-form-item>
          <el-form-item label="正确率">
            <span>{{ +props.row.successTesting/+props.row.allTesting*100+"%" }}</span>
          </el-form-item>
          <el-form-item label="录入日期">
            <span>{{ props.row.entryDate }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="ID" prop="id"> </el-table-column>
    <el-table-column label="单词" prop="word"> </el-table-column>
    <el-table-column label="词意" prop="mean"> </el-table-column>
    
  </el-table>
  
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        // tableData: []
      }
    },
    
    methods: {
    },
    mounted() {
      if (this.$store.state.tableData.length != 0) {
        console.log(this.$store.state.tableData);
        this.tableData = this.$store.state.tableData
      }else{
        axios.get(`http://localhost:3000/words`).then((result) => {
        this.tableData = result.data
        this.$store.state.tableData = result.data
        console.log("Home");
        //console.log(this.$store.state.tableData);
			})
      }
    },
  }
</script>
<style >
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>