<template>
    <div id="Tech">
        <div class="order-search">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="技师姓名" prop="realName">
                            <el-input v-model="ruleForm.realName"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="技师手机" prop="phone">
                            <el-input v-model="ruleForm.phone"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="接单状态" prop="acceptState">
                            <el-checkbox-group @change="acceptChange" v-model="ruleForm.acceptState" size="medium">
                                <el-checkbox-button v-for="(state, index) in acceptState" :label="index"
                                    :key="(index + 1)" :index="(index + 1).toString()">{{state}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="代理商" prop="proxyCodes">
                            <el-cascader v-model="ruleForm.proxyCodes" :options="agentOptions" size="medium"
                                :props="{ expandTrigger: 'hover', size: 'medium' }" @change="agentChange"></el-cascader>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="技师状态" prop="state">
                            <el-checkbox-group @change="techChange" v-model="ruleForm.state" size="medium">
                                <el-checkbox-button v-for="(state, index) in state" :label="(index + 1)"
                                    :key="(index + 1)" :index="(index + 1).toString()">{{state}}</el-checkbox-button>
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

        <div class="tech-table">
            <el-table :data="techs" style="width: 100%">
                <el-table-column prop="techId" label="技师编号" width="120" height="120"></el-table-column>

                <el-table-column prop="realName" label="姓名" width="120" height="120"></el-table-column>

                <el-table-column prop="gender" label="性别" width="80" height="120"></el-table-column>

                <el-table-column prop="phone" label="手机" width="120" height="120"></el-table-column>

                <el-table-column prop="orders" label="订单量" width="160" height="120"></el-table-column>

                <el-table-column prop="clicks" label="点击量" width="120" height="180"></el-table-column>

                <el-table-column prop="star" label="星级" width="100" height="120"></el-table-column>

                <el-table-column prop="group" label="分组" width="100" height="120"></el-table-column>

                <el-table-column prop="state" label="状态" width="100" height="120"></el-table-column>

                <el-table-column label="操作" height="120">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" @click="info(scope.row, scope.$index)" round>详情</el-button>
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
import axios from "axios";

export default {
    name: "Tech",
    data () {
        return {
            acceptState: ["可接单", "进行中", "不可接单"],
            agentOptions: [],
            state: ["正常", "禁用"],
            techs: [],
            allUser: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                realName: "",
                phone: "",
                acceptState: [],
                proxyCodes: [],
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
        info (row, index) {
            this.$store.state.techId = row.techId;
            this.$router.push("/operating/tech/detail");
        },
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listTech();
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listTech();
        },
        acceptChange (value) { },
        agentChange (proxyCodes) {
            this.$store.state.proxyCodes = proxyCodes;
        },
        change (num) {
            this.pageIndex = num;
            this.listTech();
        },
        sizeChange (num) {
            // this.listTech(this.ruleForm);
        },
        techChange (state) {
            console.log(state);
        },
        async listTech () {
            const res = await this.$api.post(
                "/tech/list",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            this.techs = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        },
        async listAgent () {
            const res = await this.$api.get("/agent/getOptions", {});
            this.agentOptions = res.data.data;
        }
    },
    created () {
        this.listTech();
        this.listAgent();
    }
};
</script>


<style scoped>
</style>
