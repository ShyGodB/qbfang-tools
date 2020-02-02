<template>
    <div id="TechIncome">
        <div class="techIncome-search">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="姓名" prop="realName">
                            <el-input v-model="ruleForm.realName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机" prop="phone">
                            <el-input v-model="ruleForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="时间区间" prop="times">
                            <el-date-picker
                                v-model="ruleForm.times"
                                type="datetimerange"
                                :picker-options="timeDouble"
                                @change="timeChange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

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

                <el-table-column prop="orders" label="单量"></el-table-column>

                <el-table-column prop="add" label="加单"></el-table-column>

                <el-table-column prop="children" label="加钟"></el-table-column>

                <el-table-column prop="payService" label="服务费"></el-table-column>

                <el-table-column prop="payClock" label="加钟费"></el-table-column>

                <el-table-column prop="payTrans" label="交通费"></el-table-column>

                <el-table-column prop="payCoupon" label="优惠卷"></el-table-column>

                <el-table-column prop="rewardAmount" label="打赏"></el-table-column>
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
import util from "../../../../util";

export default {
    name: "TechIncome",
    data() {
        return {
            tableData: [],
            timeDouble: util.config.timeDouble,
            pageIndex: 1,
            pageSize: 10,
            pageNum: 1,
            ruleForm: {
                realName: "",
                phone: "",
                times: []
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listTechIncome();
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.listTechIncome();
        },
        pageChange(pageNum) {
            this.pageIndex = pageNum;
            this.listTechIncome();
        },
        sizeChange(num) {},
        timeChange() {},
        async listTechIncome() {
            const res = await this.$api.post(
                "/tech/listIncome",
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
    created() {
        this.listTechIncome();
    }
};
</script>


<style scoped>
</style>
