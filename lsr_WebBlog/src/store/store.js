import { dataType } from 'element-plus/es/components/table-v2/src/common.mjs';
import {defineStore} from 'pinia'
export const defineUser=defineStore(
    {
        id:'userPinia',
        state:()=>{
            return{
                userName:'',
                identify:'',
                age:0,
                headImageUrl:''
            }
            
            
        },
        
        getters:{
                getUserName(){
                    return this.userName;
                },
                getRowIdentify(){
                    return this.identify;
                },
                getAge(){
                    return this.age;
                },
                getHeadImageUrl(){
                    return this.headImageUrl
                }
            },
        actions:{
            user(name,identify,age,headImageUrl){
                    this.userName=name;
                    this.identify=identify;
                    this.age=age;
                    this.headImageUrl=headImageUrl
            }
        },
        // 开启数据缓存
        persist: {
            enabled: true
        }

    }
)

export const defineArticle=defineStore(
    {
        id:'ArticlePinia',
        state:()=>{
            return{
                articleName:'',
                userName:'',
                categoryName:'',
                articleContent:'',
                createTime:'',
                updateTime:'',
                articleViews:''

            }
            
            
        },      
        getters:{
                
            },
        actions:{
            Article(articleName,userName,categoryName,articleContent,createTime,updateTime,articleViews){
                    this.articleName=articleName;
                    this.userName=userName;
                    this.categoryName=categoryName;
                    this.articleContent=articleContent;
                    this.createTime=createTime
                    this.updateTime=updateTime
                    this.articleViews=articleViews
            }
        },
        // 开启数据缓存
        persist: {
            enabled: true
        }

    }
)
