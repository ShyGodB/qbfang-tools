<template>
    <div class="TechLabel">
        <div class="user-search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">确定</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                    <el-button type="success" @click="openDialog">新增</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="users-table">
            <el-table :data="labels" style="width: 100%">
                <el-table-column prop="name" label="名称"></el-table-column>

                <el-table-column prop="sort" label="排序" width="120"></el-table-column>

                <el-table-column prop="addTime" label="添加时间" width="160"></el-table-column>

                <el-table-column prop="addUserName" label="添加人" width="80"></el-table-column>

                <el-table-column label="状态" width="120">
                    <template slot-scope="scope">
                        <el-switch @change="offChange(scope.row)" v-model="scope.row.off" active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="edit(scope.row, scope.$index)" round>编辑
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
            <el-dialog title="标签" :visible.sync="dialogForm">
                <el-form :model="form">
                    <el-form-item label="名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" :label-width="formLabelWidth">
                        <el-input v-model="form.sort" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth">
                        <el-input v-model="form.remark" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogForm = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div>
            <el-dialog title="标签" :visible.sync="dialog">
                <el-form :model="form">
                    <el-form-item label="名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" :label-width="formLabelWidth">
                        <el-input v-model="form.sort" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth">
                        <el-input v-model="form.remark" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialog = false">取 消</el-button>
                    <el-button type="primary" @click="update">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>


<script>
export default {
    inject: ['reload'],
    name: 'TechLabel',
    data () {
        return {
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            labels: [],
            formLabelWidth: "120px",
            dialogForm: false,
            dialog: false,
            ruleForm: {
                name: ''
            },
            form: {
                name: '',
                sort: 1,
                remark: '',
            }
        };
    },
    methods: {
        pageChange (num) {
            this.pageIndex = num;
            this.listLabel();
        },
        sizeChange (num) {
            this.listLabel();
        },
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listLabel();
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listLabel();
        },
        openDialog () {
            this.dialogForm = true
        },
        async add () {
            const res = await this.$api.post('/tech/addLabel', this.form)
            if (res.data.success) {
                this.$message.success('添加成功')
                this.reload()
            } else {
                this.$message.error('请求错误')
            }
        },
        async update () {
            const res = await this.$api.post('/tech/updateLabel', this.form)
            if (res.data.success) {
                this.$message.success('更新')
                this.reload()
            } else {
                this.$message.error('请求错误')
            }
        },
        async edit (row, index) {
            this.form._id = row._id
            this.form.name = row.name
            this.form.sort = row.sort
            this.form.remark = row.remark
            this.dialog = true
        },
        async listLabel () {
            const res = await this.$api.get('/tech/listLabel', Object.assign({}, this.ruleForm, { pageIndex: this.pageIndex }, { pageSize: this.pageSize }))
            this.labels = res.data.data.list || []
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        },
        async offChange (row) {
            await this.$api.post('/tech/switchTechLabel', { _id: row._id, off: !row.off })
            this.$message.success('修改状态成功')
        },
    },
    created () {
        this.listLabel()
    }
}
</script>


<style scoped>
</style>
