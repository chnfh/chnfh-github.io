
<template>
  <div class="body">
    
    
    <div class="son" >
      单词:&nbsp;&nbsp;<el-input id="goInput" @focus="this.getNow()" placeholder="请输入单词" v-model="inputWord" clearable style="width:200px"></el-input><br><br>
      词意:&nbsp;&nbsp;<el-input @focus="this.getNow()" placeholder="请输入词意" v-model="inputMean" clearable style="width:200px" @keyup.enter="notice()"></el-input><br><br>
      日期:&nbsp;&nbsp;<el-input :placeholder="now" v-model="now" :disabled="true" style="width:200px"></el-input><br><br>
      <el-button type="success" plain style="margin-left:185px" @click="notice()" >提交</el-button>
    </div>
  
      
      
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import axios from 'axios'

  export default defineComponent({
    data() {
      return {
        inputWord:'',
        inputMean:"",
        now:"", // 粗略当前时间
        detectMap:new Map,
      }
    },
    methods: {
      getNow(){
        let test= new Date();
        this.now = test.getFullYear()+"/"+(test.getMonth()+1)+"/"+test.getDate()+" "+test.getHours()+":"+test.getMinutes()
      },
      // addWords(){
      //   alert(this.inputWord+this.inputMean)
      // },
      notice(){
        if (this.inputWord.length > 0 && this.inputMean.length > 0) {
          this.$notify({
          title: '单词添加成功',
          message: this.inputWord+"-"+this.inputMean,
          position: 'top-left',
          showClose: false,
          type: 'success',
        })
        setTimeout(() => {
          this.inputMean=''
          this.inputWord=''
          document.getElementById('goInput').focus()
        }, 1000);
        axios({ // 添加单词
					method: 'post',
					url: `http://localhost:3000/words`,
					data: {
						word: this.inputWord.trim(),
						mean: this.inputMean.trim(),
            allTesting:0,
            successTesting:0,
            entryDate:this.now
					}
					});
          setTimeout(() => { // 微任务判断是否重复
					axios.get(`http://localhost:3000/words`).then((result) => {
					console.log(result.data);
					let words = result.data
					for (let i = 0; i < words.length; i++) {
						this.detectMap.set( words[i].word , i)
						//console.log(this.words[i].word);
					}
					if (this.detectMap.size < words.length) {
						let getDelete = confirm('单词重复收录，是否删除')
						let len = words.length
						if(getDelete){
							axios.delete(`http://localhost:3000/words/${len}`)
							alert('删除成功')
							location.reload()
						}
					}else{
            this.$store.state.dailyData.addWord = localStorage.getItem('addWord')
            localStorage.setItem('addWord',++this.$store.state.dailyData.addWord);
          }
					})
				}, 1000);
        }else{
          alert("!!!单词或词意没有正确输入,请重新输入正确的单词和词意")
        }
        }
    },
    mounted() {
      this.getNow()
      if (this.$store.state.tableData.length != 0) {
        console.log(this.$store.state.tableData);
        this.tableData = this.$store.state.tableData
      }else{
        axios.get(`http://localhost:3000/words`).then((result) => {
        this.tableData = result.data
        this.$store.state.tableData = result.data
        console.log("add");
        //console.log(this.$store.state.tableData);
			})
      }
    },
  })
</script>

<style lang="scss" scoped>
  .body {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: no-repeat right /40% url("../../public/bac.jpg");
  }

.son {
  margin-right: 10%;
}
</style>
