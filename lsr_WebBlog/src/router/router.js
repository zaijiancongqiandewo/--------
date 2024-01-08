import {createRouter,createWebHashHistory} from 'vue-router'

import welcome from '../components/welcome.vue'

import rootAside from '../components/root/RootAside.vue'
import header from '../components/Header.vue'
import newIt from'../components/user/editArticle.vue'
import technologyShare from '../components/technologyShare.vue'
import passwordEdit from '../components/user/passwordEdit.vue'
import usermanagement from'../components/root/UserManagement.vue'
import showArticle from '../components/showArticle.vue'
import communicateRoot from '../components/root/communicateRoot.vue'
import userArticleManagement from '../components/user/UserarticleManagement.vue'
import updateArticle from '../components/user/updateArticle.vue';
import deleteArticle from '../components/user/deleteArticle.vue'
import articleManagementRoot from '../components/root/articleManagementRoot.vue'

let router=createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/newIt/:categoryName',
            component:newIt

        },
        {
            path:'/welcome',
            component:welcome
        },
        {
            path:'/',
            component:welcome
        },
        {
            path:'/technologyShare/:categoryName',
            component:technologyShare
        },
        {
            path:'/technologyShare/:search/:category',
            component:technologyShare
        },
        {
            path:'/passwordEdit',
            component:passwordEdit
        },
        {
            path:'/UserManagement',
            component:usermanagement
        },
        {
            path:'/showArticle/:articleID',
            component:showArticle
        },
        {
            path:'/communicateRoot',
            component:communicateRoot
        },
        {
            path:'/userArticleManagement',
            component:userArticleManagement
        },
        {
            path:'/updateArticle/:articleID',
            component:updateArticle
        },
        {
            path:'/deleteArticle/:articleID',
            component:deleteArticle
        },
        {
            path:'/articleManagementRoot/:categoryName',
            component:articleManagementRoot
        }       
    ]
})

export default router;