<script setup lang="ts">
import { ref, reactive,computed } from 'vue'
import { Search, } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import request from '../util/request.js'
import axios from 'axios'
import { defineUser } from '../store/store.js'

const select = ref('')
console.log(select)
const currentUser = reactive(defineUser())
let router = useRouter();
function first_page() {

    router.push('/welcome');

}

//注册
const SignUp = ref(false)
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入年龄'))
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('请输入数字'))
        } else {
            if (value < 18) {
                callback(new Error('年龄必须要大于18'))
            } else {
                callback()
            }
        }
    }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== ruleForm.password) {
        callback(new Error("两次密码输入不一致!"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    userName: '',
    password: '',
    checkPass: '',
    age: '',
    headImageUrl:''
})

const rules = reactive<FormRules<typeof ruleForm>>({
    password: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {

            let { data } = await request.post("/user/SignUp", ruleForm)
            if (data.code == 200) {
                
                ElMessage.success("注册成功，快去登陆吧")
                
                //刷新页面
                window.location.reload()
            }

        } else {
            ElMessage.error('注册失败!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
// -----------------------------
// 登录实现
const Login = ref(false)


const loginFormRef = ref<FormInstance>()


const validateLoginPass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {

        callback()
    }
}


const LoginForm = reactive({
    userName: '',
    password: '',

})

const Loginrules = reactive<FormRules<typeof ruleForm>>({
    password: [{ validator: validateLoginPass, trigger: 'blur' }],

})
let LoginError = ref('')
const submitLoginForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
            console.log(`${ruleForm.age}`)
            axios({
                method: "post",
                url: "api/user/Login",
                headers: {
                    // "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
                data: LoginForm
            }).then((response) => {
                console.log(response)
                LoginError.value = response.data.message
                console.log(response)
                let userDate = response.data.data
                // console.log(userDate.userName)
                currentUser.user(userDate.userName, userDate.identify, userDate.age,userDate.headImageUrl)
                if (LoginError.value == "success") {
                    //Login = false
                    ElMessage.success("登录成功")
                    //刷新页面
                    window.location.reload()
                }

            });

        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetLoginForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

// 获取sessionstorage中的数据
const sessionUser = sessionStorage.getItem("userPinia")
const JsonUser = JSON.parse(sessionUser)
//退出登录
function logout() {
    sessionStorage.removeItem("userPinia")
    //router.push("/welcome")
    window.location.replace("/"); // 用新页面替换当前页面
    
}

// 用户上传头像
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
//   console.log(imageUrl.value)
    console.log(response)
  if(response.code==200){
    ElMessage.success("头像上传成功")
    ruleForm.headImageUrl=response.message
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
 if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
//顶部导航栏回退

const onBack = () => {
  router.back()
  //window.location.reload()
}
//顶部导航栏搜索数据传递
import { useHeadSearch } from '../store/app'
const search = ref('')
const store=useHeadSearch();
const headSearch=computed(()=>store.getHeadSearch)
//搜索功能
function mySearch() {
    store.setHeadSearch(search.value)
}

</script>

<template>
    <div>
        <el-page-header :icon="null" @back="onBack">


            <template #content>

                <div class="flex items-center">
                    <el-button type="primary" @click="first_page()" plain>首页</el-button>
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    <!-- 搜索框 -->
                    <el-input v-model="search" placeholder="Please input" class="input-with-select">
                        <template #prepend>
                            <el-select v-model="select" placeholder="Select" style="width: 115px">
                                <router-link :to="'/technologyShare/' + '技术分享'"><el-option label="技术分享"
                                        value="技术分享" /></router-link>
                                <router-link :to="'/technologyShare/' + '生活感悟'"> <el-option label="生活感悟"
                                        value="生活感悟" /></router-link>
                                <router-link :to="'/technologyShare/' + '随笔杂谈'"> <el-option label="随笔杂谈"
                                        value="随笔杂谈" /></router-link>
                                <router-link :to="'/technologyShare/' + '全部'"> <el-option label="全部"
                                        value="全部" /></router-link>
                            </el-select>
                        </template>
                        <template #append>
                            <el-button :icon="Search" @click="mySearch()"></el-button>
                        </template>
                    </el-input>
                    <!-- </div> -->
                </div>

            </template>
            <template #extra>
                <!-- 用户头像和身份展示区域 -->
                <div v-if="JsonUser && 'userName' in JsonUser">
                    <el-popover :width="300"
                        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
                        class="userShow">
                        <template #reference>
                            <el-avatar v-if="JsonUser.headImageUrl" :src="JsonUser.headImageUrl" />
                            <el-avatar v-if="!JsonUser.headImageUrl" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />

                        </template>
                        <template #default>
                            <div class="demo-rich-conent" style="display: flex; gap: 16px; flex-direction: column">
                                <el-avatar v-if="JsonUser.headImageUrl" :size="60"
                                    :src="JsonUser.headImageUrl"
                                    style="margin-bottom: 8px" />
                                    <el-avatar v-if="!JsonUser.headImageUrl" :size="60"
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                                    style="margin-bottom: 8px" />
                                <div>
                                    <p class="demo-rich-content__name" style="margin: 0; font-weight: 500">
                                        {{ `用户名：${JsonUser.userName}` }}
                                    </p>
                                    <p class="demo-rich-content__mention"
                                        style="margin: 0; font-size: 14px; color: var(--el-color-info)">
                                        {{ `年龄：${JsonUser.age}` }}
                                    </p>
                                </div>
                                <p class="demo-rich-content__desc" style="margin: 0">
                                    &emsp;&emsp;欢迎{{ JsonUser.userName }}来到生睿博客系统，
                                    愿你在本博客系统中收获知识和启迪，与更多志同道合的人建立联系，让我们一起共同成长和前行！

                                </p>
                                <el-button type="danger" plain @click="logout()">退出登录</el-button>
                            </div>
                        </template>
                    </el-popover>
                    <el-tag>{{ currentUser.identify }}</el-tag>
                    &emsp;&emsp;
                </div>
                <!-- 登录注册按钮显示 -->
                <div class="flex items-center" v-if="!JsonUser">
                    <el-button type="primary" class="ml-3" @click="Login = true">登录</el-button>
                    <el-dialog v-model="Login" title="登录" width="30%" align-center>
                        <el-form ref="loginFormRef" :model="LoginForm" status-icon :rules="Loginrules" label-width="120px"
                            class="demo-ruleForm">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="LoginForm.userName" placeholder="请输入用户名" />
                            </el-form-item>
                            <el-form-item label="密码" prop="pass">
                                <el-input v-model="LoginForm.password" type="password" autocomplete="off"
                                    placeholder="请输入密码" />
                            </el-form-item>
                            <el-form-item>
                                <span>{{ LoginError }}</span>
                            </el-form-item>
                            


                            <el-form-item>
                                <el-button type="primary" @click="submitLoginForm(loginFormRef)">登录</el-button>
                                <el-button @click="resetLoginForm(loginFormRef)">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                    <!-- <el-button type="primary" class="ml-2" @click="SignUp()">注册</el-button> -->
                    <el-button type="primary" class="ml-2" text @click="SignUp = true">注册</el-button>

                    <el-dialog v-model="SignUp" title="注册" width="30%" align-center>
                        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                            class="demo-ruleForm">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="ruleForm.userName" placeholder="请输入用户名" />
                            </el-form-item>
                            <el-form-item label="密码" prop="pass">
                                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="确认密码" prop="checkPass">
                                <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="年龄" prop="age">
                                <el-input v-model.number="ruleForm.age" />
                            </el-form-item>
                            <!-- 用户头像上传页面 -->
                            <el-form-item label="上传头像" prop="headimag">
                                <!-- <template> -->
                                    <el-upload class="avatar-uploader"
                                        action="/api/user/headImage"
                                        :show-file-list="false" :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                        <el-icon v-else class="avatar-uploader-icon">
                                            <Plus />
                                        </el-icon>
                                    </el-upload>
                                <!-- </template> -->
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
                                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </div>
            </template>
        </el-page-header>

    </div>
</template>

<style scoped>
/* 搜索框 */
.input-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);

}

.input-with-select {
    width: 600px;
    margin: counter;
}

.select_header {
    width: 50%
}

/* —————————————————————————————— */
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

/*  */
.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}

.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

/* 去掉下划线 */
a {
    text-decoration: none;
}

.router-link-active {
    text-decoration: none;

}

/* ----------------用户上传头像----------------------- */
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
<style>
/* 用户上传头像 */
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>