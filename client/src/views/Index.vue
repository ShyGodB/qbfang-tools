<template>
    <div id="Index" class="w-100 bg-second">
        <el-row class="index-today">
            <p>今日数据</p>
            <el-col :span="4">
                <el-row>
                    <el-col :span="10">
                        <img style="width: 40px; height: 40px; margin-left: 3rem" src="../assets/img/a1.jpg">
                    </el-col>
                    <el-col :span="14" class="pl-2">
                        <div>交易额</div>
                        <div style="font-size: x-large">{{ today.turnover }}</div>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="4">
                <el-row>
                    <el-col :span="10">
                        <img style="width: 40px; height: 40px; margin-left: 3rem" src="../assets/img/a2.jpg">
                    </el-col>
                    <el-col :span="14" class="pl-2">
                        <div>总单量</div>
                        <div style="font-size: x-large">{{ today.totalOrder }}</div>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="4">
                <el-row>
                    <el-col :span="10">
                        <img style="width: 40px; height: 40px; margin-left: 3rem" src="../assets/img/a3.jpg">
                    </el-col>
                    <el-col :span="14" class="pl-2">
                        <div>超时单</div>
                        <div style="font-size: x-large">{{ today.overTimeOrder }}</div>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="4">
                <el-row>
                    <el-col :span="10">
                        <img style="width: 40px; height: 40px; margin-left: 3rem" src="../assets/img/a4.jpg">
                    </el-col>
                    <el-col :span="14" class="pl-2">
                        <div>用户取消</div>
                        <div style="font-size: x-large">{{ today.cancelOrder }}</div>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="4">
                <el-row>
                    <el-col :span="10">
                        <img style="width: 40px; height: 40px; margin-left: 3rem" src="../assets/img/a5.jpg">
                    </el-col>
                    <el-col :span="14" class="pl-2">
                        <div>交通费</div>
                        <div style="font-size: x-large">{{ today.transFee }}</div>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="4">
                <el-row>
                    <el-col :span="10">
                        <img style="width: 40px; height: 40px; margin-left: 3rem" src="../assets/img/a6.jpg">
                    </el-col>
                    <el-col :span="14" class="pl-2">
                        <div>优惠卷</div>
                        <div style="font-size: x-large">{{ today.couponFee }}</div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <el-row class="index-seven mt-3">
            <p>近7天交易数据</p>
            <el-col :span="14" class="seven-recent-serven">
                <div ref="myChart" id="myChart"></div>
            </el-col>

            <el-col :span="10" class="seven-user-tech h-100">
                <div class="seven-user all" style="background: #ef9f49">
                    <el-row>
                        <el-col :span="12">
                            <img style="width: 90px; margin-top: 50px; margin-left: 100px;"
                                src="../assets/img/totalUser.png" alt="">
                        </el-col>
                        <el-col :span="12" class="index-count height-half"
                            style="text-align: left; margin-top: 60px; color: #ffffff;">
                            <p>{{ userCount }}</p>
                            <p>总用户</p>
                        </el-col>
                    </el-row>
                </div>

                <div class="seven-tech all mt-3" style="background: #58cf79">
                    <el-row>
                        <el-col :span="12">
                            <img style="width: 90px; margin-top: 50px; margin-left: 100px;"
                                src="../assets/img/totalTech.png" alt="">
                        </el-col>
                        <el-col :span="12" class="index-count height-half"
                            style="text-align: left; margin-top: 60px; color: #ffffff;">
                            <p>{{ techCount }}</p>
                            <p>总技师</p>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <el-row class="index-yesterday mt-3">
            <p>昨日数据</p>
            <el-col :span="4">
                <el-row>
                    <el-col :span="10">
                        <img style="width: 40px; height: 40px; margin-left: 3rem" src="../assets/img/a1.jpg">
                    </el-col>
                    <el-col :span="14" class="pl-2">
                        <div>交易额</div>
                        <div style="font-size: x-large">{{ yesterday.turnover }}</div>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="4">
                <el-row>
                    <el-col :span="10">
                        <img style="width: 40px; height: 40px; margin-left: 3rem" src="../assets/img/a2.jpg">
                    </el-col>
                    <el-col :span="14" class="pl-2">
                        <div>总单量</div>
                        <div style="font-size: x-large">{{ yesterday.totalOrder }}</div>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="4">
                <el-row>
                    <el-col :span="10">
                        <img style="width: 40px; height: 40px; margin-left: 3rem" src="../assets/img/a3.jpg">
                    </el-col>
                    <el-col :span="14" class="pl-2">
                        <div>超时单</div>
                        <div style="font-size: x-large">{{ yesterday.overTimeOrder }}</div>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="4">
                <el-row>
                    <el-col :span="10">
                        <img style="width: 40px; height: 40px; margin-left: 3rem" src="../assets/img/a4.jpg">
                    </el-col>
                    <el-col :span="14" class="pl-2">
                        <div>用户取消</div>
                        <div style="font-size: x-large">{{ yesterday.cancelOrder }}</div>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="4">
                <el-row>
                    <el-col :span="10">
                        <img style="width: 40px; height: 40px; margin-left: 3rem" src="../assets/img/a5.jpg">
                    </el-col>
                    <el-col :span="14" class="pl-2">
                        <div>交通费</div>
                        <div style="font-size: x-large">{{ yesterday.transFee }}</div>
                    </el-col>
                </el-row>
            </el-col>

            <el-col :span="4">
                <el-row>
                    <el-col :span="10">
                        <img style="width: 40px; height: 40px; margin-left: 3rem" src="../assets/img/a6.jpg">
                    </el-col>
                    <el-col :span="14" class="pl-2">
                        <div>优惠卷</div>
                        <div style="font-size: x-large">{{ yesterday.couponFee }}</div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <div>
            <p>累计数据</p>
            <el-row class="index-yesterday bg-second mt-3 pl-3">
                <el-col :span="6">
                    <p>总交易额</p>
                    <p>{{turnover}}</p>
                </el-col>
                <el-col :span="6">
                    <p>总盈利额</p>
                    <p>{{ benefit }}</p>
                </el-col>
                <el-col :span="6">
                    <p>总单量</p>
                    <p>{{ totalOrder }}</p>
                </el-col>
                <el-col :span="6">
                    <p>成功单量</p>
                    <p>{{ successOrder }}</p>
                </el-col>
                <el-col :span="6">
                    <p>取消单量</p>
                    <p>{{ cancelOrder }}</p>
                </el-col>
                <el-col :span="6">
                    <p>超时单量</p>
                    <p>{{ overTimeOrder }}</p>
                </el-col>
                <el-col :span="6">
                    <p>交通费</p>
                    <p>{{ transFee }}</p>
                </el-col>
                <el-col :span="6">
                    <p>优惠卷</p>
                    <p>{{ couponFee }}</p>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
