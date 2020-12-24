<template>
    <!-- 头部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p>
                        <span>请</span>
                        <router-link to="/Login">登录</router-link>
                        <router-link to="/Register" class="register">免费注册</router-link>
                    </p>
                </div>
                <div class="typeList">
                    <a href="###">我的订单</a>
                    <router-link to="/ShopCart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" title="尚品汇" to="/Home">
                    <img src="./images/logo.png" alt="">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" v-model="keyword"
                    @keydown.13.prevent=""
                           class="input-error input-xxlarge" />
                    <button class="sui-btn btn-xlarge btn-danger"
                            type="button" @click="toSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name:"sph-header",
    data(){
        return{
            keyword:""
        }
    },

    
    methods:{
        toSearch(){
            let localtion = {name:"Search"}
             //要携带上三级分类相关的参数(如果有)
            if( Object.keys(this.$route.query).length !== 0){
                    //代表query有值
                    localtion.query = this.$route.query
                }
''
                //判断keyword有没有值
                if (this.keyword){
                    localtion.params={
                        keyword:this.keyword
                    }
                }
        //  console.log(this.$route.path)
        //以startsWith开始的路径
       if(this.$route.path.toLowerCase().startsWith("/search")){
                    this.$router.replace(localtion)
                }else{
                    this.$router.push(localtion)
    }
        },
    mounted(){
       this.$bus.$on("clearInput",(val)=>{
           this.keyword = val
       })  
    },
    watch:{
        keyword(val){
            this.$bus.$emit("keyword",val)
        }
    }
    
    }
}
</script>

<style scoped lang="less">
 .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>