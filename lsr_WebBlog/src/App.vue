<script setup lang="ts">


import Header from './components/Header.vue'

import rootAside from './components/root/RootAside.vue'
import userAside from './components/user/UserAside.vue'
import { defineUser } from './store/store';

let curententUser = defineUser();

</script>

<template>
  <div>
    <el-container>
      <el-aside width="200px" v-if="curententUser.identify&&curententUser.identify !== '管理员'">
        <!-- <router-view name="rootView"></router-view> -->
        <!-- <userAside></userAside> -->
        <userAside></userAside>
      </el-aside>
      <el-aside width="200px" v-if="curententUser.identify == '管理员'">
        <!-- <router-view name="rootView"></router-view> -->
        <!-- <userAside></userAside> -->
        <rootAside></rootAside>
      </el-aside>
      <el-container>
        <el-header>
          <br>
          <!-- <router-view name="headerView"></router-view> -->
          <Header></Header>
        </el-header>
        <el-main>
          <el-backtop :bottom="100" :right="100" :target="$refs.scrollbar">
              <div style="
                height: 40px;
                width: 40px;
                background-color: var(--el-bg-color-overlay);
                box-shadow: var(--el-box-shadow-lighter);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
                position: absolute;
                bottom: 0;
                right: 0;
              ">
                UP
              </div>
          </el-backtop>
          <el-scrollbar max-height="590px"  ref="scrollbar">
            
            <!-- 使用 :key="$route.fullPath" 是一种常见的在 Vue Router 中处理路由切换时状态更新的技巧。 -->
            <router-view  :key="$route.fullPath" ></router-view>
          </el-scrollbar>
          

        </el-main>
        <!-- <el-footer>
        </el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<style scoped></style>
