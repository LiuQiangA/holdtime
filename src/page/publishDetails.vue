<template>
    <div class="publishDetails">
        <div class="message-head">
            <a href="javascript:history.go(-1)">
                <i class="icon iconfont icon-fanhui"></i>
            </a>消息详细
            <div class="getMD">
                <span class="getMonth">{{month}}</span>
                <span class="getDay">{{day}}</span>
            </div>
        </div>
        <div class="message-body">
            <div class="message-cont">
                <div class="publishD">
                    <p class="publishD-title">{{messageTitle}}</p>
                    <small class="publishD-smT">{{receiveDate}} {{messageSrc}}</small>
                    <div class="fontChange">
                        <ul>
                            <li><img id="fontSmall" src="../../static/images/fontSmall.png" width="100%"></li>
                            <li><img id="fontBig" src="../../static/images/fontBig.png" width="100%"></li>
                        </ul>
                    </div>
                </div>
                <div class="publishD-cont">
                    <p>{{messageContent}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "publishDetails",
  data(){
    return{
      month: '',
      day: '',
      messageTitle: '',
      messageContent: '',
      messageSrc: '',
      receiveDate: '',
    }
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

    //字体大小变化
    let fontAdd = 16;
    let max = 24;
    let min = 16;
    $("#fontBig").click(function() {
      $(".publishD-cont p").css("font-size", fontAdd + "px");
      fontAdd += 2;
      if (fontAdd >= max) {
        fontAdd = max;
      }
    });
    $("#fontSmall").click(function() {
      $(".publishD-cont p").css("font-size", fontAdd + "px");
      fontAdd -= 2;
      if (fontAdd < min) {
        fontAdd = min;
      }
    });

    this.getDetails()
  },
  methods: {
    getDetails(){
      var _this = this;
      this.$http.get(URL+"/api/message/messageDetail/" + _this.$route.query.index,
      {
          headers: {'Authorization': appDB.get("companyInfo").token}
        })
      .then(response=>{
        var d = response.data.record;
        _this.messageTitle = d.messageTitle;
        _this.messageContent = d.messageContent;
        _this.messageSrc = d.messageSrc;
        _this.receiveDate = d.receiveDate;
      })
      .catch(error=>{
        alert("网络错误，不能访问");
      })
    }
  },
};
</script>

<style scoped>
.publishD-cont p {
  width: 100%;
  float: left;
  padding: 15px 0;
  color: #fff;
  line-height: 30px;
}

.publishD-cont {
  width: 100%;
  float: left;
  margin-bottom: 30px;
}

.fontChange ul li {
  width: 30px;
  float: right;
  margin-left: 15px;
}

.fontChange {
  width: 100px;
  position: absolute;
  right: 0;
  bottom: 10px;
}

.publishD-smT {
  padding: 15px 0 0 0;
  float: left;
  width: 100%;
}

.publishD-title {
  width: 100%;
  float: left;
  font-size: 20px;
  line-height: 30px;
  font-weight: bold;
}

.publishD {
  width: 100%;
  margin: 20px 0;
  padding: 20px 0;
  color: #00b77a;
  text-align: center;
  float: left;
  position: relative;
  border-bottom: 5px solid #00b77a;
}

.publishDetails {
  overflow: hidden;
}

.icon-fanhui {
  color: #fff;
  font-size: 30px;
  float: left;
  margin-right: 8px;
}
</style>


