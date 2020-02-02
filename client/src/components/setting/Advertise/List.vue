<template>
    <div class="Setting-Advertise">
        <div class="user-search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="success" @click="create">新建</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="users-table">
            <el-table :data="announces" style="width: 100%">
                <el-table-column prop="title" label="标题"></el-table-column>

                <el-table-column prop="img" label="图片" width="120">
                    <template slot-scope="scope">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.img"></el-image>
                    </template>
                </el-table-column>

                <el-table-column prop="wxAppUrl" label="小程序地址" width="200">
                </el-table-column>

                <el-table-column prop="appUrl" label="App地址" width="200">
                </el-table-column>

                <el-table-column prop="h5Url" label="H5地址" width="200">
                </el-table-column>

                <el-table-column prop="sort" label="排序" width="100"></el-table-column>

                <el-table-column label="状态" width="120">
                    <template slot-scope="scope">
                        <el-switch @change="offChange(scope.row)" v-model="scope.row.off" active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column prop="addTime" label="添加时间" width="100"></el-table-column>

                <el-table-column prop="addUserName" label="添加人" width="100"></el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination ref="fenye" background @size-change="sizeChange" @current-change="pageChange"
                    layout="prev, pager, next" :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    inject: ['reload'],
    name: 'Advertise',
    data () {
        return {
            announces: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            ruleForm: {
                title: ""
            },
            loading: true,
            ratio: "1",
        };
    },
    methods: {
        pageChange (num) {
            this.pageIndex = num;
            this.listBanner();
        },
        sizeChange (num) { },
        create () {
            this.$router.push('/doc/create')
        },
        // read (row) {
        //     this.$store.state.docId = row._id
        //     localStorage.setItem("store", JSON.stringify(this.$store.state));
        //     const { href } = this.$router.resolve('/doc/read');
        //     window.open(href, '_blank');
        // },
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.listBanner();
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
            this.listBanner();
        },
        async listBanner (data) {
            const res = await this.$api.post(
                "/banner/list",
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
            await this.$api.post('/admin/switch', { _id: row._id, off: !row.off })
            this.$message.success('修改状态成功')
        },
    },
    created () {
        this.listBanner()
    }
}
</script>


<style scoped>
</style>
