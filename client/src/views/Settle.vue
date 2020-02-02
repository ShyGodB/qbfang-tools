<template>
    <el-row class="w-100">
        <el-col :span="3">
            <settle-nav></settle-nav>
        </el-col>

        <el-col :span="21" v-if="tab==='settlement'">
            <settle-settlement v-if="model === 'list'"></settle-settlement>
            <settle-settlement-proxy v-if="model === 'proxy'"></settle-settlement-proxy>
            <settle-settlement-channel v-if="model === 'channel'"></settle-settlement-channel>
        </el-col>

        <el-col :span="21" v-if="tab==='cash'">
            <settle-cash></settle-cash>
        </el-col>

        <el-col :span="21" v-if="tab==='techIncome'">
            <settle-techIncome></settle-techIncome>
        </el-col>

        <el-col :span="21" v-if="tab==='account'">
            <settle-account></settle-account>
        </el-col>

        <el-col :span="21" v-if="tab==='refund'">
            <settle-refund></settle-refund>
        </el-col>

        <el-col :span="21" v-if="tab==='recharge'">
            <settle-recharge></settle-recharge>
        </el-col>
    </el-row>
</template>


<script>
import Nav from "../components/SecondNav.vue";
import Account from "../components/settle/Account/List.vue";
import Cash from "../components/settle/Cash/List.vue";
import Recharge from "../components/settle/Recharge/List.vue";
import Refund from "../components/settle/Refund/List.vue";
import SettleList from "../components/settle/Settle/List.vue";
import SettleProxy from "../components/settle/Settle/Proxy.vue";
import SettleChannel from "../components/settle/Settle/Channel.vue";
import TechIncome from "../components/settle/TechIncome/List.vue";

export default {
    name: "Settle",
    components: {
        "settle-nav": Nav,
        "settle-account": Account,
        "settle-cash": Cash,
        "settle-recharge": Recharge,
        "settle-refund": Refund,
        "settle-settlement": SettleList,
        "settle-settlement-proxy": SettleProxy,
        "settle-settlement-channel": SettleChannel,
        "settle-techIncome": TechIncome
    },
    data () {
        return {
            tab: "settlement",
            model: 'list'
        };
    },
    methods: {
        changeRoute () {
            const tab = this.$route.params.tab;
            this.tab = tab;
        }
    },
    watch: {
        $route: "changeRoute"
    },
    created () {
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
</style>
