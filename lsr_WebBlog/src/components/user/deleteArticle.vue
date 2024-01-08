<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import {useRoute} from 'vue-router'
import { ElMessage} from 'element-plus'
const route=useRoute()
const articleID=ref(0)
articleID.value=route.params.articleID
axios({
    method:"post",
    url:'api/user/deleteArticle',
    data:{
        articleID:articleID.value
    }
}).then((resonse)=>{
    if(resonse.data.code==200){
        ElMessage.success("文章删除成功")
        //刷新页面
        window.location.reload()
    }
    else{
        ElMessage.error("文章删除失败")
    }
})
</script> 

<template>
    <div>
        
    </div>
</template>
<style scoped>
</style>

