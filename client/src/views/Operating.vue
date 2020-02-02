<template>
    <el-row class="w-100 h-100" id="operating">
        <el-col :span="3" class="pr-3">
            <operating-nav></operating-nav>
        </el-col>

        <el-col :span="21" v-if="tab==='order'">
            <operating-order v-if="model==='list'"></operating-order>
            <operating-order-detail v-if="model==='detail'"></operating-order-detail>
        </el-col>

        <el-col :span="21" v-if="tab==='user'">
            <operating-user v-if="model==='list'"></operating-user>
            <operating-user-detail v-if="model==='detail'"></operating-user-detail>
        </el-col>

        <el-col :span="21" v-if="tab==='tech'">
            <operating-tech v-if="model==='list'"></operating-tech>
            <operating-tech-detail v-if="model==='detail'"></operating-tech-detail>
        </el-col>

        <el-col :span="21" v-if="tab==='promote'">
            <operating-promote></operating-promote>
        </el-col>

        <el-col :span="21" v-if="tab==='techComment'">
            <operating-techcomment></operating-techcomment>
        </el-col>

        <el-col :span="21" v-if="tab==='userComment'">
            <operating-usercomment></operating-usercomment>
        </el-col>

        <el-col :span="21" v-if="tab==='coupon'">
            <operating-coupon-store v-if="model === 'list'"></operating-coupon-store>
            <operating-coupon-userCoupons v-if="model === 'userCoupons'"></operating-coupon-userCoupons>
            <operating-coupon-codes v-if="model === 'codes'"></operating-coupon-codes>
        </el-col>

        <el-col :span="21" v-if="tab==='project'">
            <operating-project></operating-project>
        </el-col>

        <el-col :span="21" v-if="tab==='complaint'">
            <operating-complaint></operating-complaint>
        </el-col>

        <el-col :span="21" v-if="tab==='techApply'">
            <operating-techApply></operating-techApply>
        </el-col>

        <el-col :span="21" v-if="tab==='feedback'">
            <operating-feedback></operating-feedback>
        </el-col>

        <el-col :span="21" v-if="tab==='review'">
            <operating-review></operating-review>
        </el-col>

        <el-col :span="21" v-if="tab==='techTime'">
            <operating-techTime></operating-techTime>
        </el-col>

        <el-col :span="21" v-if="tab==='alarm'">
            <operating-alarm></operating-alarm>
        </el-col>

        <el-col :span="21" v-if="tab==='apply'">
            <operating-apply></operating-apply>
        </el-col>

        <el-col :span="21" v-if="tab==='agent'">
            <operating-agent></operating-agent>
        </el-col>
    </el-row>
</template>


<script>
import axios from "axios";
import md5 from "md5";
import Nav from "../components/SecondNav.vue";
import Order from "../components/operating/Order/List.vue";
import OrderDetail from "../components/operating/Order/Detail.vue";
import User from "../components/operating/User/List.vue";
import UserDetail from "../components/operating/User/Detail.vue";
import Tech from "../components/operating/Tech/List.vue";
import TechDetail from "../components/operating/Tech/Detail";
import Promote from "../components/operating/Promote/List.vue";
import TechComment from "../components/operating/TechComment/List.vue";
import UserComment from "../components/operating/UserComment/List.vue";
import CouponList from "../components/operating/Coupon/List.vue";
import UserCoupons from "../components/operating/Coupon/UserCoupons.vue";
import Codes from "../components/operating/Coupon/Codes.vue";
import Project from "../components/operating/Project/List.vue";
import Complaint from "../components/operating/Complaint/List.vue";
import TechApply from "../components/operating/TechApply/List.vue";
import Feedback from "../components/operating/Feedback/List.vue";
import Review from "../components/operating/Review/List.vue";
import TechTime from "../components/operating/TechTime/List.vue";
import Alarm from "../components/operating/Alarm/List.vue";
import Apply from "../components/operating/Apply/List.vue";
import Agent from "../components/operating/Agent/List.vue";

export default {
    name: "Operating",
    components: {
        "operating-nav": Nav,
        "operating-agent": Agent,
        "operating-alarm": Alarm,
        "operating-apply": Apply,
        "operating-techcomment": TechComment,
        "operating-usercomment": UserComment,
        "operating-complaint": Complaint,
        "operating-coupon-store": CouponList,
        "operating-coupon-userCoupons": UserCoupons,
        "operating-coupon-codes": Codes,
        "operating-feedback": Feedback,
        "operating-order": Order,
        "operating-order-detail": OrderDetail,
        "operating-project": Project,
        "operating-promote": Promote,
        "operating-review": Review,
        "operating-order": Order,
        "operating-tech": Tech,
        "operating-tech-detail": TechDetail,
        "operating-techApply": TechApply,
        "operating-techTime": TechTime,
        "operating-user": User,
        "operating-user-detail": UserDetail
    },
    data() {
        return {
            tab: "order",
            model: "detail"
        };
    },
    methods: {
        changeRoute() {
            const { tab, model } = this.$route.params;
            this.tab = tab;
            this.model = model;
        }
    },
    watch: {
        $route: "changeRoute"
    },
    created() {
        this.tab = this.$route.params.tab;
        this.model = this.$route.params.model;
    }
};
</script>


<style scoped>
#god,
#boss {
    margin-top: 21px;
}
.register {
    width: 60%;
    min-height: 500px;
    margin: 40px auto 0;
}
.register .register-body {
    margin-top: 40px;
}
.oa {
    max-height: 800px;
    overflow: auto;
}
</style>
