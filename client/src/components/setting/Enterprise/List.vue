<template>
    <div class="Setting-Enterprise">
        <div class="user-search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-form">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="success" @click="dialogFormVisible = true">新建</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="users-table">
            <el-table :data="announces" style="width: 100%">
                <el-table-column prop="acId" label="编号"></el-table-column>

                <el-table-column prop="name" label="名称"></el-table-column>

                <el-table-column prop="sort" label="排序" width="100"></el-table-column>

                <el-table-column prop="amount" label="余额" width="100"></el-table-column>

                <el-table-column label="状态" width="120">
                    <template slot-scope="scope">
                        <el-switch @change="offChange(scope.row)" v-model="scope.row.off" active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column prop="addTime" label="添加时间" width="100"></el-table-column>

                <el-table-column prop="addUserName" label="添加人" width="100"></el-table-column>

                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="listOrder(scope.row, scope.$index)" round>订单
                        </el-button>
                        <el-button size="mini" type="success" @click="listUser(scope.row, scope.$index)" round>用户
                        </el-button>
                        <el-button size="mini" type="warning" @click="recharge(scope.row, scope.$index)" round>
                            充值
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="pageChange"
                    layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
            </div>
        </div>

        <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="企业名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.userPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input v-model="form.sort" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addEnterprise">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
export default {
    inject: ['reload'],
    name: 'Setting-Enterprise',
    data () {
        return {
            announces: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            form: {
                name: "",
                userPhone: '',
                sort: 1,
            },
            ruleForm: {
                name: ''
            },
            loading: true,
            ratio: "1",
            dialogFormVisible: false,
            formLabelWidth: '120px'
        };
    },
    methods: {
        listOrder (row, index) {
            this.$store.state.acId = row.acId;
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve("/setting/enterprise/orders");
            window.open(href, "_blank");
        },
        listUser (row, index) {
            this.$store.state.acId = row.acId;
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve("/setting/enterprise/users");
            window.open(href, "_blank");
        },
        recharge (row, index) {
            this.$prompt('请输入充值金额', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(async ({ value }) => {
                const res = await this.$api.post('/enterprise/recharge', { amount: Number(value), _id: row._id, userId: row.userId })
                if (res.data.success) {
                    this.$message.success('充值成功')
                } else {
                    this.$message.error('充值失败')
                }
                this.reload()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        pageChange (num) {
            this.pageIndex = num;
            this.listEnterprise();
        },
        sizeChange (num) { },
        async addEnterprise () {
            if (!this.form.name || !this.form.userPhone || !this.form.sort) {
                this.$message.error('请填写好完整的信息')
                return false
            }
            const res = await this.$api.post('/enterprise/add', this.form)
            if (res.data.success) {
                this.$message.success('添加成功')
                this.reload()
            } else {
                this.$message.error('添加失败')
            }
        },
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listEnterprise();
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listEnterprise();
        },
        async listEnterprise (data) {
            const res = await this.$api.post(
                "/enterprise/list",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            this.announces = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        },
        async offChange (row) {
            await this.$api.post('/enterprise/switch', { _id: row._id, off: !row.off })
            this.$message.success('修改状态成功')
        },
    },
    created () {
        this.listEnterprise()
    }
}
</script>


<style scoped>
</style>
