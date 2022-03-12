<template>
  <el-calendar>
  <template #dateCell="{data}">
    <p :class="data.isSelected ? 'is-selected' : ''">
      {{data.day.substr(data.day.indexOf('-',5)+1) }} {{ data.isSelected ? '  ' :
      '' }} 
      <span>
        {{}}
      </span>
    </p>
  </template>
</el-calendar>
</template>

<style lang="scss">
  .is-selected {
    color: #fa192c;
  }
  span{
      color: #fa192c;
    }
</style>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      dailyData:[],
      i:0
    }
  },
  mounted() {
    axios.get(`http://localhost:3000/dailyData`).then((result) => {
      this.dailyData = result.data
      console.log(this.dailyData);
    })
  },
  methods: {
    // isOver(){
      
    //    console.log(this.i++); {{isOver( String(data.day)) ? '&#160; ✔ ' : ''}}

      
    // }
  },
}
</script>