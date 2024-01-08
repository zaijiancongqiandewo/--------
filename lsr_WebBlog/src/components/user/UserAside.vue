<script setup lang="ts">
import { Menu as IconMenu, User, Setting, Edit ,Plus} from '@element-plus/icons-vue'
import { ref } from 'vue';

//获取当前用户
const sessionUser = sessionStorage.getItem("userPinia")
const JsonUser = JSON.parse(sessionUser)

//用户头像修改
const UpdateHeadImage = ref(false)
import { ElMessage } from 'element-plus';

import type { UploadProps } from 'element-plus'
import axios from 'axios';
const NewheadImageUrl=ref('')
const imageUrl = ref('')
imageUrl.value=JsonUser.headImageUrl
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    //   console.log(imageUrl.value)
    console.log(response)
    if (response.code == 200) {
        ElMessage.success("头像上传成功")
        NewheadImageUrl.value = response.message
    }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
//修改操作
function submitUpdateImage(){
    axios({
        method:"post",
        url:"/api/user/updateHeadImage",
        data:{
            userName:JsonUser.userName,
            headImageUrl:NewheadImageUrl.value
        }
    }).then((response)=>{
        if(response.data.code==200){
            ElMessage.success("头像修改成功")
            window.location.reload()
        }
        if(response.data.code==503){
            ElMessage.error(response.data.message)
        }
    })
}
</script>

<template>
    <div>
        <el-scrollbar>
            <el-menu :default-openeds="['1', '3']">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <User />
                        </el-icon>我的账号
                    </template>
                    <router-link to="/passwordEdit">
                        <el-menu-item index="1-1">密码修改</el-menu-item>
                    </router-link>
                    <el-menu-item index="1-2" @click="UpdateHeadImage=true">头像修改</el-menu-item>

                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon><icon-menu /></el-icon>我的文章
                    </template>
                    <router-link to="/userArticleManagement">
                        <el-menu-item index="2-1">查看与修改</el-menu-item>
                    </router-link>
                </el-sub-menu>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <Edit />
                        </el-icon>文章发布
                    </template>
                    <router-link to="/newIt/技术分享">
                        <el-menu-item index="3-1">技术分享</el-menu-item>
                    </router-link>
                    <router-link to="/newIt/生活感悟">
                        <el-menu-item index="3-2">生活感悟</el-menu-item>
                    </router-link>
                    <router-link to="/newIt/随笔杂谈">
                        <el-menu-item index="3-3">随笔杂谈</el-menu-item>
                    </router-link>
                </el-sub-menu>
                <el-sub-menu index="4">
                    <template #title>
                        <el-icon>
                            <setting />
                        </el-icon>建议与反馈
                    </template>
                    <router-link to="">
                        <el-menu-item index="4-1">问题反馈</el-menu-item>
                    </router-link>
                    <router-link to="">
                        <el-menu-item index="4-2">修改建议</el-menu-item>
                    </router-link>
                </el-sub-menu>
            </el-menu>
        </el-scrollbar>
        <el-dialog v-model="UpdateHeadImage" title="" width="30%" align-center>
            
            <el-form-item label="修改头像" prop="headimag">
                &emsp;&emsp;&emsp;&emsp;
                <el-upload class="avatar-uploader" action="/api/user/articleImage" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>

            </el-form-item>
            <el-form-item>
                
                <el-button type="primary" @click="submitUpdateImage()" style="position: relative; left: 40%;">修改</el-button>
            </el-form-item>
        </el-dialog>

    </div>
</template>

<style scoped>
/* 去除router-link的下划线 */
a {
    text-decoration: none;
}

.router-link-active {
    text-decoration: none;
    ;
    background-color: #CFD3DC;
}

/* ------------------- */
.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

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
