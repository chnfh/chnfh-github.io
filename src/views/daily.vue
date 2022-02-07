<template>
  <div class="daily">
      <div class="line">
          <div class="line-left"><el-progress :percentage="this.dailyAll"   ></el-progress></div>
          <div class="line-right"><small>距总量1000 | 当前总量为 {{this.$store.state.tableData.length}}</small></div>
      </div>
      <div class="line">
          <div class="line-left"><el-progress :percentage="this.addAll"></el-progress></div>
          <div class="line-right"><small>每日新增单词15个 | 当前新增{{this.$store.state.dailyData.addWord}}</small></div>
          
      </div>
      <div class="line">
          <div class="line-left"><el-progress :percentage="this.reviewAll"></el-progress></div>
          <div class="line-right"><small>每天复习总量100+100 | {{this.$store.state.dailyData.todayAllTest}}</small></div>
      </div>
      <div class="line">
          <div class="line-left"><el-progress :percentage="this.successAll"></el-progress></div>
          <div class="line-right"><small>正确率</small></div>
      </div>
      <br><br>
      <div class="line">
          <el-progress type="dashboard" :percentage="+this.$store.state.dailyData.weekPoint+Number(this.$store.state.dailyData.dayPoint)*100/21">
    <template #default="{ }">
      <span class="percentage-value">{{ +this.$store.state.dailyData.weekPoint+Number(this.$store.state.dailyData.dayPoint) + '分'}}</span>
    </template>
  </el-progress>
  <small>满分15分,本周应获得{{(+this.$store.state.dailyData.weekPoint+Number(this.$store.state.dailyData.dayPoint))/3+'元'}}</small>
          <div class="line-right" style="margin-top:4.5vh"><el-button type="success" @click="update">提交</el-button></div>
      </div>
      
  </div>
  
</template>

<script>
import axios from 'axios'
  export default {
      data() {
          return {
              dailyAll:this.$store.state.tableData.length/1000, 
              addAll:Number(((Number(this.$store.state.dailyData.addWord)/15)*100).toFixed(1)),
              reviewAll:Number(((Number(this.$store.state.dailyData.todayAllTest)/200)*100).toFixed(1)) ,
              successAll:Number( (Number(this.$store.state.dailyData.todaySuccess)/Number(this.$store.state.dailyData.todayAllTest)*100).toFixed(2)),
          }
      },
    methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`
      },
      update() {

        this.$alert(`经结算,今日分数为${(this.addAll/100 >= 1 ? 1 : this.addAll/100)+(this.reviewAll/100 >= 1 ? 1 : this.reviewAll/100)+
        (this.successAll >= 80 ? 1 : (this.successAll >= 60 ? 0.5 : 0))
        }（总分3分）`, '结算分数', {
          confirmButtonText: '确定分数',
          callback: () => {
            this.$message({
              type: 'success',
              message: `分数提交成功-本周分数为 ${this.$store.state.dailyData.weekPoint+this.$store.state.dailyData.dayPoint}`,
            })
            this.$store.state.dailyData.dayPoint = (this.addAll/100 >= 1 ? 1 : this.addAll/100)+(this.reviewAll/100 >= 1 ? 1 : this.reviewAll/100)+
        (this.successAll >= 80 ? 1 : (this.successAll >= 60 ? 0.5 : 0))
        localStorage.setItem('dayPoint', this.$store.state.dailyData.dayPoint);
        //localStorage.setItem('weekPoint', this.$store.state.dailyData.weekPoint+this.$store.state.dailyData.dayPoint);
          }
        })
      },
      autoUpdate(){
            this.$store.state.dailyData.dayPoint = (this.addAll/100 >= 1 ? 1 : this.addAll/100)+(this.reviewAll/100 >= 1 ? 1 : this.reviewAll/100)+
        (this.successAll >= 80 ? 1 : (this.successAll >= 60 ? 0.5 : 0))
        localStorage.setItem('dayPoint', this.$store.state.dailyData.dayPoint);
        //localStorage.setItem('weekPoint', this.$store.state.dailyData.weekPoint+this.$store.state.dailyData.dayPoint);
      }
    },
    mounted() {
        this.autoUpdate()
        if (this.$store.state.tableData.length != 0) {
        console.log(this.$store.state.tableData);
        this.tableData = this.$store.state.tableData
      }else{
        axios.get(`http://localhost:3000/words`).then((result) => {
        this.tableData = result.data
        this.$store.state.tableData = result.data
        console.log("daily");
        //console.log(this.$store.state.tableData);
			})
      }
      

    },
  }
</script>

<style lang="scss" scoped>
    .daily{
        margin-top: 15%;
        margin-left: 25%;
        width: 50vw;
        .line {
            height: 30px;
            width: 40vw;
        }
        .line-left {
            width: 30vw;
            float: left;
        }
        .line-right{
            float: right;
        }
    }
</style>