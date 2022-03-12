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
    <div class="footer">不管前方的路有多苦，只要走的方向正确，不管多么崎岖不平，都比站在原地更接近幸福。                          -- 宫崎骏 《千与千寻》</div>
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
      axios.get(`http://localhost:3000/daily`).then((result) => {
        console.log(1);
        this.los = result.data
        console.log(this.los);
          axios({
					method: 'patch',
					url: `http://localhost:3000/daily`,
					data: {
						todayAllTest: Number(this.los.todayAllTest += Number(localStorage.getItem('todayAllTest'))) ,
            todaySuccess: Number(this.los.todaySuccess += Number(localStorage.getItem('todaySuccess'))) ,
            yesterdayAllTest : Number(localStorage.getItem('todayAllTest')),
            yesterdaySuccess : Number(localStorage.getItem('todaySuccess')),
					}
					}).then(() => {
            console.log(2);
           axios({
					method: 'post',
					//url: `http://localhost:3000/dailyData`,
          url: `http://localhost:3000/monthDatas/${localStorage.getItem('yesterYearDate')}/day`,
					data: {
            id:localStorage.getItem('yesterdayDate'),
            monthDataId: localStorage.getItem('yesterYearDate'),
            allTest: Number(localStorage.getItem('todayAllTest')),
            successTest: Number(localStorage.getItem('todaySuccess')),
            addWord:Number(localStorage.getItem('addWord')),
					}
      }).then(() => {
        console.log(3);
        localStorage.setItem('toWeek',d.getDay())
            if (localStorage.getItem('toWeek') == 1) {
                localStorage.setItem('toWeek',7)
                localStorage.setItem('weekPoint',0)
                this.$store.state.dailyData.weekPoint = 0 
                localStorage.setItem('dayPoint', 0);
               // location.reload()
            }else{
              console.log(4);
              this.$store.state.dailyData.weekPoint = Number(localStorage.getItem('dayPoint')) + Number(localStorage.getItem('weekPoint'))
              localStorage.setItem('weekPoint', this.$store.state.dailyData.weekPoint);
              localStorage.setItem('todayAllTest', 0);
              localStorage.setItem('todaySuccess', 0);
              localStorage.setItem("addWord" , 0)
              localStorage.setItem('today',d.getDate())
              localStorage.setItem('dayPoint', 0);
            } 
      })
          })
      })
          
        
    }else{
      this.$store.state.dailyData.todayAllTest = localStorage.getItem('todayAllTest')
      this.$store.state.dailyData.todaySuccess = localStorage.getItem('todaySuccess')
      this.$store.state.dailyData.addWord = localStorage.getItem('addWord')
      this.$store.state.dailyData.weekPoint = localStorage.getItem('weekPoint')
      localStorage.setItem('yesterYearDate' , d.getFullYear()+"-"+(d.getMonth()+1))
      localStorage.setItem('yesterdayDate' , d.getDate())
    }
    
      
      

},
}
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
}
</style>