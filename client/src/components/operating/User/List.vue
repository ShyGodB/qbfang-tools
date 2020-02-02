<template>
    <div id="User">
        <div class="user-search">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="用户姓名" prop="nickName">
                            <el-input v-model="ruleForm.nickName"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="用户手机" prop="userPhone">
                            <el-input v-model="ruleForm.userPhone"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="用户编号" prop="userId">
                            <el-input v-model="ruleForm.userId"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="时间区间" prop="times">
                            <el-date-picker v-model="ruleForm.times" type="datetimerange" :picker-options="timeDouble"
                                @change="timeChange" range-separator="至" start-placeholder="开始日期"
                                end-placeholder="结束日期"></el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="注册来源" prop="regSource">
                            <el-select @change="sourceChange" v-model="ruleForm.regSource" clearable placeholder="请选择">
                                <el-option v-for="item in sources" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="代理商" prop="proxyCodes">
                            <el-cascader v-model="ruleForm.proxyCodes" :options="agentOptions" size="medium"
                                :props="{ expandTrigger: 'hover', size: 'medium' }" @change="agentChange"></el-cascader>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="性别" prop="gender">
                            <el-checkbox-group @change="genderChange" v-model="ruleForm.gender" size="medium">
                                <el-checkbox-button v-for="(gender, index) in genders" :label="gender"
                                    :key="(index + 1)" :index="(index + 1).toString()">{{gender}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="设备" prop="system">
                            <el-checkbox-group @change="systemChange" v-model="ruleForm.system" size="medium">
                                <el-checkbox-button v-for="(system, index) in systems" :label="system.value"
                                    :key="(index + 1)" :index="(index + 1).toString()">{{system.name}}
                                </el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="危险等级" prop="danger">
                            <el-select @change="dangerChange" v-model="ruleForm.danger" clearable placeholder="请选择">
                                <el-option v-for="item in dangers" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="users-table">
            <el-table :data="users" style="width: 100%">
                <el-table-column prop="userId" label="用户编号" width="80"></el-table-column>

                <el-table-column prop="danger" label="危险" width="80"></el-table-column>

                <el-table-column prop="nickName" label="姓名"></el-table-column>

                <el-table-column prop="phone" label="手机" width="120"></el-table-column>

                <el-table-column prop="city" label="城市" width="80"></el-table-column>

                <el-table-column prop="regTime" label="注册时间" width="200"></el-table-column>

                <el-table-column prop="regType" label="注册方式" width="100"></el-table-column>

                <el-table-column prop="regSource" label="注册来源" width="100"></el-table-column>

                <el-table-column prop="state" label="状态" width="100"></el-table-column>

                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <el-button size="mini" type="info" @click="info(scope.row, scope.$index)" round>详情</el-button>
                        <el-button size="mini" type="primary" @click="edit(scope.row, scope.$index)" round>编辑
                        </el-button>
                        <el-button size="mini" type="success" @click="lookComments(scope.row, scope.$index)" round>查看评论
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
    name: "User",
    data () {
        return {
            timeDouble: util.config.timeDouble,
            agentOptions: [],
            users: [],
            allUser: [],
            genders: ["男", "女"],
            systems: [
                {
                    name: "苹果",
                    value: "ios"
                },
                {
                    name: "安卓",
                    value: "android"
                }
            ],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                nickName: "",
                phone: "",
                userId: "",
                proxyCodes: [],
                times: [],
                gender: [],
                system: [],
                danger: "",
                regSource: ""
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
            dangers: [
                {
                    value: 0,
                    label: "无(绿色)"
                },
                {
                    value: 1,
                    label: "一级(红色)"
                },
                {
                    value: 2,
                    label: "二级(黄色)"
                },
                {
                    value: 3,
                    label: "三级(蓝色)"
                }
            ],
            sources: [
                {
                    value: "小程序",
                    label: "小程序"
                },
                {
                    value: "APP",
                    label: "APP"
                },
                {
                    value: "到位",
                    label: "到位"
                },
                {
                    value: "口碑",
                    label: "口碑"
                }
            ],
            loading: true,
            ratio: "1"
        };
    },
    methods: {
        info (row, index) {
            this.$store.state.userId = row.userId;
            this.$router.push("/operating/user/detail");
        },
        edit (row, index) { },
        getProxyCodes (proxyCodes) {
            this.ruleForm.proxyCodes = proxyCodes;
            console.log(this.ruleForm);
        },
        getDoubleTime (times) {
            this.ruleForm.times = times;
            console.log(this.ruleForm);
        },
        genderChange (value) {
            console.log(value);
        },
        systemChange (value) {
            console.log(this.ruleForm);
        },
        dangerChange (dander) {
            console.log(this.ruleForm);
        },
        sourceChange (dander) {
            console.log(this.ruleForm);
        },
        timeChange (times) {
            this.$store.state.times = times;
        },
        agentChange (proxyCodes) {
            console.log(proxyCodes);
            this.$store.state.proxyCodes = proxyCodes;
        },
        lookComments (row, index) {
            this.$store.state.userId = row.userId;
            this.$router.push("/operating/userComment/list");
        },
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listUser();
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listUser();
        },
        pageChange (num) {
            this.pageIndex = num;
            this.listUser();
        },
        sizeChange (num) {
            // this.listUser(this.ruleForm);
        },
        async listUser (data) {
            const res = await this.$api.post(
                "/user/list",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            this.users = res.data.data.list || [];
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
        this.listUser();
        this.listAgent();
    }
};
</script>


<style scoped>
</style>
