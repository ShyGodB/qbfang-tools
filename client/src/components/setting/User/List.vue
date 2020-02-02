<template>
    <div id="Setting-User">
        <div class="user-search">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="用户姓名" prop="userName">
                            <el-input v-model="ruleForm.userName"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="用户手机" prop="userPhone">
                            <el-input v-model="ruleForm.userPhone"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="状态" prop="off">
                            <el-select @change="stateChange" v-model="ruleForm.off" clearable placeholder="请选择">
                                <el-option v-for="item in off" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="角色" prop="role">
                            <el-checkbox-group @change="roleChange" v-model="ruleForm.role" size="medium">
                                <el-checkbox-button v-for="(role, index) in role" :label="role" :key="(index + 1)"
                                    :index="(index + 1).toString()">{{role}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="success" @click="dialogFormVisible = true">新增</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="users-table">
            <el-table :data="users" style="width: 100%">
                <el-table-column prop="userName" label="姓名"></el-table-column>

                <el-table-column prop="userPhone" label="手机" width="120"></el-table-column>

                <el-table-column prop="addTime" label="添加时间" width="160"></el-table-column>

                <el-table-column prop="role" label="角色" width="80"></el-table-column>

                <el-table-column label="状态" width="120">
                    <template slot-scope="scope">
                        <el-switch @change="offChange(scope.row)" v-model="scope.row.off" active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="edit(scope.row, scope.$index)" round>编辑
                        </el-button>
                        <el-button size="mini" type="success" @click="resetPassword(scope.row, scope.$index)" round>
                            重设密码
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="pageChange"
                    layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
            </div>
        </div>

        <div>
            <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="选择角色" :label-width="formLabelWidth">
                        <el-select @change="roleChange" v-model="form.role" clearable placeholder="请选择">
                            <el-option v-for="item in role" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="请选择分组" :label-width="formLabelWidth">
                        <el-select @change="groupChange" v-model="form.group" clearable placeholder="请选择">
                            <el-option v-for="item in group" :key="item.proxyCode" :label="item.agentName"
                                :value="item.proxyCode"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="手机号" :label-width="formLabelWidth">
                        <el-input v-model="form.userPhone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth">
                        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth">
                        <span class="text-red">默认密码为 z157456</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div>
            <el-dialog title="新增角色" :visible.sync="dialogForm">
                <el-form :model="form">
                    <el-form-item label="选择角色" :label-width="formLabelWidth">
                        <el-select @change="roleChange" v-model="form.role" clearable placeholder="请选择">
                            <el-option v-for="item in role" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="请选择分组" :label-width="formLabelWidth">
                        <el-select @change="groupChange" v-model="form.group" clearable placeholder="请选择">
                            <el-option v-for="item in group" :key="item.proxyCode" :label="item.agentName"
                                :value="item.proxyCode"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="手机号" :label-width="formLabelWidth">
                        <el-input v-model="form.userPhone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth">
                        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth">
                        <span class="text-red">默认密码为 z157456</span>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogForm = false">取 消</el-button>
                    <el-button type="primary" @click="update">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>


<script>
import util from "../../../../util";

export default {
    inject: ['reload'],
    name: "User",
    data () {
        return {
            users: [],
            off: [
                {
                    value: true,
                    label: "停用"
                },
                {
                    value: false,
                    label: "启用"
                }
            ],
            form: {
                group: '',
                role: '',
                userPhone: '',
                password: '',
            },
            dialogFormVisible: false,
            dialogForm: false,
            formLabelWidth: "120px",
            role: [],
            group: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                userName: "",
                userPhone: "",
                role: [],
                off: null
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
            loading: true,
            ratio: "1"
        };
    },
    methods: {
        resetPassword (row, index) {
            this.$prompt('请输入密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(async ({ value }) => {
                if (value.length < 6) {
                    this.$message.error('密码长度不能小于6位')
                    this.reload()
                    return
                }
                this.form.group = row.group
                this.form.role = row.role
                this.form.userPhone = row.userPhone
                this.form.password = value
                this.update()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        roleChange () { },
        groupChange () { },
        stateChange () { },
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listAdmin();
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listAdmin();
        },
        pageChange (num) {
            this.pageIndex = num;
            this.listAdmin();
        },
        sizeChange (num) {
            // this.listAdmin(this.ruleForm);
        },
        async listAdmin (data) {
            const res = await this.$api.post(
                "/admin/list",
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
        async listGroup () {
            const res = await this.$api.get("/agent/listGroup", {});
            this.group = res.data.data.list || [];
        },
        async listRole () {
            const res = await this.$api.get('/role/listRole', {})
            this.role = res.data.data.list || []
        },
        async add () {
            if (this.form.password.length < 6) {
                this.$message.error('密码长度不能小于6位')
                this.reload()
                return
            }
            this.dialogFormVisible = false;
            const res = await this.$api.post("/admin/add", this.form);
            if (res.data.success) {
                this.$message.success("新增角色成功");
                this.reload();
            } else {
                this.$message.error(res.data.msg);
            }
        },
        async edit (row, index) {
            this.dialogForm = true
            this.form.group = row.group
            this.form.role = row.role
            this.form.userPhone = row.userPhone
            this.form.password = ''
        },
        async update () {
            if (this.form.password.length < 6) {
                this.$message.error('密码长度不能小于6位')
                this.reload()
                return
            }
            this.dialogForm = false;
            const res = await this.$api.post('/admin/update', this.form)
            if (res.data.success) {
                this.$message.success("更新成功");
                this.reload();
            } else {
                this.$message.error(res.data.msg);
            }
        },
        async del (row, index) {
            const res = await this.$api.post('/admin/delete', { _id: row._id })
            if (res.data.success) {
                this.$message.success('删除成功')
                this.reload()
            } else {
                this.$message.error(res.data.msg)
            }
        },
        async offChange (row) {
            await this.$api.post('/admin/switch', { _id: row._id, off: !row.off })
            this.$message.success('修改状态成功')
        },
    },
    created () {
        this.listAdmin();
        this.listGroup()
        this.listRole()
    }
};
</script>


<style scoped>
</style>
