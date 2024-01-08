<script setup lang="ts">

import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

let route = useRoute();
let currentArticleId = ref(0);
// 评论
import dayjs from 'dayjs';
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons-vue';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const likes = ref<number>(0);
const dislikes = ref<number>(0);
const action = ref<string>();

const like = () => {
  likes.value = 1;
  dislikes.value = 0;
  action.value = 'liked';
};

const dislike = () => {
  likes.value = 0;
  dislikes.value = 1;
  action.value = 'disliked';
};
//------- 评论
currentArticleId.value = route.params.articleID;

let currentArticle = ref({});

onMounted(async () => {
  try {
    const response = await axios.post("/api/user/getArticleById", {
      articleID: currentArticleId.value
    });
    if (response.data.code === 200) {
      currentArticle.value = response.data.data;
      console.log(currentArticle.value);
    }
    if (response.data.code === 500) {
      ElMessage.error('当前文章获取失败.');
    }
  } catch (error) {
    console.error('请求失败：', error);
  }
});

// ________________________________________回复框
const sessionUser = sessionStorage.getItem("userPinia")
const JsonUser = JSON.parse(sessionUser)

type Comment = Record<string, string>;

const comments = ref<Comment[]>([]);
const submitting = ref<boolean>(false);
const value = ref<string>('');
const handleSubmit = () => {
  if (!value.value) {
    return;
  }

  submitting.value = true;

  setTimeout(() => {
    submitting.value = false;
    comments.value = [
      {
        author: JsonUser.userName,
        avatar: JsonUser.headImageUrl,
        content: value.value,
        datetime: dayjs().fromNow(),
      },
      ...comments.value,
    ];
    value.value = '';
  }, 1000);
};
// -----------------------------
</script>

<template>
  
  <div v-html="currentArticle.articleContent" style="margin-left: 100px;">

  </div>
  <div v-if="JsonUser">
    <a-comment>
      <template #actions>
        <span key="comment-basic-like">
          <a-tooltip title="Like">
            <template v-if="action === 'liked'">
              <LikeFilled @click="like" />
            </template>
            <template v-else>
              <LikeOutlined @click="like" />
            </template>
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ likes }}
          </span>
        </span>
        <span key="comment-basic-dislike">
          <a-tooltip title="Dislike">
            <template v-if="action === 'disliked'">
              <DislikeFilled @click="dislike" />
            </template>
            <template v-else>
              <DislikeOutlined @click="dislike" />
            </template>
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ dislikes }}
          </span>
        </span>
        <span key="comment-basic-reply-to">回复</span>
      </template>
      <template #author><a>{{JsonUser.userName}}</a></template>
      <template #avatar>
        <a-avatar :src="JsonUser.headImageUrl" alt="Han Solo" />
      </template>
      <template #content>
        <p>
          我们提供一系列的设计原则，实用的图案和高质量的设计
        </p>
      </template>
      <template #datetime>
        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ dayjs().fromNow() }}</span>
        </a-tooltip>
      </template>
    </a-comment>
  </div>
  <!-- 回复框 -->
  <div v-if="JsonUser">
    <a-list v-if="comments.length" :data-source="comments"
      :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`" item-layout="horizontal">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment :author="item.author" :avatar="item.avatar" :content="item.content" :datetime="item.datetime" />
        </a-list-item>
      </template>
    </a-list>
    <a-comment>
      <template #avatar>
        <a-avatar :src="JsonUser.headImageUrl" :alt="JsonUser.userName" />
      </template>
      <template #content>
        <a-form-item>
          <a-textarea v-model:value="value" :rows="4" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
            发表
          </a-button>
        </a-form-item>
      </template>
    </a-comment>
  </div>
</template>

<style scoped></style>
