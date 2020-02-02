<template>
    <div id="Menu-config">
        <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name">
                <el-input width="120" v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="success" @click="dialogFormVisible = true">新增角色</el-button>
            </el-form-item>
        </el-form>

        <div>
            <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="角色名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="权限分配" :label-width="formLabelWidth">
                        <el-input class="mb-3 w-50 mr-3" placeholder="快速查找" v-model="filterText"></el-input>
                        <el-button type="primary" style="display: inline-block;" @click="checkAll">全选</el-button>
                        <el-button type="danger" style="display: inline-block;" @click="resetChecked">清空</el-button>
                        <div class="mb-3 role-tree">
                            <el-tree :data="data" show-checkbox default-expand-all node-key="_id" ref="tree" accordion
                                highlight-current :props="defaultProps" :filter-node-method="filterNode"></el-tree>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addRole">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <el-table :data="roles" style="width: 100%">
            <el-table-column prop="name" label="名称"></el-table-column>

            <el-table-column prop="addTime" label="添加时间" width="160"></el-table-column>

            <el-table-column label="状态" width="120">
                <template slot-scope="scope">
                    <el-switch @change="offChange(scope.row)" v-model="scope.row.off" active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column label="操作" height="120" width="280">
                <template slot-scope="scope">
                    <el-button size="mini" type="info" @click="edit(scope.row, scope.$index)" round>编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="pageChange"
                layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
        </div>
    </div>
</template>


<script>
import util from "../../../../util";

export default {
    inject: ['reload'],
    name: "MenuConfig",
    watch: {
        filterText (val) {
            this.$refs.tree.filter(val);
        }
    },
    data () {
        return {
            roles: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                name: ""
            },
            loading: true,
            ratio: "1",
            data: [],
            menus: [],
            defaultProps: { children: "children", label: "name" },
            filterText: "",
            dialogFormVisible: false,
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            formLabelWidth: "120px"
        };
    },
    methods: {
        edit (row, index) {
            this.$store.state.userId = row.userId;
            this.$router.push("/operating/user/detail");
        },
        async addRole () {
            this.dialogFormVisible = false;
            const checkedNodes = this.$refs.tree.getCheckedNodes();
            const menus = util.tool.checkMenus(this.data, checkedNodes);
            const res = await this.$api.post("/role/add", {
                name: this.form.name,
                menus: menus,
                addUserName: "测试F"
            });
            if (res.data.success) {
                this.$message.success("新增角色成功");
                this.reload();
            } else {
                this.$message.error("创建角色失败，请联系技术人员！");
            }
        },
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listRole();
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listRole();
        },
        pageChange (num) {
            this.pageIndex = num;
            this.listRole();
        },
        sizeChange (num) {
            this.listRole();
        },
        async listMenu (data) {
            const res = await this.$api.post("/menu/list", {});
            this.data = res.data.data || [];
        },
        async listRole (data) {
            const res = await this.$api.post("/role/list", {});
            this.roles = res.data.data.list || [];
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
        checkAll () {
            this.$refs.tree.setCheckedNodes(this.data);
            const data = [];
            this.data.forEach(item => {
                data.push(item._id);
            });
            this.$refs.tree.setCheckedKeys(data);
        },
        resetChecked () {
            this.$refs.tree.setCheckedKeys([]);
        },
        handleNodeClick (data) {
            // console.log(data);
        },
        filterNode (value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        async offChange (row) {
            await this.$api.post('/role/switch', { _id: row._id, off: !row.off })
            this.$message.success('修改状态成功')
        },
    },
    created () {
        this.listRole();
        this.listMenu();
    }
};
</script>


<style scoped>
.role-tree {
    width: 100%;
    height: 15rem;
    overflow: auto;
}
</style>
