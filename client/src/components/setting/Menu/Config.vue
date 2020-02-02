<template>
    <div id="Menu-config">
        <el-row>
            <el-col :span="6" class="p-3">
                <div class="mb-4">
                    <el-button type="primary">展开</el-button>
                    <el-button type="success">更新</el-button>
                    <el-button type="info">添加菜单</el-button>
                </div>
                <el-input class="mb-4" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
                <el-tree
                    :data="data"
                    :props="defaultProps"
                    :filter-node-method="filterNode"
                    @node-click="handleNodeClick"
                ></el-tree>
            </el-col>

            <el-col :span="18">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="等级" prop="level">
                                <el-select
                                    @change="levelChange"
                                    v-model="ruleForm.level"
                                    clearable
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in level"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>

                <el-table :data="users" style="width: 100%">
                    <el-table-column prop="userName" label="姓名" width="120"></el-table-column>

                    <el-table-column prop="userPhone" label="手机" width="120"></el-table-column>

                    <el-table-column prop="addTime" label="添加时间" width="160"></el-table-column>

                    <el-table-column prop="role" label="角色" width="80"></el-table-column>

                    <el-table-column prop="off" label="状态" width="120"></el-table-column>

                    <el-table-column label="操作" height="120">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="info"
                                @click="edit(scope.row, scope.$index)"
                                round
                            >编辑</el-button>
                            <el-button
                                size="mini"
                                type="primary"
                                @click="delete(scope.row, scope.$index)"
                                round
                            >删除</el-button>
                            <el-button
                                size="mini"
                                type="success"
                                @click="resetePassword(scope.row, scope.$index)"
                                round
                            >重设密码</el-button>
                        </template>
                    </el-table-column>
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
            </el-col>
        </el-row>
    </div>
</template>


<script>
import util from "../../../../util";

export default {
    name: "MenuConfig",
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    data() {
        return {
            users: [],
            level: [
                {
                    value: 1,
                    label: "一级"
                },
                {
                    value: 2,
                    label: "二级"
                },
                {
                    value: 3,
                    label: "三级"
                }
            ],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                name: "",
                level: ""
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
            ratio: "1",
            data: [
                {
                    id: 1,
                    label: "运营管理",
                    children: [
                        {
                            id: 5,
                            label: "订单管理"
                        }
                    ]
                },
                {
                    id: 2,
                    label: "结算中心",
                    children: []
                },
                {
                    id: 3,
                    label: "数据分析",
                    children: []
                },
                {
                    id: 4,
                    label: "系统设置",
                    children: []
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            },
            filterText: ""
        };
    },
    methods: {
        edit(row, index) {
            this.$store.state.userId = row.userId;
            this.$router.push("/operating/user/detail");
        },
        delete(row, index) {},
        resetPassword(row, index) {
            this.$store.state.userId = row.userId;
            this.$router.push("/operating/userComment/list");
        },
        levelChange(value) {
            console.log(value);
        },
        roleChange() {},
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listAdmin();
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.listAdmin();
        },
        pageChange(num) {
            this.pageIndex = num;
            this.listAdmin();
        },
        sizeChange(num) {
            // this.listAdmin(this.ruleForm);
        },
        async listAdmin(data) {
            const res = await this.$api.post(
                "/menu/list",
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
        async listAgent() {
            const res = await this.$api.get("/agent/getOptions", {});
            this.agentOptions = res.data.data;
        },
        // getCheckedNodes() {
        //     console.log(this.$refs.tree.getCheckedNodes());
        // },
        // getCheckedKeys() {
        //     console.log(this.$refs.tree.getCheckedKeys());
        // },
        // setCheckedNodes() {
        //     this.$refs.tree.setCheckedNodes([
        //         {
        //             id: 5,
        //             label: "二级 2-1"
        //         },
        //         {
        //             id: 9,
        //             label: "三级 1-1-1"
        //         }
        //     ]);
        // },
        // setCheckedKeys() {
        //     this.$refs.tree.setCheckedKeys([3]);
        // },
        // resetChecked() {
        //     this.$refs.tree.setCheckedKeys([]);
        // },
        handleNodeClick(data) {
            console.log(data);
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    },
    created() {
        // this.listAdmin();
    }
};
</script>


<style scoped>
</style>
