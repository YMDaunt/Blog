<template>
   <div class="wrap">
       <div class="nav">
            <ul>
                <li @click="searchAll()">首页</li>
                <li v-for="(item, index) in navArr" v-bind:key="index" v-bind:data-name="item.name" @click="searchNeed($event)">{{item.name}}</li>
            </ul>
        </div>
        <div class="con">
            <ul>
                <li v-for="(item, index) in articleArr" v-bind:key="index">
                    <h2><a :href="'#/article?id='+ item.node.number" v-bind:data-id="item.node.number">{{item.node.title}}</a></h2>
                    <p>{{item.node.bodyText}}</p>
                    <span v-html="(item.node.updatedAt).replace(/[a-zA-Z]/g, ' ')"></span>
                </li>
            </ul>
        </div>
   </div>
</template>
<script>
    import Vue from 'vue/dist/vue.js';
    import axios from 'axios';
    import githubToken from '../../config/githubConfig';
    import '../css/index.less'
    
    export default {
        name: 'index',
        components: {

        },
        data() {
            return {
                searchData: {
                    query: `query {
                        repository(owner:"YMDaunt", name: "Blog") {
                            issues(orderBy:{field: UPDATED_AT, direction: DESC} , labels: null, first: 10) {
                                edges{
                                    cursor
                                    node{
                                        title
                                        updatedAt
                                        bodyText
                                        number
                                    }
                                }
                            }
                            labels(first: 100){
                                nodes {
                                    name
                                }
                            }
                        }
                    }`
                },
                navArr: [],
                articleArr: [],
                needKey: '',  //搜索指定文章用的key
            }
        },
        created: function(){
            this.searchAll();
        },
        methods: {
            // 搜索所有
            searchAll() {
                var searchStr = JSON.stringify(this.searchData)
                axios.post('https://api.github.com/graphql?access_token=' + githubToken, searchStr)
                .then(res => {
                    let data = res.data.data.repository
                    this.navArr = data.labels.nodes
                    this.articleArr = data.issues.edges
                    console.log(this.navArr, this.articleArr)
                })
                .catch(err => {
                    console.log(err);
                })
            },

            // 搜索指定的类型文章
            searchNeed(e) {
                this.needKey = e.target.getAttribute('data-name');
                var needQuery = {
                    query: `query {
                        repository(owner:"YMDaunt", name: "Blog") {
                            issues(orderBy:{field: UPDATED_AT, direction: DESC} , labels: "${this.needKey}", first: 10) {
                                edges{
                                    cursor
                                    node{
                                        title
                                        updatedAt
                                        bodyText
                                        number
                                    }
                                }
                            }
                        }
                    }`
                }
                needQuery = JSON.stringify(needQuery)

                axios.post('https://api.github.com/graphql?access_token=' + githubToken, needQuery)
                .then(res => {
                    let data = res.data.data.repository
                    this.articleArr = []
                    this.articleArr = data.issues.edges
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        mounted: function(){

        }
    }
</script>  