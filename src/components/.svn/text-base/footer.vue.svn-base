<template>
    <div class="footer-b">
        <div class="footer" id="footer">
            <div class="footer-item on shouye" @click="goHome"><i class="icon iconfont icon-home"></i><div class="footerText">首页</div></div>
            <div class="footer-item xiaoxi" @click="goMes"><i class="icon iconfont icon-xiaoxi"></i><el-badge :is-dot="TorM" class="footerText">消息</el-badge></div>
            <div class="footer-item shuju" @click="goBd"><img src="../../static/images/big-date.png" class="footer-bigD"><div class="footerText">大数据</div></div>
            <div class="footer-item guankong" @click="goClgk"><i class="icon iconfont icon-qichepeijian"></i><div class="footerText">车辆管控</div></div>
            <div class="footer-item shenpi"  @click="goSp"><i class="icon iconfont icon-shenpi"></i><el-badge :is-dot="TorF" class="footerText">审批</el-badge></div>
        </div>
    </div>
</template>

<script>
import "../../static/js/jquery-1.9.1.min.js";
export default {
  name: "footer",
  data() {
    return {
      TorF: false,
      TorM: false,
    };
  },
  mounted: function() {
    //导航点击后样式
    $(".footer-item").click(function() {
      $(this)
        .addClass("on")
        .siblings()
        .removeClass("on");
    });

    //根据url地址配置导航位置
    var URl = window.location.hash;
    if (URl.indexOf("index") > 0) {
      $(".shouye")
        .addClass("on")
        .siblings()
        .removeClass("on");
    } else if (URl.indexOf("message") > 0) {
      $(".xiaoxi")
        .addClass("on")
        .siblings()
        .removeClass("on");
    } else if (URl.indexOf("bigData") > 0) {
      $(".shuju")
        .addClass("on")
        .siblings()
        .removeClass("on");
    } else if (URl.indexOf("shenpiList") > 0) {
      $(".shenpi")
        .addClass("on")
        .siblings()
        .removeClass("on");
    }

    //防止input获取焦点是软键盘把footer顶上来
    var h = document.body.scrollHeight;
    window.onresize = function() {
      if (window.innerHeight < h) {
        $("#footer").hide();
      } else {
        $("#footer").show();
      }
    };

    //获取未读审批记录数
    this.records();
  },
  methods: {
    goHome() {
      this.$router.push("/index");
    },
    goMes() {
      this.$router.push("/message");
      this.TorM=false;
    },
    goSp() {
      this.$router.push("/shenpiList");
      this.TorF=false;
    },
    goBd() {
      this.$router.push("/bigData");
    },
    goClgk() {
      try{
      	//调用横屏接口
      	window.xiaolu.changeScreenLandscape();
      }catch(e){
      }
      
      this.$router.push("/Clgk/"+appDB.get("companyInfo").phoneNumber);
    },
    //未查看消息
    records(){
      var _this = this;
      this.$http.post("http://123.56.228.104:9091/api/approve/getNoViewApproveNumber", {
        companyId: appDB.get("companyInfo").companyId,
      })
      .then(response=>{
          var d = response.data;
          if(d.record!=0){
            _this.TorF=true;
          }else{
            _this.TorF=false;
          }
      })
      .catch(error => {
        alert("网络错误，不能访问");
      });
    },
    
  },
  
};
</script>

<style scoped>
.el-badge {
  display: block;
}
/* .footer-b{
    width: 100%;
    float: left;
    height: 80px;
    position: relative;
} */
.footer {
  width: 90%;
  height: 80px;
  padding: 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* box-shadow: 0 1px 5px 1px #102337; */
  position: fixed;
  bottom: 0;
  left: 0;
  color: #fff;
  /* background: #324961; */
  background: url(../../static/images/header-bottom-bg.jpg) repeat-x top;
}
.footer-item {
  text-align: center;
}
.footer-item.on i,
.footer-item.on div {
  color: #00b77a;
}
.iconfont {
  font-size: 30px;
  color: #fff;
}
.footer-bigD {
  width: 70px;
  margin-top: -40px;
}
.footerText {
  margin-top: 5px;
  color: #fff;
}
</style>


