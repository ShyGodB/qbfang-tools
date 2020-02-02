<template>
    <div id="Settle-Cash">
        <div class="techIncome-search">
            <el-form
                :model="ruleForm"
                :inline="true"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="代理商" prop="proxy">
                    <el-select
                        @change="agentChange"
                        v-model="ruleForm.proxy"
                        clearable
                        placeholder="请选择代理商，默认无此限制"
                    >
                        <el-option
                            v-for="item in agentOptions"
                            :key="item.proxyCode"
                            :label="item.agentName"
                            :value="item.proxyCode"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="info" @click="addCouponStore">新增</el-button>
                    <el-button type="success" @click="dialogFormVisible = true">赠送</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="techIncome-table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="名称"></el-table-column>

                <el-table-column prop="type" label="类型" width="80"></el-table-column>

                <el-table-column prop="max" label="发行量" width="100"></el-table-column>

                <el-table-column prop="total" label="生成" width="80"></el-table-column>

                <el-table-column prop="sum" label="领取" width="80"></el-table-column>

                <el-table-column prop="discount" label="折扣" width="80"></el-table-column>

                <el-table-column prop="amount" label="优惠金额" width="80"></el-table-column>

                <el-table-column prop="minPrice" label="最低消费" width="80"></el-table-column>

                <el-table-column prop="purpose" label="用途" width="120"></el-table-column>

                <el-table-column prop="userName" label="创建人" width="120"></el-table-column>

                <el-table-column label="状态" width="120">
                    <template slot-scope="scope">
                        <el-switch
                            @change="offChange(scope.row)"
                            v-model="scope.row.off"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                        ></el-switch>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="260">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="edit(scope.row, scope.$index)"
                            round
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            @click="coupon(scope.row, scope.$index)"
                            round
                        >优惠卷</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            @click="code(scope.row, scope.$index)"
                            round
                        >激活码</el-button>
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

            <el-dialog title="赠送优惠卷" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="手机号" :label-width="formLabelWidth">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠卷类型" prop="stores">
                        <el-checkbox-group
                            @change="storeChange"
                            v-model="form.stores"
                            size="medium"
                        >
                            <el-checkbox-button
                                v-for="(name, index) in stores"
                                :label="name"
                                :key="index + 1"
                                :index="index + 1"
                            >{{name}}</el-checkbox-button>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="give">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="新增优惠卷仓" :fullscreen="true" :visible.sync="dialog">
                <el-form :model="storeForm" ref="storeForm" label-width="100px">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="storeForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="类型" prop="danger">
                                <el-select
                                    @change="typeChange"
                                    v-model="storeForm.type"
                                    clearable
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in storeTypes"
                                        :key="item"
                                        :label="item"
                                        :value="item"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="折扣" prop="discount">
                                <el-input v-model="storeForm.discount" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="优惠金额" prop="amount">
                                <el-input v-model="storeForm.amount" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="门槛" prop="minPrice">
                                <el-input v-model="storeForm.minPrice" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="总发行量" prop="max">
                                <el-input v-model="storeForm.max" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="限领" prop="pick">
                                <el-input v-model="storeForm.pick" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="有效天数" prop="indate">
                                <el-input v-model="storeForm.indate" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="限制会员级别" prop="level">
                                <el-input v-model="storeForm.level" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="用途" prop="purpose">
                                <el-input v-model="storeForm.purpose" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="代理商" prop="proxy">
                                <el-select
                                    @change="agentChange"
                                    v-model="storeForm.proxy"
                                    clearable
                                    placeholder="请选择代理商，默认无此限制"
                                >
                                    <el-option
                                        v-for="item in agentOptions"
                                        :key="item.proxyCode"
                                        :label="item.agentName"
                                        :value="item.proxyCode"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label="限定项目" prop="projects">
                                <el-checkbox-group
                                    @change="projectChange"
                                    v-model="storeForm.projects"
                                    size="medium"
                                >
                                    <el-checkbox-button
                                        v-for="item in projects"
                                        :label="item.projectId"
                                        :key="item.proejctId"
                                        :index="item.projectId"
                                    >{{item.name}}</el-checkbox-button>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="项目操作">
                                <el-button type="primary" @click="selectAll('add')">全选</el-button>
                                <el-button type="success" @click="selectFormal('add')">正常</el-button>
                                <el-button type="warning" @click="selectAddClock('add')">加钟</el-button>
                                <el-button type="danger" @click="selectCancel('add')">取消</el-button>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="生效时间" prop="startTime">
                                <el-date-picker
                                    v-model="storeForm.startTime"
                                    type="datetime"
                                    placeholder="选择生效时间"
                                    default-time="12:00:00"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="备注" prop="remark">
                                <el-input v-model="storeForm.remark" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialog = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="编辑" :fullscreen="true" :visible.sync="editDialog">
                <el-form :model="editForm" ref="editForm" label-width="100px">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="editForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="类型" prop="danger">
                                <el-select
                                    @change="typeChange"
                                    v-model="editForm.type"
                                    clearable
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in storeTypes"
                                        :key="item"
                                        :label="item"
                                        :value="item"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="折扣" prop="discount">
                                <el-input v-model="editForm.discount" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="优惠金额" prop="amount">
                                <el-input v-model="editForm.amount" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="门槛" prop="minPrice">
                                <el-input v-model="editForm.minPrice" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="总发行量" prop="max">
                                <el-input v-model="editForm.max" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="限领" prop="pick">
                                <el-input v-model="editForm.pick" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="有效天数" prop="indate">
                                <el-input
                                    @input="indateChange"
                                    v-model="editForm.indate"
                                    autocomplete="off"
                                ></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="限制会员级别" prop="level">
                                <el-input v-model="editForm.level" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="用途" prop="purpose">
                                <el-input v-model="editForm.purpose" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="代理商" prop="proxy">
                                <el-select
                                    @change="agentChange"
                                    v-model="editForm.proxy"
                                    clearable
                                    placeholder="请选择代理商，默认无此限制"
                                >
                                    <el-option
                                        v-for="item in agentOptions"
                                        :key="item.proxyCode"
                                        :label="item.agentName"
                                        :value="item.proxyCode"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label="限定项目" prop="projects">
                                <el-checkbox-group
                                    @change="projectChange"
                                    v-model="editForm.projects"
                                    size="medium"
                                >
                                    <el-checkbox-button
                                        v-for="item in projects"
                                        :label="item.projectId"
                                        :key="item.proejctId"
                                        :index="item.projectId"
                                    >{{item.name}}</el-checkbox-button>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label="项目操作">
                                <el-button type="primary" @click="selectAll('edit')">全选</el-button>
                                <el-button type="success" @click="selectFormal('edit')">正常</el-button>
                                <el-button type="warning" @click="selectAddClock('edit')">加钟</el-button>
                                <el-button type="danger" @click="selectCancel('edit')">取消</el-button>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="生效时间" prop="startTime">
                                <el-date-picker
                                    @change="startTimeChange"
                                    v-model="editForm.startTime"
                                    type="datetime"
                                    placeholder="选择生效时间"
                                    default-time="12:00:00"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="过期时间" prop="endTime">
                                <el-date-picker
                                    v-model="editForm.endTime"
                                    type="datetime"
                                    placeholder="过期事件"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="备注" prop="remark">
                                <el-input v-model="editForm.remark" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="editDialog = false">取 消</el-button>
                    <el-button type="primary" @click="update">确定修改</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>


