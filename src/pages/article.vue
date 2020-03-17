<template>
   <div class="wrap">
       <div class="nav">
           <ul>
               <li>
                   <a href="#/index">首页</a>
               </li>
           </ul>
       </div>
        <div class="c-con">
            <h2>{{articelTitle}}</h2>
            <span>{{articelTime}}</span>
            <div class="text-con markdown-body">
                <div v-html="articelTxt"></div>
            </div>
        </div>
   </div>
</template>
<script>
    import Vue from 'vue/dist/vue.js';
    import axios from 'axios';
    import githubToken from '../../config/githubConfig';
    import '../css/index.less'
    import 'github-markdown-css'

    export default {
        name: 'articel',
        components: {

        },
        data() {
            return {
                articelId: 0,
                articelArr: [],
                articelTitle: '',  //题目
                articelTime: '',   //时间
                articelTxt: '',    //内容
            }
        },
        created: function(){
            // 获取文章id
            this.articelId = this.GetUrlParam('id')
            // 搜索该文章数据
            this.searchArticle(this.articelId)
        },
        methods: {
            // 搜索对应文章
            searchArticle(id) {
                var searchData = {
                    query: `query {
                        repository(owner:"YMDaunt", name: "Blog") {
                        issue(number: ${id}) {
                            title
                            updatedAt
                            bodyHTML
                        }
                        }
                    }`
                }
                searchData = JSON.stringify(searchData)

                axios.post('https://api.github.com/graphql?access_token=' + githubToken, searchData)
                .then(res => {
                    let data = res.data.data.repository
                    this.articelArr = data.issue
                    console.log(this.articelArr)
                    this.articelTitle = this.articelArr.title
                    this.articelTime = this.articelArr.updatedAt
                    this.articelTxt = this.articelArr.bodyHTML
                })
                .catch(err => {
                    console.log(err);
                })
            },

            // 获取参数
            GetUrlParam(paraName) {
                var url = document.location.toString()
                var arrObj = url.split("?")
        　　　　if (arrObj.length > 1) {
        　　　　　　var arrPara = arrObj[1].split("&")
        　　　　　　var arr
        　　　　　　for (var i = 0; i < arrPara.length; i++) {
        　　　　　　　　arr = arrPara[i].split("=")
        　　　　　　　　if (arr != null && arr[0] == paraName) {
        　　　　　　　　　　return arr[1]
        　　　　　　　　}
        　　　　　　}
        　　　　　　return ""
        　　　　}
        　　　　else {
        　　　　　　return ""
        　　　　}
            },
        },
        mounted: function(){

        }
    }
</script>  