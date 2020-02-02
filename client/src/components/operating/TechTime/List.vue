<template>
    <div id="TechTime">
        <div class="techTime-search">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="技师i姓名" prop="techName">
                            <el-input v-model="ruleForm.techName"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="技师手机" prop="techPhone">
                            <el-input v-model="ruleForm.techPhone"></el-input>
                        </el-form-item>
                    </el-col>

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
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="techId" label="技师编号" width="80"></el-table-column>
            <el-table-column fixed prop="techName" label="技师姓名" width="80"></el-table-column>
            <el-table-column fixed prop="style" label="时间类型" width="80"></el-table-column>
            <el-table-column fixed prop="day" label="日期" width="100"></el-table-column>
            <el-table-column label="00:00" width="80">
                <template slot-scope="scope">
                    <div :class="scope.row[1] == 0 ? 'bg-red' : 'bg-green'" style="height: 100%">12</div>
                </template>
            </el-table-column>
            <el-table-column prop="2" label="00:30" width="80">
                <template slot-scope="scope">
                    <div :class="scope.row[2] == 0 ? 'bg-red' : 'bg-green'" style="height: 100%">123</div>
                </template>
            </el-table-column>
            <el-table-column prop="3" label="01:00" width="80"></el-table-column>
            <el-table-column prop="4" label="01:30" width="80"></el-table-column>
            <el-table-column prop="5" label="02:00" width="80"></el-table-column>
            <el-table-column prop="6" label="02:30" width="80"></el-table-column>
            <el-table-column prop="1" label="03:00" width="80"></el-table-column>
            <el-table-column prop="2" label="03:30" width="80"></el-table-column>
            <el-table-column prop="3" label="04:00" width="80"></el-table-column>
            <el-table-column prop="4" label="04:30" width="80"></el-table-column>
            <el-table-column prop="5" label="05:00" width="80"></el-table-column>
            <el-table-column prop="6" label="05:30" width="80"></el-table-column>
            <el-table-column prop="1" label="06:00" width="80"></el-table-column>
            <el-table-column prop="2" label="06:30" width="80"></el-table-column>
            <el-table-column prop="3" label="07:00" width="80"></el-table-column>
            <el-table-column prop="4" label="07:30" width="80"></el-table-column>
            <el-table-column prop="5" label="08:00" width="80"></el-table-column>
            <el-table-column prop="6" label="08:30" width="80"></el-table-column>
            <el-table-column prop="1" label="09:00" width="80"></el-table-column>
            <el-table-column prop="2" label="09:30" width="80"></el-table-column>
            <el-table-column prop="3" label="10:00" width="80"></el-table-column>
            <el-table-column prop="4" label="10:30" width="80"></el-table-column>
            <el-table-column prop="5" label="11:00" width="80"></el-table-column>
            <el-table-column prop="6" label="11:30" width="80"></el-table-column>
            <el-table-column prop="1" label="12:00" width="80"></el-table-column>
            <el-table-column prop="2" label="12:30" width="80"></el-table-column>
            <el-table-column prop="3" label="13:00" width="80"></el-table-column>
            <el-table-column prop="4" label="13:30" width="80"></el-table-column>
            <el-table-column prop="5" label="14:00" width="80"></el-table-column>
            <el-table-column prop="6" label="14:30" width="80"></el-table-column>
            <el-table-column prop="1" label="15:00" width="80"></el-table-column>
            <el-table-column prop="2" label="15:30" width="80"></el-table-column>
            <el-table-column prop="3" label="16:00" width="80"></el-table-column>
            <el-table-column prop="4" label="16:30" width="80"></el-table-column>
            <el-table-column prop="5" label="17:00" width="80"></el-table-column>
            <el-table-column prop="6" label="17:30" width="80"></el-table-column>
            <el-table-column prop="1" label="18:00" width="80"></el-table-column>
            <el-table-column prop="2" label="18:30" width="80"></el-table-column>
            <el-table-column prop="3" label="19:00" width="80"></el-table-column>
            <el-table-column prop="4" label="19:30" width="80"></el-table-column>
            <el-table-column prop="5" label="20:00" width="80"></el-table-column>
            <el-table-column prop="6" label="20:30" width="80"></el-table-column>
            <el-table-column prop="1" label="21:00" width="80"></el-table-column>
            <el-table-column prop="2" label="21:30" width="80"></el-table-column>
            <el-table-column prop="3" label="22:00" width="80"></el-table-column>
            <el-table-column prop="4" label="22:30" width="80"></el-table-column>
            <el-table-column prop="5" label="23:00" width="80"></el-table-column>
            <el-table-column prop="6" label="23:30" width="80"></el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
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
    </div>
</template>


<script>
export default {
    name: "TechTime",
    data() {
        return {
            tableData: [],
            ruleForm: {
                day: "2019-12-13",
                techPhone: "",
                userName: "",
                userPhone: ""
            },
            pageIndex: 1,
            pageSize: 10,
            pageNum: 1,
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
            }
        };
    },
    methods: {
        handleEdit(row, index) {
            console.log(row, index);
        },
        handleDelete(row, index) {
            console.log(row, index);
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.ruleForm);
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleClick(row) {
            console.log(row);
        },
        pageChange(num) {
            this.pageIndex = num;
            this.listOrder();
        },
        sizeChange(num) {
            // this.listOrder(this.ruleForm);
        },
        async listTechTime() {
            const res = await this.$api.post(
                "/tech/listTime",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            console.log(res.data.data);
            this.tableData = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        }
    },
    created() {
        this.listTechTime();
    }
};
</script>


<style scoped>
.bg-red {
    background-color: #ff0000;
}
.bg-green {
    background-color: #00ff00;
}
</style>
