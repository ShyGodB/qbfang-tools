<template>
    <div id="UserDetail">
        <div id="user-detail-baseinfo" class="p-3">
            <p>基本信息</p>
            <el-row class="p-3">
                <el-col :span="4">
                    <img class="img" :src="user.headImg" alt="图片显示错误或无图片" />
                </el-col>
                <el-col :span="10">
                    <el-col :span="8">
                        <p>姓名： {{ user.nickName }}</p>
                        <p>注册时间： {{ user.regTime }}</p>
                        <p>普通余额： {{ user.amount }}</p>
                    </el-col>
                    <el-col :span="8">
                        <p>城市： {{ user.city }}</p>
                        <p>生日： {{ user.birthday }}</p>
                        <p>充值余额： {{ user.amountRecharge }}</p>
                    </el-col>
                    <el-col :span="8">
                        <p>性别： {{ user.gender }}</p>
                        <p>手机： {{ user.phone }}</p>
                        <p>退款余额： {{ user.amountRefund }}</p>
                    </el-col>
                </el-col>
            </el-row>
        </div>

        <div id="user-detail-grid">
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
    name: "UserDetail",
    data() {
        return {
            user: {},
            grids: [
                {
                    icon: "el-icon-s-order",
                    name: "订单列表",
                    method: "listOrder"
                },
                {
                    icon: "el-icon-s-order",
                    name: "收藏列表",
                    method: "listCollectTech"
                },
                {
                    icon: "el-icon-s-order",
                    name: "意见反馈",
                    method: "listAdvice"
                },
                {
                    icon: "el-icon-s-order",
                    name: "评论列表",
                    method: "listComment"
                },
                {
                    icon: "el-icon-s-order",
                    name: "优惠卷",
                    method: "listCoupon"
                },
                {
                    icon: "el-icon-s-order",
                    name: "邀请有奖",
                    method: "listInvite"
                },
                {
                    icon: "el-icon-s-order",
                    name: "余额明细",
                    method: "listBalanceRecord"
                },
                {
                    icon: "el-icon-s-order",
                    name: "位置记录",
                    method: "listLocation"
                },
                {
                    icon: "el-icon-s-order",
                    name: "回访记录",
                    method: "listReview"
                },
                {
                    icon: "el-icon-s-order",
                    name: "添加回访记录",
                    method: "addReview"
                },
                {
                    icon: "el-icon-s-order",
                    name: "添加危险标识",
                    method: "addDanger"
                }
            ]
        };
    },
    methods: {
        Fn(method) {
            this[method]();
        },
        listOrder() {
            console.log(1234);
        },
        listCollectTech() {
            console.log(8888888888888);
        },
        listAdvice() {
            console.log("abc");
        },
        listComment() {
            console.log("abc");
        },
        listCoupon() {
            console.log("abc");
        },
        listInvite() {
            console.log("abc");
        },
        listBalanceRecord() {
            console.log("abc");
        },
        listLocation() {
            console.log("abc");
        },
        listReview() {
            console.log("abc");
        },
        addReview() {
            console.log("abc");
        },
        addDanger() {
            console.log("abc");
        },
        async getUserDetail(userId) {
            const res = await this.$api.get("/user/detail", {
                userId: this.$store.state.userId
            });
            this.user = res.data.data;
        }
    },
    created() {
        this.getUserDetail(this.$store.state.userId);
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
  