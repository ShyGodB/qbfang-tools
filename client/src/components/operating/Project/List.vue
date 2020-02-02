<template>
    <div id="Project">
        <div class="order-search">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="状态" prop="state">
                            <el-checkbox-group
                                @change="stateChange"
                                v-model="ruleForm.state"
                                size="medium"
                            >
                                <el-checkbox-button
                                    v-for="(state, index) in state"
                                    :label="state"
                                    :key="(index + 1)"
                                    :index="(index + 1).toString()"
                                >{{state}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="类别" prop="category">
                            <el-checkbox-group
                                @change="categoryChange"
                                v-model="ruleForm.category"
                                size="medium"
                            >
                                <el-checkbox-button
                                    v-for="(category, index) in category"
                                    :label="category"
                                    :key="(index + 1)"
                                    :index="(index + 1).toString()"
                                >{{category}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="展示属性" prop="view">
                            <el-checkbox-group
                                @change="viewChange"
                                v-model="ruleForm.view"
                                size="medium"
                            >
                                <el-checkbox-button
                                    v-for="(view, index) in view"
                                    :label="view"
                                    :key="(index + 1)"
                                    :index="(index + 1).toString()"
                                >{{view}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="success" @click="dialogAdd = true">添加</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="project-table">
            <el-table :data="projects" style="width: 100%">
                <el-table-column prop="projectId" label="项目编号" width="120" height="120"></el-table-column>

                <el-table-column prop="name" label="名字" width="200" height="120"></el-table-column>

                <el-table-column prop="originalPrice" label="原价" width="120" height="120"></el-table-column>

                <el-table-column prop="price" label="默认价格" width="160" height="120"></el-table-column>

                <el-table-column prop="isFirst" label="是否首单" width="120" height="120"></el-table-column>

                <el-table-column prop="time" label="时长" width="100" height="120"></el-table-column>

                <el-table-column prop="category" label="项目类别" width="100" height="120"></el-table-column>

                <el-table-column prop="view" label="展示属性" width="100" height="120"></el-table-column>

                <el-table-column prop="saleCount" label="销售量" width="100" height="120"></el-table-column>

                <el-table-column prop="sort" label="排序" width="180" height="120"></el-table-column>

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

                <el-table-column label="操作" width="240">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="success"
                            @click="copy(scope.row, scope.$index)"
                            round
                        >复制</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="edit(scope.row, scope.$index)"
                            round
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="del(scope.row, scope.$index)"
                            round
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                    ref="fenye"
                    background
                    @size-change="sizeChange"
                    @current-change="change"
                    layout="prev, pager, next"
                    :hide-on-single-page="true"
                    :page-count="pageNum"
                ></el-pagination>
            </div>
        </div>

        <el-dialog title="添加项目" :fullscreen="true" :visible.sync="dialogAdd">
            <el-form :model="addForm" ref="addForm" label-width="100px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="addForm.name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="原始价格" prop="originalPrice">
                            <el-input v-model="addForm.originalPrice" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="服务时长" prop="time">
                            <el-input v-model="addForm.time" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类别" prop="category">
                            <el-select
                                @change="categoryChange"
                                v-model="addForm.category"
                                clearable
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in category"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="服务范围" prop="cityIds">
                            <!-- <el-input v-model="addForm.cityIds" autocomplete="off"></el-input> -->
                            123
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="起购数量" prop="count">
                            <el-input v-model="addForm.min" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="限购数量" prop="count">
                            <el-input v-model="addForm.max" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="9">
                        <el-form-item label="路程范围-min" prop="minPrice">
                            <el-input v-model="addForm.minDistance" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="9">
                        <el-form-item label="路程范围-max" prop="minPrice">
                            <el-input v-model="addForm.maxDistance" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="定价方式" prop="category">
                            <el-select
                                @change="categoryChange"
                                v-model="addForm.saleType"
                                clearable
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in saleType"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="指导价格" prop="guidePrice">
                            <el-input v-model="addForm.guidePrice" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="服务部位" prop="body">
                            <el-input v-model="addForm.body" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="服务功效" prop="effect">
                            <el-input v-model="addForm.effect" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="上架设置" prop="state">
                            <el-radio-group @change="addStateChange" v-model="addForm.state">
                                <el-radio :label="'正常'">上架</el-radio>
                                <el-radio :label="'下架'">下架</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="标签" prop="tags">
                            <el-radio-group @change="addTagsChange" v-model="addForm.tags">
                                <el-radio :label="'上新'">上新</el-radio>
                                <el-radio :label="'特价'">特价</el-radio>
                                <el-radio :label="'热门'">热门</el-radio>
                                <el-radio :label="'五星'">五星</el-radio>
                                <el-radio :label="'限时'">限时</el-radio>
                                <el-radio :label="''">无</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="展示属性" prop="view">
                            <el-radio-group @change="addViewChange" v-model="addForm.view">
                                <el-radio :label="'全部展示'">全部展示</el-radio>
                                <el-radio :label="'服务列表'">服务列表</el-radio>
                                <el-radio :label="'技师列表'">技师列表</el-radio>
                                <el-radio :label="'都不展示'">都不展示</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="是否首单" prop="isFirst">
                            <el-radio-group @change="addIsFirstChange" v-model="addForm.isFirst">
                                <el-radio :label="true">是</el-radio>
                                <el-radio :label="false">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAdd = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑项目" :fullscreen="true" :visible.sync="dialogEdit">
            <el-form :model="editForm" ref="editForm" label-width="100px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="editForm.name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="原始价格" prop="originalPrice">
                            <el-input v-model="editForm.originalPrice" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="服务时长" prop="time">
                            <el-input v-model="editForm.time" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类别" prop="category">
                            <el-select
                                @change="categoryChange"
                                v-model="editForm.category"
                                clearable
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in category"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="服务范围" prop="cityIds">
                            <!-- <el-input v-model="addForm.cityIds" autocomplete="off"></el-input> -->
                            123
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="起购数量" prop="count">
                            <el-input v-model="editForm.min" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="限购数量" prop="count">
                            <el-input v-model="editForm.max" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="9">
                        <el-form-item label="路程范围-min" prop="minPrice">
                            <el-input v-model="editForm.minDistance" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="9">
                        <el-form-item label="路程范围-max" prop="minPrice">
                            <el-input v-model="editForm.maxDistance" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="定价方式" prop="category">
                            <el-select
                                @change="categoryChange"
                                v-model="editForm.saleType"
                                clearable
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in saleType"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="指导价格" prop="guidePrice">
                            <el-input v-model="editForm.guidePrice" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="服务部位" prop="body">
                            <el-input v-model="editForm.body" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="服务功效" prop="effect">
                            <el-input v-model="editForm.effect" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="上架设置" prop="state">
                            <el-radio-group @change="addStateChange" v-model="editForm.state">
                                <el-radio :label="'正常'">上架</el-radio>
                                <el-radio :label="'下架'">下架</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="标签" prop="tags">
                            <el-radio-group @change="addTagsChange" v-model="editForm.tags">
                                <el-radio :label="'上新'">上新</el-radio>
                                <el-radio :label="'特价'">特价</el-radio>
                                <el-radio :label="'热门'">热门</el-radio>
                                <el-radio :label="'五星'">五星</el-radio>
                                <el-radio :label="'限时'">限时</el-radio>
                                <el-radio :label="''">无</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="展示属性" prop="view">
                            <el-radio-group @change="addViewChange" v-model="editForm.view">
                                <el-radio :label="'全部展示'">全部展示</el-radio>
                                <el-radio :label="'服务列表'">服务列表</el-radio>
                                <el-radio :label="'技师列表'">技师列表</el-radio>
                                <el-radio :label="'都不展示'">都不展示</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="是否首单" prop="isFirst">
                            <el-radio-group @change="addIsFirstChange" v-model="editForm.isFirst">
                                <el-radio :label="true">是</el-radio>
                                <el-radio :label="false">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <!-- <el-col :span="24">
                        <el-form-item label="服务介绍" prop="introduction">
                            <project-introduction :introduction="editForm.introduction"></project-introduction>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="服务介绍" prop="taboo">
                            <project-taboo :taboo="editForm.taboo"></project-taboo>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="服务介绍" prop="notice">
                            <project-notice :notice="editForm.notice"></project-notice>
                        </el-form-item>
                    </el-col>-->

                    <!-- <el-col :span="3">
                        <el-form-item label="项目文件" prop="upload">
                            <el-select
                                @change="fileChange"
                                v-model="file"
                                clearable
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in fileType"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="18">
                        <el-form-item label="项目图片" prop="upload">
                            <el-upload
                                class="upload-demo"
                                ref="upload"
                                action="http://127.0.0.1:3102/api/admin/file/sync"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                :auto-upload="false"
                                multiple
                                list-type="picture-card"
                            >
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <el-button
                                    style="margin-left: 10px;"
                                    size="small"
                                    type="success"
                                    @click="submitUpload"
                                >上传到服务器</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>-->
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdit = false">取 消</el-button>
                <el-button type="primary" @click="updateProject">确认修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ProjectIntroduction from "../../doc/ProjectIntroduction";
import ProjectTaboo from "../../doc/ProjectTaboo";
import ProjectNotice from "../../doc/ProjectNotice";

export default {
    inject: ["reload"],
    name: "Project",
    components: {
        "project-introduction": ProjectIntroduction,
        "project-taboo": ProjectTaboo,
        "project-notice": ProjectNotice
    },
    data() {
        return {
            state: ["正常", "禁用"],
            category: ["正常", "加钟"],
            view: ["全部展示", "服务列表", "技师列表", "都不显示"],
            saleType: ["指导价格", "技师星级", "限时促销"],
            fileType: ["小图", "中图", "大图", "视频"],
            file: "小图",
            projects: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                state: [],
                category: [],
                view: []
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
            dialogAdd: false,
            dialogEdit: false,
            addForm: {
                name: "",
                cityIds: [],
                originalPrice: 0,
                price: 0,
                state: "正常",
                guidePrice: 0,
                priceInfo: "",
                conditions: "",
                isFirst: false,
                time: "",
                category: "",
                view: "全部展示",
                sort: "",
                introduction: "",
                taboo: "",
                notice: "",
                tags: "上新",
                body: "",
                effect: "",
                imgMin: "",
                imgMiddle: "",
                imgMax: "",
                imgVideo: "",
                saleType: ""
            },
            fileList: [],
            editForm: {}
        };
    },
    methods: {
        async edit(row, index) {
            this.dialogEdit = true;
            const res = await this.$api.get("/project/detail", {
                _id: row._id
            });
            this.editForm = res.data.data;
            this.$store.state.introduction = this.editForm.introduction;
            this.$store.state.taboo = this.editForm.taboo;
            this.$store.state.notice = this.editForm.notice;
        },
        async del(row, index) {
            this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    await this.$api.post("/project/del", { _id: row._id });
                    this.$message.success("删除成功");
                    this.reload();
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        async copy(row, index) {
            await this.$api.post("/project/copy", { _id: row._id });
            this.$message.success("复制成功");
            this.reload();
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listProject();
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.listProject();
        },
        stateChange() {},
        categoryChange() {},
        viewChange() {},
        fileChange(value) {
            console.log(value);
        },
        addStateChange(value) {
            console.log(value);
        },
        addTagsChange(value) {
            console.log(value);
        },
        addViewChange(value) {
            console.log(value);
        },
        addIsFirstChange(value) {
            console.log(value);
        },
        change(num) {
            this.pageIndex = num;
            this.listProject();
        },
        sizeChange(num) {
            // this.listProject(this.ruleForm);
        },
        async listProject() {
            const res = await this.$api.post(
                "/project/list",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            this.projects = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        },
        async offChange(row) {
            await this.$api.post("/project/switch", {
                _id: row._id,
                off: !row.off
            });
            this.$message.success("修改状态成功");
        },
        async add() {},
        async updateProject() {
            this.editForm.introduction = this.$store.state.introduction;
            this.editForm.taboo = this.$store.state.taboo;
            this.editForm.notice = this.$store.state.notice;
            await this.$api.post("/project/update", { project: this.editForm });
            this.$message.success("修改成功!");
            this.reload();
        },
        async submitUpload() {
            const res = await this.$refs.upload.submit();
            console.log(res);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    },
    created() {
        this.listProject();
    }
};
</script>

<style scoped>
</style>
