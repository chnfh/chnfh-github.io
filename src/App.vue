<template>
  <div class="app">
    <div class="nav">
      <el-menu
        :default-active="getActiveIndex()"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
      >
        <el-menu-item index="1" route="/" @click="this.renewActiveIndex(1)">单词</el-menu-item>
        <el-menu-item index="2" route="/addWords" @click="this.renewActiveIndex(2)">添加单词</el-menu-item>
        <el-menu-item index="3" route="/test" @click="this.renewActiveIndex(3)" >检测</el-menu-item>
        <el-menu-item index="4" route="/daily" @click="this.renewActiveIndex(4)">完成情况</el-menu-item>
        <el-menu-item index="5" route="/about" @click="this.renewActiveIndex(5)" >任务目标</el-menu-item>
      </el-menu>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
    <div class="footer">footer</div>
  </div>
  
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      //activeIndex: "1", // 导航栏默认值
      los:{},
    };
  },
  methods: {
    getActiveIndex(){
      if (sessionStorage.getItem('activeIndex')) {
       return sessionStorage.getItem('activeIndex')
      }else{
        return  "1"
      }
      
    },
    renewActiveIndex(index){
      sessionStorage.setItem('activeIndex', `${index}`);
    }
  },
  mounted() {
    let d = new Date;
    if (localStorage.getItem('today') != d.getDate()) {
        this.$store.state.dailyData.weekPoint = localStorage.getItem('dayPoint') + localStorage.getItem('weekPoint')
        localStorage.setItem('weekPoint', this.$store.state.dailyData.weekPoint);
        this.$store.state.dailyData.dayPoint = 0
      axios.get(`http://localhost:3000/daily`).then((result) => {
        this.los = result.data
        console.log(this.los);
        setTimeout(() => {
          axios({
					method: 'patch',
					url: `http://localhost:3000/daily`,
					data: {
						todayAllTest: Number(this.los.todayAllTest += Number(localStorage.getItem('todayAllTest'))) ,
            todaySuccess: Number(this.los.todaySuccess += Number(localStorage.getItem('todaySuccess'))) ,
            yesterdayAllTest : Number(localStorage.getItem('todayAllTest')),
            yesterdaySuccess : Number(localStorage.getItem('todaySuccess')),
					}
					})
          setTimeout(() => {
            localStorage.setItem('todayAllTest', 0);
            localStorage.setItem('todaySuccess', 0);
            localStorage.setItem("addWord" , 0)
            localStorage.setItem('today',d.getDate())
            localStorage.setItem('toWeek',d.getDay())
            localStorage.setItem('dayPoint', 0);
          },);
        }, 1000);
      })
    }else{
      this.$store.state.dailyData.todayAllTest = localStorage.getItem('todayAllTest')
      this.$store.state.dailyData.todaySuccess = localStorage.getItem('todaySuccess')
      this.$store.state.dailyData.addWord = localStorage.getItem('addWord')
    }
    if (localStorage.getItem('toWeek') == 6) {
      localStorage.setItem('toWeek',7)
      this.$store.state.dailyData.weekPoint = 0
    }
  },
  
};
</script>

<style scoped>

</style>

<style lang="scss" scoped>
   .nav {
  padding: 0px 50px;
}
.body {
  padding: 10px 50px;
}
.footer {
  padding: 10px 50px;
  position: absolute;
  height: 20px;
  bottom: 0px;
  background-color: red;
}
</style>