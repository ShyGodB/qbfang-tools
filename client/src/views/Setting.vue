<template>
    <el-row class="w-100">
        <el-col :span="3" class="pr-3">
            <setting-nav></setting-nav>
        </el-col>

        <el-col :span="21" v-if="tab==='user'">
            <setting-userList></setting-userList>
        </el-col>

        <el-col :span="21" v-if="tab==='roleConfig'">
            <setting-roleConfig></setting-roleConfig>
        </el-col>

        <el-col :span="21" v-if="tab==='menuConfig'">
            <setting-menuConfig></setting-menuConfig>
        </el-col>

        <el-col :span="21" v-if="tab==='techMethod'">
            <setting-techMethod></setting-techMethod>
        </el-col>

        <el-col :span="21" v-if="tab==='agentLevel'">
            <setting-agentLevel></setting-agentLevel>
        </el-col>

        <el-col :span="21" v-if="tab==='timeManage'">
            <setting-timeManage></setting-timeManage>
        </el-col>

        <el-col :span="21" v-if="tab==='announce'">
            <setting-announcement></setting-announcement>
        </el-col>

        <el-col :span="21" v-if="tab==='withdrawal'">
            <setting-withdrawalTime></setting-withdrawalTime>
        </el-col>

        <el-col :span="21" v-if="tab==='advertise'">
            <setting-advertisePush></setting-advertisePush>
        </el-col>

        <el-col :span="21" v-if="tab==='enterprise'">
            <setting-enterpriseManage v-if="model==='list'"></setting-enterpriseManage>
            <setting-enterpriseManage-orders v-if="model==='orders'"></setting-enterpriseManage-orders>
            <setting-enterpriseManage-users v-if="model==='users'"></setting-enterpriseManage-users>
            <setting-enterpriseManage-userOrders v-if="model==='userOrders'"></setting-enterpriseManage-userOrders>
        </el-col>
    </el-row>
</template>

<script>
import Nav from "../components/SecondNav.vue";
import UserList from "../components/setting/User/List.vue";
import RoleConfig from "../components/setting/Role/Config.vue";
import MenuConfig from "../components/setting/Menu/Config.vue";
import TechMethod from "../components/setting/TechLabel/List.vue";
import AgentLevel from "../components/setting/AgentLevel.vue";
import TimeManage from "../components/setting/TimeManage.vue";
import Announcement from "../components/setting/Announce/List.vue";
import WithdrawalTime from "../components/setting/WithdrawalTime.vue";
import AdvertisePush from "../components/setting/Advertise/List.vue";
import EnterpriseManage from "../components/setting/Enterprise/List.vue";
import EnterpriseOrders from "../components/setting/Enterprise/Orders.vue";
import EnterpriseUsers from "../components/setting/Enterprise/Users.vue";
import EnterpriseUserOrders from "../components/setting/Enterprise/UserOrders.vue";

export default {
    name: "Setting",
    components: {
        "setting-nav": Nav,
        "setting-userList": UserList,
        "setting-roleConfig": RoleConfig,
        "setting-menuConfig": MenuConfig,
        "setting-techMethod": TechMethod,
        "setting-agentLevel": AgentLevel,
        "setting-timeManage": TimeManage,
        "setting-announcement": Announcement,
        "setting-withdrawalTime": WithdrawalTime,
        "setting-advertisePush": AdvertisePush,
        "setting-enterpriseManage": EnterpriseManage,
        "setting-enterpriseManage-orders": EnterpriseOrders,
        "setting-enterpriseManage-users": EnterpriseUsers,
        "setting-enterpriseManage-userOrders": EnterpriseUserOrders
    },
    data () {
        return {
            tab: "user",
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
</style>
