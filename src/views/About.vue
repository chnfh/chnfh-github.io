<template>
  <div class="body">
    <div class="left">
      <div class="leftContent">
        <div class="leftHeader">
          <div class="leftHeaderSon">1</div>
          <div class="leftHeaderSon">1</div>
          <div class="leftHeaderSon">1</div>
          <div class="leftHeaderSon">1</div>
        </div>
        <div class="leftContentBody">
          <div class="lcbHeader">
            <div class="lcbHeaderSon">日</div>
            <div class="lcbHeaderSon">一</div>
            <div class="lcbHeaderSon">二</div>
            <div class="lcbHeaderSon">三</div>
            <div class="lcbHeaderSon">四</div>
            <div class="lcbHeaderSon">五</div>
            <div class="lcbHeaderSon">六</div>
          </div>
          <div class="lcbBody">
            <div
              class="lcbBodySon"
              v-for="item in [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
                35,
              ]"
              :key="item.index"
            >
              {{ item }}
            </div>
          </div>
          <div class="lcbFooter">
            <div class="lcbFooterBody">
              
              <a-divider orientation="left" class="correct">
              <label>--正常 </label>
            </a-divider>
            <a-divider orientation="left" class="warning">
              <label>--未完成 </label>
            </a-divider>
            <a-divider orientation="left" class="error">
              <label>--无 </label>
            </a-divider>
            <a-divider orientation="left" class="empty">
              <label>--空 </label>
            </a-divider>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="rightHeader">
        rightHeader
      </div>
      <div class="rightBody">
        <span>2022-3-13 星期日</span>
      </div>
      <div class="rightFooter">
        rightFooter
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.body {
  background-color: aliceblue;
  height: 89vh;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  padding: 10px;
  .left {
    float: left;
    width: 75%;
    height: 100%;
    background-color: antiquewhite;
    border-radius: 10px;
    .leftContent {
      margin: 24px;
      background-color: aliceblue;
      height: 85%;
      .leftHeader {
        text-align: center;
        background-color: aquamarine;
        height: 10%;
        display: flex;
        flex: 0 1 auto;
        justify-content: flex-start;
        .leftHeaderSon {
          margin-left: 12%;
          background-color: aqua;
          padding-top: 18px;
        }
      }
      .leftContentBody {
        background-color: brown;
        padding: 12px;
        height: 100%;
        .lcbHeader {
          height: 12%;
          background-color: azure;
          display: flex;
          justify-content: center; //子元素水平居中
          align-items: center;
          .lcbHeaderSon {
            text-align: center;
            margin: 0 6px;
            width: 12%;
            border: 1px red solid;
          }
        }
        .lcbBody {
          height: 80%;
          background-color: wheat;
          display: flex;
          //justify-content:center;  //子元素水平居中
          //align-items:center;
          justify-content: center;
          align-content: flex-start;
          flex-wrap: wrap;
          .lcbBodySon {
            flex: 1;
            width: 12%;
            min-width: 12%;
            max-width: 12%;
            margin: 0 6px;
            height: 20%;
            text-align: center;
            //margin: 0 6px;
            // width: 12%;
            // height: 12%;
            border: 1px aquamarine solid;
          }
        }

        .lcbFooter {
          height: 8%;
          background-color: aquamarine;
          .lcbFooterBody{
            float: right;
            margin-top: 12px;
          }
          .correct label {
            color: rgba(0, 0, 0, 0.85);
            font-size: 14px;
            &::before {
              display: inline-block;
              width: 10px;
              height: 10px;
              background: #02ec35;
              content: "";
              vertical-align: -1px;
              margin-right: 10px;
            }
          }

          .warning label {
            color: rgba(0, 0, 0, 0.85);
            font-size: 14px;
            &::before {
              display: inline-block;
              width: 10px;
              height: 10px;
              background: #c97911;
              content: "";
              vertical-align: -1px;
              margin-right: 10px;
            }
          }

          .error label {
            color: rgba(0, 0, 0, 0.85);
            font-size: 14px;
            &::before {
              display: inline-block;
              width: 10px;
              height: 10px;
              background: #ff0101;
              content: "";
              vertical-align: -1px;
              margin-right: 10px;
            }
          }

          .empty label {
            color: rgba(0, 0, 0, 0.85);
            font-size: 14px;
            &::before {
              display: inline-block;
              width: 10px;
              height: 10px;
              background: #646464;
              content: "";
              vertical-align: -1px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
  .right {
    float: right;
    width: 24%;
    height: 100%;
    background-color: rosybrown;
    border-radius: 10px;

    .rightHeader{
      background-color: #c97911;
      width: 60%;
      height: 35%;
    }
    .rightBody{
      background-color: #ff0101;
      width: 60%;
      height: 35%;
    }
    .rightFooter{
      background-color: #3a3a3a6c;
      width: 60%;
      height: 30%;
    }
  }
}
</style>

<script>
//import axios from 'axios'
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>