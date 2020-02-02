<template>
    <div id="Feedback">
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

                    <el-col :span="6">
                        <el-form-item label="是否回复" prop="state">
                            <el-checkbox-group
                                @change="stateChange"
                                v-model="ruleForm.state"
                                size="medium"
                            >
                                <el-checkbox-button
                                    v-for="(state, index) in state"
                                    :label="state"
                                    :key="(index + 1)"
                                    :index="(index + 1).toString()"
                                >{{state}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="techapply-table">
            <el-table :data="feedbacks" style="width: 100%">
                <el-table-column prop="userName" label="用户姓名" height="120"></el-table-column>

                <el-table-column prop="content" label="建议内容" height="120"></el-table-column>

                <el-table-column prop="labels" label="回复人" height="120"></el-table-column>

                <el-table-column prop="remark" label="回复内容" height="120"></el-table-column>

                <el-table-column prop="evidence" label="时间" height="120"></el-table-column>

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
export default {
    name: "Feedback",
    data() {
        return {
            state: ["未回复", "已回复"],
            feedbacks: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                userName: "",
                userPhone: "",
                state: []
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
                    this.listFeedback();
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        change(num) {
            this.pageIndex = num;
            this.listFeedback();
        },
        sizeChange(num) {
            // this.listFeedback(this.ruleForm);
        },
        stateChange(state) {
            console.log(state);
        },
        async listFeedback(data) {
            const res = await this.$api.post(
                "/feedback/list",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            this.feedbacks = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        }
    },
    created() {
        this.listFeedback();
    }
};
</script>

<style scoped>
</style>
