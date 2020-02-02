<template>
    <div class="w-100 h-100">
        <el-container v-if="isLogin" style="padding: 0;">
            <el-header>
                <mainnav></mainnav>
            </el-header>

            <el-main>
                <router-view v-if="isRouterAlive"></router-view>
            </el-main>
        </el-container>

        <div v-if="!isLogin" class="w-100 h-100">
            <login></login>
        </div>
    </div>
</template>

<script>

export default {
    name: 'app',
    provide () {
        return {
            reload: this.reload
        }
    },
    data () {
        return {
            tab: '',
            isLogin: true,
            isRouterAlive: true
        }
    },
    methods: {
        reload () {
            this.isRouterAlive = false
            if (this.$store.state.userinfo) {
                this.isLogin = true
            } else {
                this.isLogin = false
            }
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        },
        getStore () {
            // 在页面加载时读取localStorage里的状态信息
            if (localStorage.getItem('store')) {
                this.$store.replaceState(
                    Object.assign(
                        {},
                        this.$store.state,
                        JSON.parse(localStorage.getItem('store'))
                    )
                )
            }

            // 在页面刷新时将vuex里的信息保存到localStorage里
            window.addEventListener('beforeunload', () => {
                localStorage.setItem(
                    'store',
                    JSON.stringify(this.$store.state)
                )
            })
        }
    },
    created () {
        this.getStore()

        if (this.$store.state.userinfo) {
            this.isLogin = true
        } else {
            this.isLogin = false
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
#mainnav {
    margin-bottom: 20px;
}
</style>
