<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
// import route from '../router/router';
import axios from 'axios';

let allArticle = ref([])
const router = useRouter()
const route = useRoute()
// 获取sessionstorage中的数据
const sessionUser = sessionStorage.getItem("userPinia")
const JsonUser = JSON.parse(sessionUser)


// 为了展示不同的结果，在访问后端时，进行本次参数的传递，将文章的类别以json字符串的形式传递过去，从而展示不同类别的文章
axios({
    method: 'post',
    url: '/api/user/getArticleByUserName',
    data: {
        userName: JsonUser.userName
    }

}).then((response) => {
    console.log(response)

    if (response.data.code == 200) {
        allArticle.value = response.data.data
        console.log(allArticle)
    }
    else {
        alert(`获取${JsonUser.userName}文章失败`)
    }
})

</script>
  
 
<template>
    <div>
        <el-row>
            <el-col v-for="(o, index) in allArticle" :key="index" :span="5" :offset="2">
                <el-card :body-style="{ padding: '10px' }" shadow="hover">
                    <div class="imageControl">
                        <img v-if="!o.pageImageUrl" src="http://localhost:8081/lsr/blogging/images/user/Member001.jpg"
                            class="image" />
                        <img v-if="o.pageImageUrl" :src="o.pageImageUrl" class="image" />
                    </div>
                    <div style="padding: 10px">
                        <span>{{ o.articleName }}</span>
                        <br><br>
                        <el-text class="mx-1" type="info">{{ o.categoryName }}类</el-text>
                        &emsp;<el-text class="mx-1" type="info">作者:{{ o.userName }}</el-text>
                        <div class="bottom">
                            <time class="time">{{ o.createTime }}</time>
                            <el-text class="mx-1" type="success">浏览量:{{ o.articleViews }}</el-text>
                            <br/><br>
                            <router-link :to="'/showArticle/' + o.articleID"><el-button text
                                    class="button">查看</el-button></router-link>
                            <router-link :to="'/updateArticle/' + o.articleID"><el-button text
                                    class="button">修改</el-button></router-link>

                        </div>

                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style  scoped>
.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.imageControl {
    width: 100%;
    height: 248px;
}

.image {
    width: 100%;
    height: 100%;
    display: block;
}

/* 添加上下间距 */
.el-card {
    margin: 10px 0;
}
</style>