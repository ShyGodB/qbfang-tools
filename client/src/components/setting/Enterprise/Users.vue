<template>
    <div id="User">
        <div class="user-search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户手机" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="success" @click="dialogFormVisible = true">添加</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="users-table">
            <el-table :data="users" @row-click="rowInfo" style="width: 100%">
                <el-table-column prop="userId" label="用户编号" width="120"></el-table-column>

                <el-table-column prop="danger" label="危险" width="120"></el-table-column>

                <el-table-column prop="nickName" label="姓名" width="80"></el-table-column>

                <el-table-column prop="phone" label="手机" width="120"></el-table-column>

                <el-table-column prop="city" label="城市" width="160"></el-table-column>

                <el-table-column prop="regTime" label="注册时间" width="200"></el-table-column>

                <el-table-column prop="regType" label="注册方式" width="100"></el-table-column>

                <el-table-column prop="regSource" label="注册来源" width="100"></el-table-column>

                <el-table-column label="操作" height="120">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" type="info" @click="info(scope.row, scope.$index)" round>详情</el-button> -->
                        <el-button size="mini" type="success" @click.stop="lookOrders(scope.row, scope.$index)" round>
                            订单
                        </el-button>
                        <el-button size="mini" type="danger" @click.stop="del(scope.row, scope.$index)" round>删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="pageChange"
                    layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
            </div>
        </div>

        <el-dialog title="新增企业用户" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import util from "../../../../util";

export default {
    inject: ['reload'],
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
            form: {
                phone: ''
            },
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                phone: ""
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
            ratio: "1",
            dialogFormVisible: false,
            formLabelWidth: '120px'
        };
    },
    methods: {
        info (row, index) {
            this.$store.state.userId = row.userId;
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve("/operating/user/detail");
            window.open(href, "_blank");
        },
        rowInfo (row) {
            this.$store.state.userId = row.userId;
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve("/operating/user/detail");
            window.open(href, "_blank");
        },
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
        lookOrders (row, index) {
            this.$store.state.userId = row.userId;
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve("/setting/enterprise/userOrders");
            window.open(href, "_blank");
        },
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listUser();
                } else {
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
                "/enterprise/listUser",
                Object.assign(
                    {},
                    this.ruleForm,
                    { acId: this.$store.state.acId },
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
        },
        async addUser () {
            if (this.form.phone.length < 11) {
                this.$message.error('请输入正确的手机号码')
                return false
            }
            const res = await this.$api.post('/enterprise/addUser', { phone: this.form.phone, acId: this.$store.state.acId })
            if (res.data.success) {
                this.$message.success('添加成功')
            } else {
                this.$message.error('添加失败')
            }
            // this.dialogFormVisible = false
            this.reload()
        },
        async del (row, index) {
            await this.$api.post('/enterprise/del', { userId: row.userId })
            this.$message.success('删除成功')
            this.reload()
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
