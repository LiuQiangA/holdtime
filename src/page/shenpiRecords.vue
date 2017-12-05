<template>
    <div class="shenpi-main">
        <div class="message-head">
            <a href="javascript:history.go(-1)">
                <i class="icon iconfont icon-fanhui"></i>
            </a>审批
            <div class="getMD">
                <span class="getMonth">{{month}}</span>
                <span class="getDay">{{day}}</span>
            </div>
        </div>
        <div class="message-body">
            <div class="message-cont">
                <div class="message-cont-head">
                    <span class="message-cont-head-t">
                        <i class="icon iconfont icon-bianji1"></i>审批记录
                    </span>
                </div>
                <div class="no-icon">
                  <img src="../../static/images/no-icon.png" width="100%">
                  <p>暂无消息</p>
                </div>
                <ul class="shenpi-cont">
                    <li class="shenpi-cont-item" v-for="record in records">
                        <div class="shenpi-cont-item-left">
                            <i class="icon-fangkuai"></i>
                            <span class="published-news-title">【{{record.approveType}}】</span>
                            <span class="shenpi-cont-item-left-art">{{record.approveTitle}}</span>
                        </div>
                        <div class="shenpi-cont-item-center">
                            <p class="shenpi-resion">{{record.approveContent}}</p>
                            <p class="shenpi-resion-date">申请时间：{{record.approveApplyDate}}</p>
                            <p class="shenpi-resion-date">审批时间：{{record.approveDate}}</p>
                        </div>
                        <div class="shenpi-cont-item-right">
                            <input class="shenpi-tongguo" type="button" v-if="record.approveStatus == 1" value="已同意">
                            <input class="shenpi-tongguo" type="button" v-else-if="record.approveStatus ==-1" value="已驳回">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
// import "../app.js"
export default {
  name: "shenpiRecords",
  data() {
    return {
      records: [],
      month: "",
      day: "",
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

    this.getRecords(); //获取审批记录
  },
  methods: {
    //获取审批记录
    getRecords() {
      var _this = this;
      this.$http
        .post(URL+"/api/approve/getOverApproveList", {
          companyId: appDB.get("companyInfo").companyId,
          currentPage: 1,
          pageSize: 10
        })
        .then(response => {
          var d = response.data;
          if (d.record.length == 0) {
            $(".no-icon").css("display", "block");
          }
          _this.records = d.record;
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    }
  }
};
</script>

<style scoped>
.no-icon {
  width: 90px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -45px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 30px;
  display: none;
}
.icon-bianji1 {
  font-size: 24px;
  float: left;
  margin-right: 6px;
}
.shenpi-bohui {
  width: 70px;
  height: 40px;
  background: none;
  color: #00b77a;
  margin-right: 30px;
}

.shenpi-tongguo {
  width: 90px;
  height: 40px;
  background: #00b77a;
  color: #fff;
  border-radius: 30px;
}

.shenpi-cont-item-right {
  float: right;
  margin-top: 9px;
}

.shenpi-resion-date {
  width: 100%;
  float: left;
  color: #00b77a;
  margin-top: 15px;
}

.shenpi-resion {
  width: 100%;
  color: #fff;
  line-height: 30px;
  padding: 15px 0 0 0;
  float: left;
}

.shenpi-cont-item-center {
  width: 55%;
  float: left;
  margin-left: 12.5%;
}

.shenpi-cont-item-left-art {
  line-height: 24px;
  color: #fff;
}

.shenpi-cont-item-left {
  width: 100%;
  float: left;
}

.published-news-title {
  color: #00b77a;
  line-height: 24px;
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

.shenpi-cont {
  width: 100%;
  float: left;
  margin: 0 0 30px 0;
}

.shenpi-cont-item {
  width: 100%;
  padding: 20px 0;
  float: left;
  background: url(../../static/images/header-bottom-bg.jpg) repeat-x bottom;
}

.shenpi-main {
  overflow: hidden;
}

.shenpi-head-right {
  float: right;
  color: #00b97c;
  font-size: 16px;
}

.icon-fanhui {
  color: #fff;
  font-size: 30px;
  float: left;
  margin-right: 8px;
}

.icon-bianji {
  float: left;
  font-size: 22px;
  margin-right: 5px;
}
</style>


