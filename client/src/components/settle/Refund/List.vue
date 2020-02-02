<template>
    <div id="Setting-Refund">
        <div class="recharge-search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="techName">
                    <el-input v-model="ruleForm.techName"></el-input>
                </el-form-item>

                <el-form-item label="手机" prop="techPhone">
                    <el-input v-model="ruleForm.techPhone"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="recharge-table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="userName" label="姓名" width="180"></el-table-column>

                <el-table-column prop="userPhone" label="手机" width="180"></el-table-column>

                <el-table-column prop="amount" label="申请金额"></el-table-column>

                <el-table-column prop="amountRefund" label="实际退款金额" width="160"></el-table-column>

                <el-table-column prop="state" label="状态"></el-table-column>

                <el-table-column prop="reason" label="原因" width="200"></el-table-column>

                <el-table-column prop="authName" label="审核人" width="200"></el-table-column>

                <!-- <el-table-column prop="authRemark" label="审核人备注" width="200"></el-table-column> -->

                <el-table-column prop="applyTime" label="申请时间" width="200"></el-table-column>

                <el-table-column prop="authTime" label="审核时间" width="200"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.state=='申请中'" size="mini" type="danger"
                            @click="agree(scope.row, scope.$index)" round>同意</el-button>
                        <el-button v-if="scope.row.state=='申请中'" size="mini" type="primary"
                            @click="refuse(scope.row, scope.$index)" round>拒绝</el-button>
                        <div v-if="scope.row.state!='申请中'">已处理</div>
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
export default {
    name: 'Setting-Refund',
    data () {
        return {
            tableData: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                techName: '',
                techPhone: ''
            }
        };
    },
    methods: {
        handleEdit (row, index) {
            console.log(row, index);
        },
        handleDelete (row, index) {
            console.log(row, index);
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.listRefund()
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listRefund()
        },
        change (pageNum) {
            this.pageIndex = pageNum
            this.listRefund();
        },
        sizeChange (num) {
            console.log("funtion: sizeChange", num);
        },
        async listRefund () {
            const res = await this.$api.post(
                "/user/listRefund",
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
        async agree (row, index) {
            // 此处缺少退款逻辑
            this.$message.error('暂未完成')
        },
        async refuse (row, index) {
            // 此处缺少退款逻辑
            this.$message.error('暂未完成')
        }
    },
    created () {
        this.listRefund()
    }
}
</script>


<style scoped>
</style>
