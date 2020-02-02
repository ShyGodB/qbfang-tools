<template>
    <div id="Settle-Cash">
        <div class="techIncome-search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="realName">
                    <el-input v-model="ruleForm.realName"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="techIncome-table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="realName" label="姓名" width="180"></el-table-column>

                <el-table-column prop="phone" label="手机" width="180"></el-table-column>

                <el-table-column prop="amount" label="提现金额"></el-table-column>

                <el-table-column prop="state" label="状态"></el-table-column>

                <el-table-column prop="time" label="提现时间"></el-table-column>

                <el-table-column prop="arriveTime" label="到账时间"></el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="pageChange"
                    layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Settle-Cash',
    data () {
        return {
            tableData: [],
            pageIndex: 1,
            pageSize: 10,
            pageNum: 1,
            ruleForm: {
                realName: '',
                phone: '',
                times: []
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.listCash()
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listCash()
        },
        pageChange (pageNum) {
            this.pageIndex = pageNum
            this.listCash();
        },
        sizeChange (num) { },
        async listCash () {
            const res = await this.$api.post(
                "/cash/list",
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
        }
    },
    created () {
        this.listCash()
    }
}
</script>


<style scoped>
</style>
