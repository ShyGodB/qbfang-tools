<template>
    <div id="Account">
        <div class="account-search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="用户姓名" prop="nickName">
                    <el-input v-model="ruleForm.nickName"></el-input>
                </el-form-item>
                <el-form-item label="用户手机" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>

                <el-popover placement="top-start" title="标题" width="400" trigger="hover"
                    content="总余额 = 充值余额 + 退款余额，分成余额暂不计入总余额">
                    <el-button slot="reference">余额说明</el-button>
                </el-popover>
            </el-form>
        </div>

        <div class="account-table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="nickName" label="姓名" width="180"></el-table-column>

                <el-table-column prop="phone" label="手机" width="180"></el-table-column>

                <el-table-column prop="amount" label="总余额"></el-table-column>

                <el-table-column prop="amountRecharge" label="充值余额"></el-table-column>

                <el-table-column prop="amountRefund" label="退款余额"></el-table-column>

                <el-table-column prop="amountInvite" label="邀请分成余额" width="180"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="detail(scope.row, scope.$index)" round>明细
                        </el-button>
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
    name: 'Account',
    data () {
        return {
            tableData: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                nickName: '',
                phone: ''
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.listAccount()
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listAccount()
        },
        change (pageNum) {
            this.pageIndex = pageNum
            this.listAccount();
        },
        sizeChange (num) {
            console.log("funtion: sizeChange", num);
        },
        async listAccount () {
            const res = await this.$api.post(
                "/user/listAccount",
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
        async detail () {
            this.$message.error('暂未完成')
        }
    },
    created () {
        this.listAccount()
    }
}
</script>


<style scoped>
</style>
