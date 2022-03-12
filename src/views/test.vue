
<template>
    <div class="test">
        <div class="button">
            <el-row>
                <el-button type="primary" round @click="setRandomWords(1,this.$store.state.tableData.length)">全部复习</el-button>
                <el-button type="success" round @click="setRandomWords(this.$store.state.tableData.length-15,this.$store.state.tableData.length)">复习15个</el-button>
                 <el-button type="success" round @click="setRandomWords(this.$store.state.tableData.length-35,this.$store.state.tableData.length)">复习35个</el-button>
            </el-row>
        </div>

        <div class="in" v-if="input">
            <h1>{{words.id +" - " +words.mean}}</h1>
            <el-input placeholder="请输入单词" v-model="inputWord" clearable style="width:200px" @keyup.enter="insWords"> </el-input>
            
            <el-switch v-model="autoAudio" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            <button class="src" @click="this.srcR='&type=2',this.srcButton=true" v-if="!srcButton">英音</button>
            <button class="src" @click="this.srcR='&type=1',this.srcButton=false" v-if="srcButton">美音</button>
            <br>
            <audio v-if="autoAudio" autoplay="" name="media"><source :src=this.srcL+words.word+this.srcR type="audio/mpeg"></audio>
            <br>
            <br>
            <small style="margin-left:8vw">今日已检测{{this.$store.state.dailyData.todayAllTest}}个</small>
            <div class="message">
            <small>截止目前方坑好累计输入{{this.daily.todayAllTest}}个,其中正确了{{this.daily.todaySuccess}}个
            。正确率为{{(this.daily.todaySuccess/this.daily.todayAllTest).toFixed(3)*100+'%'}}。</small>
        <h1 v-if="(this.daily.yesterdayAllTest)==0">方坑好昨天偷懒。果然是最坑的人，最坑的人就是方坑好.居然敢偷懒，方坑好就是
            方坑好 方窝害 方抖音 方快手 方蒸米粑 方炒面 方臭脚 方铁手 方面包 方番茄 方小傻 方方便面 方怕黑 方秃头 方嘟嘴 方披头 方臭屁 方辣条 方酒鬼 方乌梅  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! <br>最坑的人居然敢偷懒!不可饶恕
        </h1>
        <small v-if="(this.daily.yesterdayAllTest)!=0">昨天方坑好输入了{{this.daily.yesterdayAllTest}}个,正确了{{this.daily.yesterdaySuccess}}个。
            正确率为{{(this.daily.yesterdaySuccess/this.daily.yesterdayAllTest).toFixed(3)*100+'%'}}</small>
            </div>
        </div>
        
        <!-- <button @click="t">1</button> -->
    </div>
</template>

<style lang="scss" scoped>
    button.src {
        
    }
  .test {
        background: no-repeat left /30% url("../../public/bac.jpg");
        height: 89vh;
        width: 100%;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        border-radius: 10px;
    .button {
        position: relative;
        margin-left: 40%;
        padding-top: 5%;
    }
    .in {
        position: relative;
        margin-left: 40%;
        padding-top: 2%;
    }
    .message {
        margin-top: 25%;
    }
  }
  
 //     background: no-repeat left /30% url("../../public/bac.jpg");
</style>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
    data() {
        return {

            words:{},
            inputWord:'',
            randomNum:0,
            input: false,
            min:0,
            max:0,
            srcL:'https://dict.youdao.com/dictvoice?audio=',
            srcR:'&type=2',
            srcButton:true,
            autoAudio:false,
            daily:{},
            a:0,
            b:0,
        }
    },
    methods: {
           t(){
       
            localStorage.setItem('today',`4`);
       
              },
        insWords(){
            
            if(this.inputWord.trim() === this.words.word){
                ElMessage.success({
                    message: '恭喜你，回答正确',
                    type: 'success',
                })
                axios({
					method: 'patch',
					url: `http://localhost:3000/words/${this.words.id}`,
					data: {
						allTesting: ++this.words.allTesting,
                        successTesting: ++this.words.successTesting
					}
					})
                    let tat = localStorage.getItem('todayAllTest')
                    localStorage.setItem('todayAllTest',++tat);
                    let tas = localStorage.getItem('todaySuccess')
                    localStorage.setItem('todaySuccess',++tas);
                    this.$store.state.dailyData.todayAllTest = localStorage.getItem('todayAllTest')
                    this.$store.state.dailyData.todaySuccess = localStorage.getItem('todaySuccess')
                    setTimeout(() => {
                        this.newRandomWords()
                    }, 1000);
            }else{
                ElMessage.error({
                    message: '答错了，再好好想想~~~',
                    type: 'error',
                })
                axios({
					method: 'patch',
					url: `http://localhost:3000/words/${this.words.id}`,
					data: {
						allTesting: ++this.words.allTesting,
					}
					})
                    let tat = localStorage.getItem('todayAllTest')
                    localStorage.setItem('todayAllTest',++tat);
                    //alert(localStorage.getItem('todayAllTest'))
                    this.$store.state.dailyData.todayAllTest = localStorage.getItem('todayAllTest')
            }
            this.inputWord = ''
            this.autoAudio = false
        },
        setRandomWords(minNum,maxNum){
            this.min = minNum,
            this.max = maxNum
            this.getRandomWords(minNum,maxNum)
        },
        newRandomWords(){
            this.getRandomWords(this.min,this.max)
        },
        getRandomWords(minNum,maxNum){
            this.getRandomNum(minNum,maxNum)
            axios.get(`http://localhost:3000/words/${this.randomNum}`).then((result) => {
                
                this.words = result.data
                this.input = true
            })
            setTimeout(() => {
                this.autoAudio = true   
            },1500);
            
        },
        getRandomNum(minNum,maxNum){
                switch(arguments.length){ 
                    case 1: 
                         
                         if (this.randomNum !== parseInt(Math.random()*minNum+1,10)) {
                             this.randomNum = parseInt(Math.random()*minNum+1,10)
                         }else{
                                this.$notify({
                                title: '警告',
                                message: '随机值与上次一致，一秒后将重新更新，请注意',
                                type: 'warning',
                                })
                                setTimeout(() => {
                                    this.newRandomWords()
                                }, 1000);
                         }
                    break; 
                    case 2: 
                        
                        if (this.randomNum !== parseInt(Math.random()*(maxNum-minNum+1)+minNum,10)) {
                             this.randomNum = parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
                         }else{
                                this.$notify({
                                title: '警告',
                                message: '随机值与上次一致，一秒后将重新更新，请注意',
                                type: 'warning',
                                })
                                setTimeout(() => {
                                    this.newRandomWords()
                                }, 1000);
                         }
                    break; 
                        default: 
                        break; 
                } 
        }
        },
        

    mounted() {
      if (this.$store.state.tableData.length != 0) {
        console.log(this.$store.state.tableData);
        this.tableData = this.$store.state.tableData
      }else{
        axios.get(`http://localhost:3000/words`).then((result) => {
        this.tableData = result.data
        this.$store.state.tableData = result.data
        console.log("test");
        //console.log(this.$store.state.tableData);
			})
      }
      axios.get(`http://localhost:3000/daily`).then((result) => {
        this.daily = result.data
			})
    },
}
</script>
