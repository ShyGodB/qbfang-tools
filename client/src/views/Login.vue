<template>
    <div id="login" class="h-100">
        <div class="login-box h-100">
            <h3 class="login-box-title">密码登录</h3>

            <div class="login-box-username">
                <i class="el-icon-user-solid"></i>
                <input type="text" v-model="form.userPhone" placeholder=" 手机" />
            </div>

            <div class="login-box-password">
                <i class="el-icon-lock"></i>
                <input type="password" v-model="form.password" placeholder=" 密码" />
            </div>

            <div class="login-button">
                <button type="button" name="login-button" @click="login">登陆</button>
            </div>

            <div class="prompt">
                <span class="password-forgot">任意用户名、密码</span>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    inject: ["reload"],
    name: "login",
    data() {
        return {
            form: {
                userPhone: "",
                password: ""
            }
        };
    },
    methods: {
        async login() {
            const res = await this.$api.post("/index/login", this.form);
            if (!res.data.success) {
                this.$message.error(res.data.msg);
            } else {
                this.$store.state.userinfo = res.data.data.userinfo || null;
                this.$store.state.menus = res.data.data.menus || [];
                this.$router.push("/");
                this.reload();
            }
        }
    },
    created() {
        if (this.$store.state.userinfo) {
            this.$router.push("/");
        }
    }
};
</script>


<style scoped>
#login {
    width: 100%;
    height: 100%;
    background-image: url(../../public/img/bg.png);
    background-size: 100% 100%;
}
.login-box {
    width: 418px;
    height: 328px;
    margin: 0 auto;
    background: #fff;
    padding: 35px 35px 15px;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    box-shadow: 0 0 25px #000000;
    position: relative;
    top: 180px;
}
.login-box h3 {
    display: block;
    text-align: center;
    margin-bottom: 30px;
    height: 30px;
}
.login-box i {
    margin-right: 10px;
}
input {
    width: 320px;
    height: 30px;
}
i {
    width: 16px;
    height: 16px;
}

.login-box div {
    margin-bottom: 30px;
    height: 30px;
}
.login-box button {
    width: 100%;
    height: 40px;
    border: 1px solid #ff4400;
    border-radius: 6px;
    background: #ff4400;
    margin: 0 auto;
}
.login-box .prompt {
    float: right;
}
.login-box .register-free:hover {
    cursor: pointer;
    color: #ff4400;
}
.login-box .prompt .password-forgot {
    margin: 10px;
    color: #888888;
}
</style>
