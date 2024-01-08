<script setup lang="ts">
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const activeKey = ref([]);
//轮播图
const urls = [
  { url: 'http://localhost:8081/lsr/blogging/images/fristPageImages/1.jpg' },
  { url: 'http://localhost:8081/lsr/blogging/images/fristPageImages/2.jpg' },
  { url: 'http://localhost:8081/lsr/blogging/images/fristPageImages/3.jpg' },
  { url: 'http://localhost:8081/lsr/blogging/images/fristPageImages/4.jpg' },
  { url: 'http://localhost:8081/lsr/blogging/images/fristPageImages/5.jpg' },
  { url: 'http://localhost:8081/lsr/blogging/images/fristPageImages/6.jpg' }
]
// http://localhost:8081/lsr/blogging/images/fristPageImages/1.jpg
//网站简介
const blockContent = `无论您是想分享自己的经验和知识，还是想搜索和学习最新的社区话题，生睿博客系统都是您一个不可缺少的平台。立即注册并加入这个精彩的社区！`;
</script>
  
 
<template>
  <div>
    <div style="width: 98%;">
      <el-row :gutter="16">
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="98500">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  每日活跃用户
                  <el-tooltip effect="dark" content="一天内登录本博客系统的用户数量" placement="top">
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>相比昨天</span>
                <span class="green">
                  24%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="693700">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  每月活跃用户
                  <el-tooltip effect="dark" content="一月内登录本博客系统的用户数量" placement="top">
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>相比上个月</span>
                <span class="red">
                  12%
                  <el-icon>
                    <CaretBottom />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="72000" title="New transactions today">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  今日新用户
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>相比昨天</span>
                <span class="green">
                  16%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
              <div class="footer-item">
                <el-icon :size="14">
                  <ArrowRight />
                </el-icon>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="width: 98%;">
      <el-carousel :interval="3000" type="card" height="300px">
        <el-carousel-item v-for="(item, index) in urls" :key="index">
          <el-image :src="item.url" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <br><br>
    <div style="width: 98%;">
      <a-collapse v-model:activeKey="activeKey" accordion>
        <a-collapse-panel key="1" header="网站简介">
          <div>
            <a-typography-title>Introduction</a-typography-title>
            <a-typography-paragraph>
              The Shengrui Blog System is a powerful online community platform that offers users a variety of features,
              including registration, login, article submission, article viewing, password modification, and personal
              information modification.
            </a-typography-paragraph>
            <a-typography-paragraph>
              Users can easily submit their own articles in the Shengrui Blog System and share their insights and
              experiences with users worldwide. At the same time, users can also browse other users’ articles and perform
              operations such as liking, commenting, and sharing.
              The design philosophy of “certainty” and “naturalness” is combined with modular solutions to reduce
              redundant production costs and allow designers to focus on providing a better user experience.
            </a-typography-paragraph>
            <a-typography-title :level="2">Design Resources</a-typography-title>
            <a-typography-paragraph>
              The Shengrui Blog System also provides powerful article management functions. Users can freely delete or
              edit their own articles and view information such as their article’s page views and likes. The system will
              also automatically assign users a “level” based on their total article views, and display the level in the
              user’s profile, providing a more three-dimensional and interesting platform for their social development and
              interaction.
            </a-typography-paragraph>

            <a-typography-paragraph>
              <ul>
                <li>
                  <a-typography-link href="/docs/resources-en">Design Resources</a-typography-link>
                </li>
              </ul>
            </a-typography-paragraph>
            <a-typography-paragraph>
              <blockquote>Whether you want to share your experience and knowledge, or you want to search and learn about
                the latest community topics, Shengrui Blog system is an indispensable platform for you. Sign up today and
                join this wonderful community!</blockquote>
              <pre>Whether you want to share your experience and knowledge, or you want to search and learn about the latest community topics, Shengrui Blog system is an indispensable platform for you. Sign up today and join this wonderful community!</pre>
            </a-typography-paragraph>

            <a-divider />

            <a-typography-title>介绍</a-typography-title>
            <a-typography-paragraph>
              生睿博客系统是一个功能强大的在线社区平台，它为用户提供了注册、登录、发表文章、查看文章、修改密码和个人资料等多种功能。
            </a-typography-paragraph>
            <a-typography-paragraph>
              用户可以在生睿博客系统中轻松发表自己的文章，与全球用户分享自己的见解和经验。同时，用户还可以浏览其他用户的文章，并进行点赞、评论和分享等操作。
              <a-typography-text mark>『确定』和『自然』</a-typography-text>
              的设计价值观，通过模块化的解决方案，降低冗余的生产成本，让设计者专注于
              <a-typography-text strong>更好的用户体验</a-typography-text>
              。
            </a-typography-paragraph>
            <a-typography-title :level="2">设计资源</a-typography-title>
            <a-typography-paragraph>
              生睿博客系统还提供了强大的文章管理功能，用户可以自由地删除或编辑自己的文章，并查看自己文章的浏览量和点赞数等信息。系统还会根据用户文章的
              <a-typography-text code>总访问量</a-typography-text>
              ，自动为用户分配
              <a-typography-text code>等级</a-typography-text>
              ，并将等级显示在用户的个人资料中，这为用户的社交发展和互动提供了更加立体和有趣的平台。
            </a-typography-paragraph>

            <a-typography-paragraph>
              <ul>
                <li>
                  <a-typography-link href="/docs/resources-cn">设计资源</a-typography-link>
                </li>
              </ul>
            </a-typography-paragraph>

            <a-typography-paragraph>
              <blockquote>{{ blockContent }}</blockquote>
              <pre>{{ blockContent }}</pre>
            </a-typography-paragraph>
            <!-- </a-typography> -->
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="博客展示形式">
          <div style="background-color: #ececec; padding: 20px">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-card title="技术分享" :bordered="false">
                  <p>作者</p>
                  <p>日期</p>
                  <p>浏览量</p>
                  <el-button type="success">查看全文</el-button>
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card title="生活感悟" :bordered="false">
                  <p>作者</p>
                  <p>日期</p>
                  <p>浏览量</p>
                  <el-button type="success">修改</el-button>
                  <el-button type="success">查看</el-button>

                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card title="随笔杂谈" :bordered="false">
                  <p>作者</p>
                  <p>日期</p>
                  <p>浏览量</p>
                  <el-button type="success">option</el-button>

                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="操作指南">
          <p>{{ 3 }}</p>
        </a-collapse-panel>
      </a-collapse>
    </div>


  </div>
</template>
<style  scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 统计组件 */
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}

.red {
  color: var(--el-color-error);
}</style>