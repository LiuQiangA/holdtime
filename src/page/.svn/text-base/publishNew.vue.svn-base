<template>
  <div class="publish">
    <div class="message-head"><a href="javascript:history.go(-1)"><i class="icon iconfont icon-fanhui"></i></a>发布消息
      <div class="getMD">
        <span class="getMonth">{{month}}</span>
        <span class="getDay">{{day}}</span>
      </div>
    </div>
    <div class="message-body">
      <div class="message-cont">
        <p class="publish-cont-title">
          <i class="icon iconfont icon-bianji"></i>编辑发布消息</p>
        <div class="publish-cont-form">
          <ul>
            <li class="publish-cont-form-item">
              <label class="publish-cont-label">标题：</label>
              <input class="publish-cont-input" ref="title" type="text" v-model="title" placeholder="请输入标题">
            </li>
            <li class="publish-cont-form-item">
              <label class="publish-cont-label">内容：</label>
              <textarea class="publish-cont-texta" ref="content" type="text" v-model="content" placeholder="请输入内容"></textarea>
            </li>
            <li class="publish-cont-form-item">
              <input class="publish-cont-form-submit" type="submit" @click="publishNew" value="提    交">
            </li>
          </ul>
        </div>
        <p class="publish-cont-title">
          <i class="icon iconfont icon-bianji"></i>已发布消息</p>
        <div class="published-news">
          <div class="no-messages-news no-messages"><i class="icon iconfont icon-shangchuan"></i><br>暂无消息</div>
          <ul>
            <li class="published-news-item" v-for="item in NewsList">
              <i class="icon-fangkuai"></i>
              <span class="published-news-title">【校长消息】</span>
              <router-link :to="{path: '/publishDetails', query:{index: item.messageBh}}" ><p class="published-news-art">{{item.messageTitle}}</p></router-link>
              <span class="published-news-date">{{item.receiveDate}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../static/js/layer/layer.js";
//配置layer
layer.config({
  path: "../../static/js/layer/" //layer.js所在的目录，可以是绝对目录，也可以是相对目录
});
export default {
  name: "publishNew",
  data() {
    return {
      title: "",
      content: "",
      month: '',
      day: '',
      NewsList: [],
      messageBh:'',
    };
  },
  mounted: function() {
    //防止在登陆页没有登陆时候直接手动改变url访问
    initPage.checkLogin();
    //获取当前月和日
    this.month = getDate.getmonth();
    this.day = getDate.getdate();
    //message-cont高度设置
    var WH = $(window).height();
    var RWH = WH - 160;
    $(".message-cont").height(RWH);

    this.getNewsList()//获取发布消息列表
    
  },
  methods: {
    //发布消息
    publishNew() {
      if(this.title == ''){
        layer.msg("请输入标题",function(){})
        this.$refs.title.focus();
        return false;
      };
      if(this.content == ''){
        layer.msg("请输入内容",function(){})
        this.$refs.content.focus();
        return false;
      };
      var _this = this;
      this.$http.post(URL+"/api/message/publishMessage", {
        companyId: appDB.get("companyInfo").companyId,
        title: _this.title,
        content: _this.content
      })
      .then(response=>{
        var d = response.data;
        if(d.resultCode == 0){
          layer.msg("消息发布成功");
          _this.title='';
          _this.content='';
          _this.getNewsList()//实时刷新已发布消息列表
        }else{
          layer.msg(d.msg,function(){})
        }
      })
      .catch(error=>{
        alert("网络错误，不能访问");
      })
    },

    //获取发布消息列表
    getNewsList(){
      $(".no-messages").hide();
      var _this = this;
      this.$http.post(URL+"/api/message/queryPublishMessageList",{
        companyId: appDB.get("companyInfo").companyId,
        messageType: "驾校通知通告",
        currentPage: 1,
        pageSize: 5
      })
      .then(response=>{
        var d = response.data;
        if (d.record.length == 0 || d.record == null) {
          $(".no-messages-news").show();
        }
        _this.NewsList = d.record;
      })
      .catch(error=>{
        alert("网络错误，不能访问");
      })
    }
  }
};
</script>

<style scoped>
.icon-shangchuan {
  font-size: 40px;
  color: #fff;
}
.no-messages {
  width: 100%;
  float: left;
  text-align: center;
  margin: 50px 0;
  color: #fff;
}
a {
  color: #fff;
}
.icon-fanhui {
  color: #fff;
  font-size: 30px;
  float: left;
  margin-right: 8px;
}
.publish {
  overflow: hidden;
}
.published-news-date {
  float: right;
}

.published-news-art {
  width:55%;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.published-news-title {
  color: #00b77a;
  margin-right: 5px;
  float: left;
}

.icon-fangkuai {
  width: 24px;
  height: 24px;
  background: url(../../static/images/icon-fangkuai.png);
  background-size: 100% 100%;
  float: left;
}

.published-news-item {
  width: 96%;
  padding: 15px 2%;
  line-height: 22px;
  color: #fff;
  float: left;
  background: url(../../static/images/header-bottom-bg.jpg) repeat-x bottom;
}

.published-news {
  width: 100%;
  padding: 20px 0%;
  float: left;
  background: #2d4257;
  border-radius: 5px;
  margin: 15px 0 50px 0;
  box-shadow: 0 0 5px #102337;
}

.publish-cont-form-submit {
  padding: 12px 50px;
  float: right;
  border-radius: 3px;
  font-size: 16px;
  color: #fff;
  background: #00b77a;
  box-shadow: 0 0 3px #0e1b29;
}

.publish-cont-texta {
  width: 82%;
  height: 150px;
  padding: 15px 3%;
  border-radius: 3px;
  font-size: 16px;
  float: right;
}

.publish-cont-input {
  width: 82%;
  height: 50px;
  padding: 0 3%;
  border-radius: 3px;
  font-size: 16px;
  float: right;
}

.publish-cont-label {
  width: 10%;
  color: #00b77a;
  font-size: 16px;
  /* text-align: right; */
  float: left;
  margin-top: 15px;
}

.publish-cont-form-item {
  width: 100%;
  padding: 15px 0;
  float: left;
}

.publish-cont-form {
  width: 90%;
  padding: 20px 5%;
  float: left;
  background: #2d4257;
  border-radius: 5px;
  margin: 15px 0 20px 0;
  box-shadow: 0 0 5px #102337;
}

.publish-cont {
  width: 94%;
  padding: 0 3%;
  float: left;
  margin-top: 20px;
}

.publish-cont-title {
  width: 100%;
  float: left;
  height: 40px;
  line-height: 40px;
  /* border-bottom: 1px solid #00b77a; */
  color: #00b77a;
  font-size: 18px;
  margin-top: 20px;
}

.icon-bianji {
  font-size: 24px;
  color: #00b77a;
  margin-right: 6px;
  float: left;
}
</style>


