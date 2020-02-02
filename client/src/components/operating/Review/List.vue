<template>
    <div id="Review">
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
            <el-table :data="reviews" style="width: 100%">
                <el-table-column prop="orderId" label="订单编号" width="120" height="120"></el-table-column>

                <el-table-column prop="userName" label="用户姓名" width="120" height="120"></el-table-column>

                <el-table-column prop="userPhone" label="用户手机号" width="80" height="120"></el-table-column>

                <el-table-column prop="reviewRemark" label="回访内容" width="500" height="120"></el-table-column>

                <el-table-column prop="reviewTime" label="回访时间" width="160" height="120"></el-table-column>

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
    name: "Review",
    data() {
        return {
            reviews: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
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
                    this.listReview();
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.listReview();
        },
        change(num) {
            this.pageIndex = num;
            this.listReview();
        },
        sizeChange(num) {},
        async listReview(data) {
            const res = await this.$api.post(
                "/review/list",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            this.reviews = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        }
    },
    created() {
        this.listReview();
    }
};
</script>

<style scoped>
</style>
