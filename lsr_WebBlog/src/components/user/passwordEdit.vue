<script setup lang="ts">

import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'

const ruleFormRef = ref<FormInstance>()
const userpinia = sessionStorage.getItem("userPinia")
const userpiniaJson = JSON.parse(userpinia)
import { ElMessage } from 'element-plus'

let resultOfEdit = ref('')

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password'))
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
        callback(new Error('Please input the password again'))
    } else if (value !== ruleForm.newPassword) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    newPassword: '',
    checkPass: '',
    oldPassword: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
    newPassword: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            axios({
                method: "post",
                url: "api/user/passwordEdit",
                data: {
                    userName: userpiniaJson.userName,
                    oldPassword: ruleForm.oldPassword,
                    newPassword: ruleForm.newPassword
                }
            }).then((response) => {
                if (response.data.code == 200) {
                    ElMessage({
                        message: '密码修改成功.',
                        type: 'success',
                    })
                }
                else if (response.data.code == 503) {
                    ElMessage.error('旧密码错误.')
                }

            })
            console.log('submit!')

        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>

<template>
    <br><br>
    <div v-if="userpiniaJson.userName">
        <div class="common-layout">
            <el-container>
                <!-- <div > -->
                <el-main>
                    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px"
                        class="demo-ruleForm">
                        <el-form-item label="旧密码" prop="lodPassword">
                            <el-input v-model="ruleForm.oldPassword" type="password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPassword">
                            <el-input v-model="ruleForm.newPassword" type="password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
                        </el-form-item>
                        {{ resultOfEdit.value }}
                        <span>{{ resultOfEdit }}</span>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-main>
                <!-- </div> -->

            </el-container>
        </div>

    </div>
</template>

<style scoped>
.common-layout {

    position: absolute;
    width: 500px;
    left: 40%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>
