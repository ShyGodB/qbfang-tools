<template>
    <div id="TechDetail">
      <div id="tech-detail-baseinfo" class="p-3">
        <p>基本信息</p>
        <el-row class="p-3">
          <el-col :span="4">
            <img class="img" :src="tech.headImg" alt="图片显示错误或无图片">
            <p>技师可提现余额： {{ tech.amount }}</p>
          </el-col>
          <el-col :span="10">
            <el-row>
                <el-col :span="8">
                    <p>姓名： {{ tech.realName }}</p>
                    <p>性别： {{ tech.gender }} </p>
                    <p>生日： {{ tech.birthday }} </p>
                    <p>状态： {{ tech.state }} </p>
                  </el-col>
                  <el-col :span="8">
                    <p>城市： {{ tech.city }}</p>
                    <p>认证级别： {{ tech.level }} </p>
                    <p>从业时间： {{ tech.jobYear }} </p>
                    <p>服务项目： {{ tech.projects }} </p>
                  </el-col>
                  <el-col :span="8">
                    <p>手机系统： {{ tech.phoneSystem }}</p>
                    <p>审核通过时间： {{ tech.regtime }} </p>
                    <p>手机： {{ tech.phone }} </p>
                    <p>定位设备号： {{ tech.posDeviceId }} </p>
                  </el-col>
            </el-row>
            <p>简介：  {{ tech.remark }} </p>
            <el-row>
                <el-col :span="4">
                    
                </el-col>
                <el-col :span="20">
                    <span>星级： {{ tech.star }} </span>
                    <span>单量： {{ tech.orders }} </span>
                    <span>点击： {{ tech.clicks }} </span>
                    <span>加钟： {{ tech.clocks }} </span>
                </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <div id="tech-card-baseinfo" class="p-3">
        <p>身份证信息</p>
        <el-row class="p-3">
          <el-col :span="24">
            <p>身份证号： {{ tech.IDCard }} </p>
            <img class="img" v-for="(img, index) in imgs" :key="index + 1" :src="img" alt="图片显示错误或无图片">
          </el-col>
        </el-row>
      </div>

      <div id="tech-detail-grid">
        <el-row>
          <el-col v-for="(grid, index) in grids" :key="index + 1" :span="4" class="grid">
            <div @click="Fn(grid.method)" class="fullbox">
              <i :class="grid.icon"></i>
              {{ grid.name }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>
  
  
<script>
import axios from "axios";

export default {
  name: "TechDetail",
  data() {
    return {
      tech: {},
      imgs: [],
      grids: [
        {
          icon: 'el-icon-s-order',
          name: '订单列表',
          method: 'listOrder'
        },
        {
          icon: 'el-icon-s-order',
          name: '浏览列表',
          method: 'listOver'
        },
        {
          icon: 'el-icon-s-order',
          name: '评论列表',
          method: 'listComment'
        },
        {
          icon: 'el-icon-s-order',
          name: '成长记录',
          method: 'listGrowth'
        },
        {
          icon: 'el-icon-s-order',
          name: '位置记录',
          method: 'listLocation'
        }
      ]
    };
  },
  methods: {
    Fn(method) {
      this[method]()
    },
    listOrder() {
      console.log(1234)
    },
    listOver() {
      console.log(8888888888888);
    },
    listComment() {
      console.log('abc')
    },
    listGrowth() {
      console.log('abc')
    },
    listLocation() {
      console.log('abc')
    },
    getTechDetail(techId) {
        axios({
          method: "post",
          url: "/api/admin/tech/detail",
          responseType: "json",
          data: { 
            techId: this.$store.state.techId
          }
        }).then(res => {
          this.tech = res.data.data
          this.imgs = this.tech.imgs
        });
      }
  },
  created() {
    this.getTechDetail(this.$store.state.techId)
  }
};
</script>


<style scoped>
.grid {
  height: 200px;
  background-color: #cccccc;
  border: 1px solid #000000;
}
.fullbox {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
  