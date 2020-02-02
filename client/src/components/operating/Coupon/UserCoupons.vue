<template>
    <div id="Settle-Cash">
        <div class="techIncome-search">
            <el-form
                :model="ruleForm"
                :inline="true"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="ruleForm.userName"></el-input>
                </el-form-item>

                <el-form-item label="手机" prop="userPhone">
                    <el-input v-model="ruleForm.userPhone"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="techIncome-table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="userName" label="用户名"></el-table-column>

                <el-table-column prop="userPhone" label="手机" width="200"></el-table-column>

                <el-table-column prop="state" label="状态" width="120"></el-table-column>

                <el-table-column prop="code" label="激活码" width="300"></el-table-column>

                <el-table-column prop="startTime" label="生效时间" width="200"></el-table-column>

                <el-table-column prop="addTime" label="领取时间" width="200"></el-table-column>

                <el-table-column prop="endTime" label="过期时间" width="200"></el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                    ref="fenye"
                    background
                    @size-change="sizeChange"
                    @current-change="pageChange"
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
    inject: ["reload"],
    name: "Settle-Cash",
    data() {
        return {
            tableData: [],
            pageIndex: 1,
            pageSize: 10,
            pageNum: 1,
            ruleForm: {
                userName: "",
                userPhone: ""
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listCoupon();
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.listCoupon();
        },
        pageChange(pageNum) {
            this.pageIndex = pageNum;
            this.listCoupon();
        },
        sizeChange(num) {},
        async listCoupon() {
            const res = await this.$api.post(
                "/coupon/listUserCoupon",
                Object.assign(
                    {},
                    this.ruleForm,
                    { couponStoreId: this.$store.state.couponStoreId },
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
        async give() {}
    },
    created() {
        this.listCoupon();
    }
};
</script>


<style scoped>
</style>
