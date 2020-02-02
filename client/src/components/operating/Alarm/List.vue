<template>
    <div id="Alarm">
        <div class="promote-search">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="技师姓名" prop="techName">
                            <el-input v-model="ruleForm.techName"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="技师手机" prop="techPhone">
                            <el-input v-model="ruleForm.techPhone"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="代理商" prop="proxyCodes">
                            <el-cascader v-model="ruleForm.proxyCodes" :options="agentOptions" size="medium"
                                :props="{ expandTrigger: 'hover', size: 'medium' }" @change="agentChange"></el-cascader>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="时间区间" prop="times">
                            <el-date-picker v-model="ruleForm.times" type="datetimerange" :picker-options="timeDouble"
                                @change="timeChange" range-separator="至" start-placeholder="开始日期"
                                end-placeholder="结束日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="alarm-table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="img" label="二维码" width="200">
                    <template slot-scope="scope">
                        <el-image style="width: 80px; height: 80px" :src="scope.row.img"></el-image>
                    </template>
                </el-table-column>

                <el-table-column prop="promoteType" label="类型"></el-table-column>

                <el-table-column prop="purpose" label="用途"></el-table-column>

                <el-table-column prop="userCount" label="用户量"></el-table-column>

                <el-table-column prop="applyTime" label="申请时间"></el-table-column>

                <el-table-column prop="authName" label="审核人"></el-table-column>

                <el-table-column prop="authTime" label="审核时间"></el-table-column>

                <el-table-column prop="state" label="状态"></el-table-column>

                <el-table-column prop="reason" label="审核意见"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.state=='待审核'" size="mini" type="danger"
                            @click="agree(scope.row, scope.$index)" round>同意</el-button>
                        <el-button v-if="scope.row.state=='待审核'" size="mini" type="primary"
                            @click="refuse(scope.row, scope.$index)" round>拒绝</el-button>
                        <div v-if="scope.row.state!='待审核'">{{ scope.row.state }}</div>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="change"
                    layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
import util from "../../../../util";

export default {
    name: "Alarm",
    data () {
        return {
            agentOptions: [],
            timeDouble: util.config.timeDouble,
            tableData: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                techName: '',
                techPhone: '',
                times: [],
                proxyCodes: [],
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
            }
        };
    },
    methods: {
        agree (row, index) {
            this.$message({
                message: "暂未完成",
                type: "success"
            });
        },
        refuse (row, index) {
            this.$message({
                message: "暂未完成",
                type: "success"
            });
        },
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listAlarm();
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listAlarm();
        },
        agentChange (agent) {
            console.log(this.ruleForm);
        },
        timeChange (time) {
            console.log(this.ruleForm);
        },
        stateChange (state) {
            console.log(this.ruleForm);
        },
        change (pageNum) {
            this.listAlarm(pageNum);
        },
        sizeChange (num) {
            console.log("funtion: sizeChange", num);
        },
        async listAlarm (data) {
            const res = await this.$api.post(
                "/alarm/list",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            this.tableData = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        },
        async listAgent () {
            const res = await this.$api.get("/agent/getOptions", {});
            this.agentOptions = res.data.data;
        }
    },
    created () {
        this.listAlarm();
        this.listAgent();
    }
};
</script>


<style scoped>
</style>
