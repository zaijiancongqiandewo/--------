<script setup lang="ts">
//import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
// "@ckeditor/ckeditor5-build-decoupled-document": "^40.1.0",
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { defineArticle } from '../../store/store.js'
import { defineUser } from '../../store/store.js'
import { useRoute } from 'vue-router'
import axios from 'axios'
import dayjs from 'dayjs'

import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'

// export default {
components: { Editor, Toolbar }
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')
//文章标题
let headline = ref('')
//获取路由传参过来的文章分类
let router = useRoute()
let categoryName = router.params.categoryName

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
//上传文章封面
const SubmitarticleImage = ref(false)
const imageUrl = ref('')
import { Plus } from '@element-plus/icons-vue'

const pageImageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    //   console.log(imageUrl.value)
    console.log(response)
    if (response.code == 200) {
        ElMessage.success("文章封面上传成功")
        pageImageUrl.value = response.message
        console.log(pageImageUrl.value)
    }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 4) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

//提交写入的数据
function onsubmitHtml() {
    this.SubmitarticleImage = false
    let categoryName = router.params.categoryName
    const editor = editorRef.value // 获取 editor ，必须等待它渲染完之后
    if (editor == null) return
    if (!headline.value) {
        alert("文章标题不能为空")
        return
    }

    const date = new Date()
    const createTime = dayjs(date).format('YY-MM-DD HH:mm:ss')
    const html = editor.getHtml()
    //获取当前用户信息
    const currentUser = defineUser()
    //获取当前文章信息
    const currentArticle = defineArticle()
    axios({
        method: "post",
        url: "/api/user/submitArticle",
        headers: {
            // "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
        data: {
            articleName: headline.value,
            userName: currentUser.userName,
            categoryName: categoryName,
            articleContent: valueHtml.value,
            createTime: createTime,
            updateTime: createTime,
            articleViews: currentArticle.articleViews,
            pageImageUrl: pageImageUrl.value
        }
    }).then((response) => {
        console.log(response);
        if (response.data.code == 200) {
            alert("文章添加成功")
        }

    });
}



</script> 

<template>
    <div>
        <el-input v-model="headline" placeholder="请输入文章标题" clearable maxlength="20" style="width: 400px;" />
        &emsp;&emsp;&emsp;&emsp;
        <el-button @click="SubmitarticleImage = true">提交</el-button>

        <el-dialog v-model="SubmitarticleImage" title="上传文章封面" width="30%" align-center>
            <el-form ref="ruleFormRef" status-icon label-width="120px" class="demo-ruleForm">
                <!-- 用户头像上传页面 -->
                <el-form-item label="封面" prop="headimag">
                    <!-- <template> -->
                    <el-upload class="avatar-uploader" action="/api/user/articleImage" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                    <!-- </template> -->
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onsubmitHtml()">确认提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <Editor style="height: 480px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
                :mode="mode" @onCreated="handleCreated" />
        </div>

    </div>
</template>
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
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