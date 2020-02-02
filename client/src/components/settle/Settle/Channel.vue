<template>
    <div id="Settle-TechIncome">
        <div class="techIncome-search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="时间区间" prop="times">
                    <el-date-picker v-model="ruleForm.times" type="datetimerange" :picker-options="timeDouble"
                        @change="timeChange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="techIncome-table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="startTime" label="姓名" width="180"></el-table-column>

                <el-table-column prop="endTime" label="手机" width="180"></el-table-column>

                <el-table-column prop="totalServiceFee" label="单量"></el-table-column>

                <el-table-column prop="totalTransFee" label="加单"></el-table-column>

                <el-table-column prop="totalCouponFee" label="加钟"></el-table-column>

                <el-table-column prop="totalRewardFee" label="服务费"></el-table-column>

                <el-table-column prop="outSourceFee" label="加钟费"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="proxy(scope.row, scope.$index)" round>代理结算
                        </el-button>
                        <el-button type="success" size="mini" @click="channel(scope.row, scope.$index)" round>渠道结算
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="pageChange"
                    layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
import util from "../../../../util";

export default {
    name: 'Settle-TechIncome',
    data () {
        return {
            tableData: [],
            timeDouble: util.config.timeDouble,
            pageIndex: 1,
            pageSize: 10,
            pageNum: 1,
            ruleForm: {
                times: []
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.listSettle()
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listSettle()
        },
        pageChange (pageNum) {
            this.pageIndex = pageNum
            this.listSettle();
        },
        sizeChange (num) { },
        timeChange () { },
        proxy (row, index) { },
        channel (row, index) { },
        async listSettle () {
            const res = await this.$api.post(
                "/settle/list",
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
        this.listSettle()
    }
}
</script>


<style scoped>
</style>