<script>
import util from "../../../../util";

export default {
    inject: ["reload"],
    name: "Settle-Cash",
    data() {
        return {
            tableData: [],
            pageIndex: 1,
            pageSize: 10,
            pageNum: 1,
            dialogFormVisible: false,
            dialog: false,
            formLabelWidth: "120px",
            agentOptions: [],
            ruleForm: {
                name: "",
                proxy: ""
            },
            form: {
                phone: "",
                stores: []
            },
            projects: [],
            existProjects: [],
            storeTypes: ["满减", "折扣", "首单优惠"],
            storeForm: {
                name: "",
                type: "满减",
                discount: 0.8,
                amount: 10,
                minPrice: 199,
                max: 99999999, // 发放总量
                pick: 1, // 限领
                indate: 365,
                purpose: "促销",
                level: 0,
                projects: [],
                proxy: "",
                remark: "",
                startTime: new Date()
            },
            editDialog: false,
            editForm: {
                projects: [27]
            },
            stores: []
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listCoupon();
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.listCoupon();
        },
        pageChange(pageNum) {
            this.pageIndex = pageNum;
            this.listCoupon();
        },
        sizeChange(num) {},
        agentChange() {},
        typeChange() {},
        projectChange() {},
        agentChange() {},
        editChange() {},
        storeChange(value) {
            console.log(value);
        },
        indateChange(value) {
            const date = new Date();
            var time =
                date.getTime(this.editForm.startTime) +
                Number(value) * 24 * 60 * 60 * 1000;
            this.editForm.endTime = new Date(time);
        },
        startTimeChange(value) {
            const date = new Date();
            var time =
                date.getTime(this.editForm.startTime) +
                Number(this.editForm.indate || 0) * 24 * 60 * 60 * 1000;
            this.editForm.endTime = new Date(time);
        },
        selectAll(type) {
            if (type === "add") {
                this.storeForm.projects = [];
                this.projects.forEach(item => {
                    this.storeForm.projects.push(item.projectId);
                });
            } else {
                this.editForm.projects = [];
                this.projects.forEach(item => {
                    this.editForm.projects.push(item.projectId);
                });
            }
        },
        selectFormal(type) {
            if (type === "add") {
                this.storeForm.projects = [];
                this.projects.forEach(item => {
                    if (item.category === "正常") {
                        this.storeForm.projects.push(item.projectId);
                    }
                });
            } else {
                this.editForm.projects = [];
                this.projects.forEach(item => {
                    if (item.category === "正常") {
                        this.editForm.projects.push(item.projectId);
                    }
                });
            }
        },
        selectAddClock(type) {
            if (type === "add") {
                this.storeForm.projects = [];
                this.projects.forEach(item => {
                    if (item.category === "加钟") {
                        this.storeForm.projects.push(item.projectId);
                    }
                });
            } else {
                this.editForm.projects = [];
                this.projects.forEach(item => {
                    if (item.category === "加钟") {
                        this.editForm.projects.push(item.projectId);
                    }
                });
            }
        },
        selectCancel(type) {
            if (type === "add") {
                this.storeForm.projects = [];
            } else {
                this.editForm.projects = [];
            }
        },
        async edit(row) {
            this.editDialog = true;
            const res = await this.$api.post("/coupon/getStore", {
                _id: row._id
            });
            this.existProjects = res.data.data.projects;
            await this.listProject();
            await this.listAgent();
            this.editForm = res.data.data;
        },
        coupon(row) {
            this.$store.state.couponStoreId = row._id.toString();
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve(
                "/operating/coupon/userCoupons"
            );
            window.open(href, "_blank");
        },
        async code(row) {
            this.$store.state.couponStoreId = row._id.toString();
            localStorage.setItem("store", JSON.stringify(this.$store.state));
            const { href } = this.$router.resolve("/operating/coupon/codes");
            window.open(href, "_blank");
        },
        async offChange(row) {
            await this.$api.post("/coupon/switch", {
                _id: row._id,
                off: !row.off
            });
            this.$message.success("修改状态成功");
        },
        async listCoupon() {
            const res = await this.$api.post(
                "/coupon/list",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            this.tableData = res.data.data.list || [];
            this.stores = this.tableData.map(item => {
                return item.off ? item.name : "";
            });
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        },
        async listProject(type) {
            const res = await this.$api.get("/project/list", {});
            this.projects = res.data.data.list;
            this.projects.forEach(item => {
                this.storeForm.projects.push(item.projectId);
            });
            return res.data.data.list;
        },
        async listAgent() {
            const res = await this.$api.get("/agent/listAgent", {});
            this.agentOptions = res.data.data;
        },
        async update() {
            const projects = util.tool.checkProject(
                this.projects,
                this.editForm.projects
            );
            this.editForm.projects = projects;
            this.editDialog = false;
            const res = await this.$api.post("/coupon/updateStore", {
                store: this.editForm
            });
            if (res.data.success) {
                this.$message.success("修改成功");
                this.reload();
            } else {
                this.$message.error(res.data.msg || "修改失败");
            }
        },
        async give() {
            this.dialogFormVisible = false;
            const res = await this.$api.post("/coupon/give", this.form);
            if (res.data.success) {
                this.$message.success("赠送成功");
                this.reload();
            } else {
                this.$message.error(res.data.msg || "赠送失败");
            }
        },
        addCouponStore() {
            this.dialog = true;
            this.listAgent();
            this.listProject();
        },
        async add() {
            const projects = util.tool.checkProject(
                this.projects,
                this.storeForm.projects
            );
            this.storeForm.projects = projects;
            this.dialog = false;
            const res = await this.$api.post(
                "/coupon/addStore",
                this.storeForm
            );
            if (res.data.success) {
                this.$message.success("添加成功");
                this.reload();
            } else {
                this.$message.error(res.data.msg || "添加失败");
            }
        }
    },
    created() {
        this.listCoupon();
        this.listAgent();
    }
};
</script>


<style scoped>
</style>
