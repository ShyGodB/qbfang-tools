<template>
    <div id="Recharge">
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

                <el-table-column prop="amount" label="地址"></el-table-column>

                <el-table-column prop="state" label="支付状态"></el-table-column>

                <el-table-column prop="source" label="充值来源"></el-table-column>

                <el-table-column prop="createAt" label="地址" width="200"></el-table-column>
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
    name: 'Recharge',
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
                    this.listRecharge()
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listRecharge()
        },
        change (pageNum) {
            this.pageIndex = pageNum
            this.listRecharge();
        },
        sizeChange (num) {
            console.log("funtion: sizeChange", num);
        },
        async listRecharge () {
            const res = await this.$api.post(
                "/user/listRecharge",
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
        this.listRecharge()
    }
}
</script>


<style scoped>
</style>
