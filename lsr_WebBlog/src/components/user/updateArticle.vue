<script setup lang="ts">
//import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
// "@ckeditor/ckeditor5-build-decoupled-document": "^40.1.0",
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useRoute ,useRouter} from 'vue-router'
import axios from 'axios'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
components: { Editor, Toolbar }
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
let article = ref('')
let articleID = ref(0)
// 内容 HTML
const valueHtml = ref('<p>hello</p>')
//文章标题
let headline = ref('')
let router=useRouter()
//获取路由传参过来的文章分类
let route = useRoute()
articleID.value = route.params.articleID
const fetchData = async () => {
    try {
        const response = await axios.post("/api/user/getArticleById", {
            articleID: articleID.value
        });
        article.value = response.data.data;
        console.log(article.value);
        valueHtml.value = article.value.articleContent
        headline.value = article.value.articleName
        console.log(valueHtml)
        value.value = article.value.categoryName
        imageUrl.value = article.value.pageImageUrl
    } catch (error) {
        console.error("获取待修改文章失败 ", error);
    }
}
onMounted(() => {
    fetchData();
});

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
//提交写入的数据
function onsubmitHtml() {

    const editor = editorRef.value // 获取 editor ，必须等待它渲染完之后
    if (editor == null) return
    if (!headline.value) {
        ElMessage.error("文章标题不能为空")
        return
    }
    if (!value.value) {
        ElMessage.error("文章类别不能为空")
    }
    const date = new Date()
    const currentTime = dayjs(date).format('YY-MM-DD HH:mm:ss')
    axios({
        method: "post",
        url: "/api/user/updateArticle",
        headers: {
            // "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
        data: {
            articleID: articleID.value,
            articleName: headline.value,
            userName: article.userName,
            categoryName: value.value,
            articleContent: valueHtml.value,
            createTime: article.createTime,
            updateTime: currentTime,
            articleViews: article.articleViews,
            pageImageUrl: pageImageUrl.value
        }
    }).then((response) => {
        console.log(response);
        if (response.data.code == 200) {
            ElMessage({
                message: '文章修改成功.',
                type: 'success',
            })
        }
        if (response.data.code == 503) {
            ElMessage.error(response.data.message)
        }

    });
}
const value = ref('')
const options = [
    {
        value: '技术分享',
        label: '技术分享',
    },
    {
        value: '生活感悟',
        label: '生活感悟',
    },
    {
        value: '随笔杂谈',
        label: '随笔杂谈',
    }
]


//更新文章封面
import { ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'
const UpdateArticleImage = ref(false)
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
        ElMessage.success("文章封面更新成功")
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
//消息是否确认弹出框


const open = () => {
    ElMessageBox.confirm(
        '您确定要删除这篇文章吗?',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '删除确认',
            })
            deleteArticle()
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}
function deleteArticle() {
    axios({
        method:"post",
        url:"/api/user/deleteArticle",
        data:{
            articleID:articleID.value
        }
    }).then((response)=>{
        if(response.data.code==200)
        {
            ElMessage.success("删除文章成功")
            router.push('/userArticleManagement')
        }
        if(response.data.code==503){
            ElMessage.error("删除文章失败")
        }
    })
}
</script> 

<template>
    <div>
        <el-input v-model="headline" placeholder="请输入文章标题" clearable maxlength="20" style="width: 400px;" />
        &emsp14;
        <el-select v-model="value" clearable placeholder="请选择文章分类">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        &emsp14;
        <el-button @click="UpdateArticleImage = true">更改封面图片</el-button>
        <el-dialog v-model="UpdateArticleImage" title="上传文章封面" width="30%" align-center>
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
            </el-form>
        </el-dialog>
        &emsp;&emsp;&emsp;&emsp;
        <el-button type="success" @click="onsubmitHtml()">提交修改</el-button>
        &emsp;&emsp;&emsp;&emsp;
        <el-button type="danger" @click="open">删除</el-button>
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