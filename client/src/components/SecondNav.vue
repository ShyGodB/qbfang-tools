<template>
    <el-row class="tac" id="operating-nav">
        <el-col :span="24">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo"
                @select="handleSelect"
                background-color="#ffffff"
                text-color="#000"
                :router="true"
                active-text-color="#ff0000"
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
            </el-menu>
        </el-col>
    </el-row>
</template>


<script>
import check from "../../util/check";

export default {
    name: "operating-nav",
    data() {
        return {
            activeIndex: "1",
            menus: []
        };
    },
    methods: {
        handleSelect(key, keyPath) {},
        async listMenu(data) {
            // const res = await this.$api.post("/menu/list", {});
            // console.log(res.data.data);
            // this.menus = res.data.data[this.$store.state.index].children || [];
            this.menus =
                this.$store.state.menus[this.$store.state.index].children || [];
        }
    },
    created() {
        this.listMenu();
        const activeIndex = check.checkTab(this.$route.params.tab, this.menus);
        this.activeIndex = activeIndex;
    }
};
</script>


<style scoped>
</style>
