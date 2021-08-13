<template>
  <div class="full_box">
    <div class="page">

      <div class="test">

        <h1>词汇测试</h1>

        <div class="show">
          <div v-if="un_finish_flag">
            <h1>{{ word }}</h1>
            <h1>{{ translation }}</h1>
          </div>
          <div v-else>
            <h1>~恭喜你完成了词汇量测试~</h1>
            <h1>词汇量：{{ vocabulary }}</h1>
          </div>
        </div>

        <div style="margin-top: 30px">
          <el-button :disabled="start_flag" @click="start"> 开始测试</el-button>
          <el-button :disabled="know_flag" type="primary" @click="know"> 认识</el-button>
          <el-button :disabled="unKnow_flag" type="warning" @click="unKnow"> 不认识</el-button>
          <el-button type="success" @click="reload"> 再来一遍</el-button>
          <el-button :disabled="!un_finish_flag" type="primary" @click="submit"> 提交</el-button>
        </div>

      </div>

    </div>

    <h2>已测试{{ count }}个单词</h2>
    <h3>得到较准确的结果至少需要测试 {{ min_word }} 个单词</h3>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "test_page" ,
  data () {
    return {
      // 存放单词的id
      id: '' ,
      // 存放返回的单词
      word: '' ,
      // 单词的中文意思
      translation: '' ,
      // 判断是否认识该单词
      isKnow: '' ,
      // 统计已测试单词次数
      count: 0 ,
      // 得到结果的最小单词数
      min_word: 40 ,
      // 开始测试按钮标志
      start_flag: false ,
      // 认识测试按钮标志
      know_flag: true ,
      // 不认识测试按钮标志
      unKnow_flag: true ,
      // 完成标志
      un_finish_flag: true ,
      // 词汇量
      vocabulary: '' ,
      // 线上环境
      online_url: '47.106.90.16' ,
      // 开发环境
      dev_url: "http://localhost:8081" ,
      // 根据不同环境替换成不同地址
      url: "localhost" ,

    }
  } ,
  methods: {
    // 播放单词音频
    playAudio () {
      let audio = new Audio()
      audio.src = 'https://media-audio1.baydn.com/us/' +
          this.word.slice( 0 , 1 ) + '/' +
          this.word.slice( 0 , 2 ) + '/' +
          this.word + '.mp3'
      audio.play()
    } ,
    /**
     * 提交当前检测完的单词信息
     */
    post_word () {
      // 变量存储单词信息
      let post_body = {
        id: this.id ,
        word: this.word ,
        isKnow: this.isKnow ,
        count: this.count
      }
      // post提交单词信息
      this.$axios.post( "http://localhost:8081/returnWord" , post_body )
          .catch( function ( error ) {
            console.log( error )
          } )
    } ,

    /**
     * 完成测试，请求后台计算词汇量并返回结果
     */
    submit () {
      axios.get( 'http://localhost:8081/getResult' )
          .then( resp => (
              console.log( "返回词汇量" ),
                  this.vocabulary = resp.data,
                  console.log( this.vocabulary ),
                  this.know_flag = true,
                  this.unKnow_flag=true,
                  this.un_finish_flag = false
          ) )
          .catch( function ( error ) {
            console.log( error )
          } )
    }
    ,
    /**
     * 根据当前索引对单词进行查询
     * @param count
     */
    get_word ( count ) {
      this.$axios.get( 'http://localhost:8081/queryByCount/' + count )
          .then( resp => (
              //更新word和translation
              this.id = resp.data.id,
                  this.translation = resp.data.translation,
                  this.word = resp.data.word,
                  // 查询完毕之后 播放单词的音频
                  this.playAudio()
          ) )
          // 有异常则输出日志
          .catch( function ( error ) {
            console.log( error )
          } )
    } ,

    /**
     * 展示测试单词的信息
     */
    show () {
      console.log( "id=" , this.id );
      console.log( "word=" , this.word );
      console.log( "isKnow=" , this.isKnow );
    } ,

    /**
     * 更新已测试单词数count
     */
    next () {
      this.count++;
      console.log( "count:" + this.count )
    } ,
    /**
     * 开始测试
     */
    start () {
      this.$axios.get( 'http://localhost:8081/Start' )
      this.get_word( 0 );
      // 改变开始测试按钮的flag值
      this.start_flag = true;
      this.know_flag = false;
      this.unKnow_flag = false;
    } ,
    /**
     * 再来一次（重新刷新页面缓存）
     */
    reload () {
      location.reload();
    } ,

    /**
     * 认识
     */
    know () {
      // 修改添加标志
      this.isKnow = 1;
      // 把上一个单词提交回去
      this.post_word()
      // 输出返回的单词信息
      this.show()
      // 单词次数累加
      this.next();
      // 根据count从后端请求一条数据
      this.get_word( this.count )
    } ,
    /**
     * 不认识
     */
    unKnow () {
      //不认识
      this.isKnow = 0;
      //把上一个单词提交回去
      this.post_word()
      //输出返回的单词信息
      this.show()
      // 单词次数累加
      this.next();
      // 根据count从后端请求一条数据
      this.get_word( this.count )
    } ,
  } ,
  created () {

  }
}
</script>

<style scoped>
.full_box {
  background-color: #f2f3f6;
  position: fixed;
  margin-top: -60px;
  width: 100%;
  height: 100%;
}

.page {
  background-color: white;
  margin-top: 5%;
  margin-left: 15%;
  margin-right: 15%;
  width: 70%;
  height: 70%;
  padding-top: 20px;
  border-radius: 20px;

}

.test {

}

.show {
  padding-top: 20%;
  background-color: white;
  margin-left: 20%;
  margin-right: 20%;
  width: 60%;
  height: 300px;
  border-radius: 20px;
}
</style>