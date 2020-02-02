<template>
    <div id="Agent">
        <div class="agent-search">
            <el-form
                :model="ruleForm"
                :inline="true"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="渠道名称" prop="agentName">
                    <el-input v-model="ruleForm.agentName"></el-input>
                </el-form-item>
                <el-form-item label="代理商" prop="parentProxyCode">
                    <el-select
                        @change="agentChange"
                        v-model="ruleForm.parentProxyCode"
                        clearable
                        placeholder="请选择代理商，默认无此限制"
                    >
                        <el-option
                            v-for="item in agentOptions"
                            :key="item.proxyCode"
                            :label="item.agentName"
                            :value="item.proxyCode"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="agent-table">
            <el-table :data="promotes" style="width: 100%">
                <el-table-column prop="agentName" label="名称"></el-table-column>

                <el-table-column prop="agentType" label="类型"></el-table-column>

                <el-table-column prop="userName" label="姓名"></el-table-column>

                <el-table-column prop="userPhone" label="手机"></el-table-column>

                <el-table-column prop="agentRatio" label="分成比例"></el-table-column>

                <el-table-column prop="city" label="城市"></el-table-column>

                <el-table-column prop="addTime" label="添加时间"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.state=='待审核'"
                            size="mini"
                            type="danger"
                            @click="agree(scope.row, scope.$index)"
                            round
                        >同意</el-button>
                        <el-button
                            v-if="scope.row.state=='待审核'"
                            size="mini"
                            type="primary"
                            @click="refuse(scope.row, scope.$index)"
                            round
                        >拒绝</el-button>
                        <div v-if="scope.row.state!='待审核'">{{ scope.row.state }}</div>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                    ref="fenye"
                    background
                    @size-change="sizeChange"
                    @current-change="change"
                    layout="prev, pager, next"
                    :hide-on-single-page="true"
                    :page-count="pageNum"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
import util from "../../../../util";

export default {
    name: "Agent",
    data() {
        return {
            promotes: [],
            agentOptions: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                agentName: "",
                parentProxyCode: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur"
                    }
                ]
            },
            value: [],
            loading: true
        };
    },
    methods: {
        agree(row, index) {
            this.$message({
                message: "暂未完成",
                type: "success"
            });
        },
        refuse(row, index) {
            this.$message({
                message: "暂未完成",
                type: "success"
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listAgent();
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.listAgent();
        },
        change(pageNum) {
            this.pageIndex = pageNum;
            this.listAgent();
        },
        sizeChange(num) {
            console.log("funtion: sizeChange", num);
        },
        agentChange(value) {},
        async listAgent(data) {
            const res = await this.$api.post(
                "/agent/list",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            this.promotes = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        },
        async getAgentOptions() {
            const res = await this.$api.get("/agent/getOptions", {});
            this.agentOptions = res.data.data;
        },
        async listProxy() {
            const res = await this.$api.get("/agent/listAgent", {});
            this.agentOptions = res.data.data;
        }
    },
    created() {
        this.listAgent();
        this.listProxy();
    }
};
</script>


<style scoped>
</style>
