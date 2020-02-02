<template>
    <div id="Apply">
        <div class="order-search">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="技师i姓名" prop="techName">
                            <el-input v-model="ruleForm.techName"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="技师手机" prop="techPhone">
                            <el-input v-model="ruleForm.techPhone"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="用户姓名" prop="userName">
                            <el-input v-model="ruleForm.userName"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="用户手机" prop="userPhone">
                            <el-input v-model="ruleForm.userPhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="order-table">
            <el-table :data="applys" style="width: 100%">
                <el-table-column prop="userId" label="用户编号" width="120" height="120"></el-table-column>

                <el-table-column prop="avatar" label="头像" width="120" height="120"></el-table-column>

                <el-table-column prop="idCard" label="身份证号" width="80" height="120"></el-table-column>

                <el-table-column prop="realName" label="真实姓名" width="120" height="120"></el-table-column>

                <el-table-column prop="state" label="状态" width="160" height="120"></el-table-column>

                <el-table-column prop="remark" label="备注" width="120" height="120"></el-table-column>

                <el-table-column prop="addTime" label="添加时间" width="100" height="120"></el-table-column>

                <el-table-column label="操作" height="120">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="info"
                            @click="info(scope.row, scope.$index)"
                            round
                        >详情</el-button>
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
import axios from "axios";

export default {
    name: "Apply",
    data() {
        return {
            applys: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                techName: "",
                techPhone: "",
                userName: "",
                userPhone: ""
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
            loading: true
        };
    },
    methods: {
        info(row, index) {
            this.$message({
                message: "暂未完成",
                type: "success"
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listApply(this.ruleForm);
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        change(num) {
            this.pageIndex = num;
            this.listApply(this.ruleForm);
        },
        sizeChange(num) {
            // this.listApply(this.ruleForm);
        },
        async listApply(data) {
            const res = await this.$api.post(
                "/tech/listTechApply",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            this.applys = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        }
    },
    created() {
        this.listApply();
    }
};
</script>

<style scoped>
</style>