import util from "../../util";

export default {
    name: "Index",
    data () {
        return {
            week: [],
            today: {},
            yesterday: {},
            userCount: 0,
            techCount: 0,
            total: {},
            turnover: 0,
            benefit: 0,
            transFee: 0,
            couponFee: 0,
            totalOrder: 0,
            successOrder: 0,
            overTimeOrder: 0,
            cancelOrder: 0,
        };
    },
    methods: {
        async showEcharts (data) {
            const option = {
                color: ["#65a031", "#fc7c00"],
                title: {
                    text: "",
                    subtext: "交易额(项目费/交通费/优惠券)",
                    top: -25
                },
                grid: {
                    height: 310,
                    top: 35
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["单量", "交易额"],
                    top: 6
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {}
                    },
                    right: 13,
                    top: 27,
                    orient: "vertical",
                    itemGap: 15
                },
                xAxis: [
                    {
                        type: "category",
                        data: data.day
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: ""
                    },
                    {
                        type: "value",
                        name: "单量",
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: "单量",
                        type: "line",
                        yAxisIndex: 1,
                        data: data.orders
                    },
                    {
                        name: "交易额",
                        type: "bar",
                        data: data.pay
                    }
                ]
            };
            const myChart = await this.$echarts.init(this.$refs.myChart);
            myChart.setOption(option);
        },
        async getData () {
            const res = await this.$api.get("/index/data", {});
            if (res.data.success) {
                this.today = res.data.data.today;
                this.yesterday = res.data.data.yesterday;
                this.week = {
                    day: res.data.data.week.map(item => item.time),
                    orders: res.data.data.week.map(item => item.totalOrder),
                    pay: res.data.data.week.map(item => item.turnover)
                }
                this.userCount = res.data.data.userCount;
                this.techCount = res.data.data.techCount;
                this.total = res.data.data.total;
                this.turnover = this.total.turnover;
                this.benefit = this.total.benefit;
                this.transFee = this.total.transFee;
                this.couponFee = this.total.couponFee;
                this.totalOrder = this.total.totalOrder;
                this.successOrder = this.total.successOrder;
                this.overTimeOrder = this.total.overTimeOrder;
                this.cancelOrder = this.total.cancelOrder;
                this.showEcharts(this.week);
            } else {
                this.$message.error("主页数据请求错误，请联系技术人员！");
            }
        }
    },
    created () {
        this.getData();
    }
};
</script>


<style scoped>
#myChart {
    width: 100%;
    height: 400px;
}
.index-count {
    display: inline-block;
    text-align: right;
    padding-right: 4rem;
}
.height-half {
    height: 50%;
    margin: auto;
}
.d-inline {
    display: inline;
}
.bg-second {
    background-color: #dddddd;
    padding: 0.5rem;
}
.all {
    background-color: red;
    height: 192px;
    border-radius: 8px;
}
</style>
