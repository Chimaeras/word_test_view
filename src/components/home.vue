<template>
  <div class="full_box">
    <div class="centre_box">
      <el-button type="success">登录</el-button>
      <br>
      <el-image :src="require('../assets/img.png')"></el-image>
      <br>
      <span style="font-size: x-large">了解一下自己的英语水平吧~</span>

      <el-container style="margin-bottom: 5%;margin-top: 5%">
        <div class="content_box" >
          <div class="content">
            <h1><i class="el-icon-notebook-2"></i>阅读词汇量</h1>
            <el-button type="success" style="border-radius: 20px" @click="to_test_page">
              开始测试
              <i class="el-icon-arrow-right"></i>
            </el-button>
            <h2>快来测一下自己的单词量吧~</h2>
          </div>
        </div>
      </el-container>

      <el-container style="margin-bottom: 5%;margin-top: 5%">
        <div class="content_box" >
          <div class="content">
            <h1><i class="el-icon-headset"></i>听力词汇量</h1>
            <el-button type="success" style="border-radius: 20px">
              开始测试
              <i class="el-icon-arrow-right"></i>
            </el-button>
            <h2>听懂英语的基础哦，去试试看吧~</h2>
          </div>
        </div>
      </el-container>

      <el-container style="margin-bottom: 5%;margin-top: 5%">
        <div class="content_box" >
          <div class="content">
            <h1><i class="el-icon-headset"></i>听力词汇量</h1>
            <el-button type="success" style="border-radius: 20px">
              开始测试
              <i class="el-icon-arrow-right"></i>
            </el-button>
            <h2>听懂英语的基础哦，去试试看吧~</h2>
          </div>
        </div>
      </el-container>
    </div>
  </div>
</template>

<script>

export default {
  name: "home" ,
  data () {
    return {
      fullHeight: document.documentElement.clientHeight
    }
  } ,
  methods: {
    to_test_page () {
      console.log( "跳转" );
      this.$router.push( '/test_page' );
    } ,
    get_bodyHeight () {//动态获取浏览器高度
      const that = this
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          that.fullHeight = window.fullHeight
        })()
      }
    }
  } ,
  watch: {
    fullHeight ( val ) {//监控浏览器高度变化
      if ( !this.timer ) {
        this.fullHeight = val
        this.timer = true
        let that = this
        setTimeout( function () {
          that.timer = false
        } , 400 )
      }
    }
  } ,
  mounted () {
    this.get_bodyHeight()
  }
}
</script>

<style scoped>

/*全局背景样式*/
.full_box {
  background-color: white;
  /*background-color: #C7C6C6;*/
  position: fixed;
  width: 100%;
  height: 100%;
}

.centre_box {
  background-color: white;
  margin-left: 25%;
  margin-right: 25%;
  position: fixed;
  /*background-color: #d7d7d7;*/
  width: 50%;
  height: 700px;
  border-radius: 20px;

}

.content_box {
  background-color: rgba(73, 200, 157, 0.08);
  /*background-color: #e0ffd7;*/
  margin-left: 10%;
  margin-right: 10%;
  width: 80%;
  height: 200px;
  border-radius: 20px;
  size: A3;
}

.content {
  margin-top: 10px;
  margin-left: 20px;
}

</style>