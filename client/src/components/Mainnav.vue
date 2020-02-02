<template>
    <div id="mainnav">
        <el-row>
            <el-col :span="24">
                <div class="grid-content">
                    <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        mode="horizontal"
                        background-color="#ffffff"
                        text-color="#000000"
                        active-text-color="#ff0000"
                        :router="true"
                        @select="handleSelect"
                    >
                        <el-menu-item
                            v-for="(menu, index) in menus"
                            :index="(index + 1).toString()"
                            :key="index"
                            :route="menu.route"
                        >
                            <i class="el-icon-menu"></i>
                            {{ menu.name }}
                        </el-menu-item>

                        <el-submenu index="6" class="content-top-right" style="float:right;">
                            <template slot="title">
                                <img src="../../public/img/tt.png" style="width:44px;height:44px;" />
                            </template>
                            <el-menu-item index="6-1">
                                <router-link to="/dash">Home</router-link>
                            </el-menu-item>

                            <el-menu-item index="6-2" @click="goToGithub()">Github</el-menu-item>

                            <el-menu-item id="logout" index="6-3" @click="logout">Log Out</el-menu-item>
                        </el-submenu>

                        <el-menu-item
                            index="7"
                            class="f-right"
                        >{{ userinfo.role }} : {{ userinfo.userName }}</el-menu-item>
                    </el-menu>
                </div>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import check from "../../util/check";

export default {
    inject: ["reload"],
    name: "mainnav",
    data() {
        return {
            userinfo: {},
            activeIndex: "1",
            menus: []
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            this.$store.state.index = Number(key) - 1;
        },
        goToGithub() {
            window.open("https://github.com/ShyGodB/admin.edtuina");
        },
        async listMenu(data) {
            // const res = await this.$api.post("/menu/list", {});
            // this.menus = res.data.data || [];
            this.menus = this.$store.state.menus;
        },
        logout() {
            this.$store.state.userinfo = false;
            localStorage.removeItem("store");
            this.$router.push("/login");
            this.reload();
        }
    },
    created() {
        this.listMenu();
        this.activeIndex = check.checkMenu(this.$route.name, this.menus);
        this.userinfo = this.$store.state.userinfo || {};
    }
};
</script>


<style scoped>
</style>
