<script setup lang="ts">
import { Menu as IconMenu, Message,ChatLineSquare } from '@element-plus/icons-vue'
</script>

<template>
    <div>
        <el-scrollbar>
            <el-menu :default-openeds="['1', '3']">
            <el-sub-menu index="1">
                <template #title>
                <el-icon><message /></el-icon>账号管理
                </template>
                <el-menu-item-group>
                
                    <router-link to="/welcome">
                    <el-menu-item index="1-1">管理员账号</el-menu-item>
                    </router-link>
                
                    <router-link to="/UserManagement">
                    <el-menu-item index="1-2">用户账号</el-menu-item>
                    </router-link>
                
                </el-menu-item-group>
                
            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                <el-icon><icon-menu /></el-icon>文章管理
                </template>
                <el-menu-item-group>
                <router-link to="/articleManagementRoot/技术分享"><el-menu-item index="2-1">技术分享管理</el-menu-item></router-link>
                <router-link to="/articleManagementRoot/生活感悟"><el-menu-item index="2-2">生活感悟管理</el-menu-item></router-link>
                <router-link to="/articleManagementRoot/随笔杂谈"><el-menu-item index="2-3">随笔杂谈管理</el-menu-item></router-link>
                <router-link to="/articleManagementRoot/全部"><el-menu-item index="2-4">全部文章管理</el-menu-item></router-link>
                </el-menu-item-group>
                
            </el-sub-menu>
            <!-- <el-sub-menu index="3">
                <template #title>
                <el-icon><setting /></el-icon>分类管理
                </template>
                <el-menu-item-group>
                <el-menu-item index="3-1">添加分类</el-menu-item>
                <el-menu-item index="3-2">修改分类</el-menu-item>
                <el-menu-item index="3-3">删除分类</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu> -->
            <el-sub-menu index="4">
                <template #title>
                <!-- <el-icon><ChatDotRound /></el-icon>反馈处理 -->
                <el-icon><ChatLineSquare /></el-icon>修改处理
                </template>
                <el-menu-item-group>
                <router-link to="/communicateRoot"><el-menu-item index="4-1">问题回复</el-menu-item></router-link>
                </el-menu-item-group>
            </el-sub-menu>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<style scoped>
/* 去除router-link的下划线 */
a {
  text-decoration: none;
}

.router-link-active {
   text-decoration: none; ;
   background-color:#CFD3DC;
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
</style>


