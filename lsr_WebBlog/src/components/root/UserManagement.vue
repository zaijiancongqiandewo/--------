<script setup lang="ts">
import axios from 'axios';
import { computed, ref, onMounted, reactive } from 'vue'
const currentUser = sessionStorage.getItem('userPinia')
const UserPJson = JSON.parse(currentUser)
interface User {
  userName: string
  adminName: string
  password: string
  identify: string
  age: number
  headImageUrl: string
}
const pagedTableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filterTableData.value.slice(start, end);
});
const search = ref('')
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.userName.toLowerCase().includes(search.value.toLowerCase())
  )
)
//编辑
//修改操作实现
const Update = ref(false)
import { FormInstance, ElMessage } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  userName: '',
  password: '',
  age: '',
  headImageUrl: ''
})
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
import request from '../../util/request.js'
const handleEdit = (index: number, row: User) => {
  Update.value = true;
  ruleForm.userName = row.userName
  ruleForm.password = row.password
  imageUrl.value = row.headImageUrl
  

}
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (valid) {

        let { data } = await request.post("/root/userUpdate", ruleForm)
        if (data.code == 200) {

          ElMessage.success("修改成功")
        }

      } else {
        ElMessage.error('修改失败!')
        return false
      }
    })
  }
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
  axios({
    method:"post",
    url:"/api/root/deleteUser",
    data:{
      userName:row.userName
    }
  }).then((response)=>{
    if(response.data.code==200)
    {
      ElMessage.success("删除成功")
      window.location.reload()
    if(response.data.message==503){
      ElMessage.error(response.data.message)
    }
  }
  })
}

const tableData = ref<User[]>([])

const fetchData = async () => {
  try {
    const response = await axios.post("/api/root/userMessage");
    tableData.value = response.data.data;
    console.log(tableData.value);
    console.log(tableData.value.length)
    total.value = tableData.value.length
  } catch (error) {
    console.error("Failed to fetch data: ", error);
  }
}
onMounted(() => {
  fetchData();
});
// 分页功能实现
const small = ref(false)
const pageSize = ref(10)
let firstSize = pageSize.value
const currentPage = ref(1)
const background = ref(false)
const disabled = ref(false)
const total = ref(0)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}


//用户头像修改

import { Plus, User } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  //   console.log(imageUrl.value)
  console.log(response)
  if (response.code == 200) {
    ElMessage.success("头像上传成功")
    ruleForm.headImageUrl = response.message
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<template>
  <div v-if="UserPJson.identify == '管理员'">
    <el-table :data="pagedTableData" style="width: 100%">
      <el-table-column label="用户名" prop="userName" />
      <el-table-column label="管理员姓名" prop="adminName" />
      <el-table-column label="密码" prop="password" />
      <el-table-column label="身份" prop="identify" />
      <el-table-column label="年龄" prop="age" />
      <el-table-column label="头像">
        <template #default="scope">
          <img :src="scope.row.headImageUrl" alt="头像" width="50" height="50" />
        </template>
      </el-table-column>
      <el-table-column align="right">

        <template #header>
          <el-affix :offset="50">
            <el-input v-model="search" size="small" placeholder="请输入您要查询的用户名" />
          </el-affix>
        </template>


        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>

          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="Update" title="修改" width="30%" align-center>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon label-width="120px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.userName" placeholder="请输入用户名" :readonly="true" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <!-- 用户头像上传页面 -->
        <el-form-item label="修改头像" prop="headimag">
          <el-upload class="avatar-uploader" action="/api/user/articleImage" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">修改</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
  <div class="sticky-bottom">
    <el-affix position="bottom" :offset="40">
      <div class="demo-pagination-block">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
          :page-sizes="[firstSize, firstSize * 2, firstSize * 4, firstSize * 8]" :small="small" :disabled="disabled"
          :background="background" layout="total, sizes, prev, pager, next, jumper" :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-affix>
  </div>
</template>

<style scoped></style>
<style>
.sticky-bottom {
  display: flex;
  justify-content: center;
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