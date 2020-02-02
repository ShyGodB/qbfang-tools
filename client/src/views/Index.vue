<template>
    <div id="Index" class="w-100">
        <el-tabs :tab-position="tabPosition1" style="height: 760px;">
            <!-- <el-tab-pane label="查找">

            </el-tab-pane> -->

            <el-tab-pane label="添加">
                <div class="pl-3 h-100">
                    <el-tabs :tab-position="tabPosition2">
                        <el-tab-pane label="妖灵">
                            <el-form ref="form" :model="form" label-width="80px">
                                <el-form-item label="名称">
                                    <el-input v-model="form.name" class="w-50" @keyup.enter.native="addDemon()">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="稀有度">
                                    <el-select v-model="form.level">
                                        <el-option label="ssr" value="1"></el-option>
                                        <el-option label="sr" value="2"></el-option>
                                        <el-option label="r" value="3"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="属性">
                                    <el-select v-model="form.nature">
                                        <el-option label="金" value="金"></el-option>
                                        <el-option label="木" value="木"></el-option>
                                        <el-option label="水" value="水"></el-option>
                                        <el-option label="火" value="火"></el-option>
                                        <el-option label="土" value="土"></el-option>
                                        <el-option label="日" value="日"></el-option>
                                        <el-option label="月" value="月"></el-option>
                                        <el-option label="星" value="星"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="addDemon">添加</el-button>
                                    <el-button>取消</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>

                        <el-tab-pane label="礼物">
                            <el-form ref="form" :model="goods" label-width="80px">
                                <el-form-item label="名称">
                                    <el-input v-model="goods.name" class="w-50"></el-input>
                                </el-form-item>
                                <el-form-item label="稀有度">
                                    <el-radio-group v-model="goods.level">
                                        <el-radio label="ssr"></el-radio>
                                        <el-radio label="sr"></el-radio>
                                        <el-radio label="r"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="属性">
                                    <el-select v-model="goods.nature">
                                        <el-option label="金" value="金"></el-option>
                                        <el-option label="木" value="木"></el-option>
                                        <el-option label="水" value="水"></el-option>
                                        <el-option label="火" value="火"></el-option>
                                        <el-option label="土" value="土"></el-option>
                                        <el-option label="日" value="日"></el-option>
                                        <el-option label="月" value="月"></el-option>
                                        <el-option label="星" value="星"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="addDemon">添加</el-button>
                                    <el-button>取消</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Add from '../components/index/Add.vue'

export default {
    name: 'Index',
    components: {
        "add": Add
    },
    data () {
        return {
            tabPosition1: 'left',
            tabPosition2: 'top',
            form: {
                name: '',
                level: '',
                nature: ''
            },
            goods: {
                name: '',
                level: '',
                nature: ''
            }
        }
    },
    methods: {
        async addDemon () {
            if (!this.form.name || !this.form.level || !this.form.nature) this.$message.error('请输入完整信息！')
            await this.$api.post('/demon/add', this.form)
            this.$message.success('添加成功！')
        }
    },
    created () {

    }
}
</script>


<style scoped>
</style>
