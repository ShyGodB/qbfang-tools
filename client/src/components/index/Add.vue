<template>
    <div id="Add" class="w-100">
        <el-tabs :tab-position="tabPosition1" style="height: 200px;">
            <el-tab-pane label="用户管理">
                <el-tabs :tab-position="tabPosition2" style="height: 200px;">
                    <el-tab-pane label="用户管理">用户管理</el-tab-pane>
                    <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                </el-tabs>
            </el-tab-pane>

            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

export default {
    name: 'Add',
    data() {
        return {
            tabPosition1: 'left',
            tabPosition2: 'top'
        }
    },
    methods: {

    },
    created() {

    }
}
</script>


<style scoped>
</style>
