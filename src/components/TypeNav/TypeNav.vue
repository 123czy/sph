<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="wrapLeave" @mouseenter="wrapEnter">
                <h2 class="all" @mouseenter="allEnter">全部商品分类</h2>
                <!--toSearch:事件委托-->
                <transition name="item">
                    <div class="sort" v-show="showOnelevel" @click="toSearch">
                        <div class="all-sort-list2">
                            <!--一级分类-->
                            <div class="item" :class="{showList:currentIndex===index}"
                                     @mouseenter="itemEnter(index)"
                                     v-for="(item,index) in CategoryList" :key="item.categoryId">
                                    <h3>
                                        <a href="javascript:;" :data-categoryName="item.categoryName" :data-category1Id="item.categoryId">{{item.categoryName}}</a>
                                        <!--<a href="javascript:;" @click="toSearch({categoryName:item.categoryName,category1Id:item.categoryId})">{{item.categoryName}}</a>-->
                                        <!--<router-link to="/Search">{{item.categoryName}}</router-link>-->
                                    </h3>
                                    <!--item-list:二三级分类的容器-->
                                    <div class="item-list clearfix">
                                        <div class="subitem">
                                            <!--二级分类-->
                                            <dl class="fore" v-for="ChildItem in item.categoryChild" :key="ChildItem.categoryId">
                                                <dt>
                                                    <a href="javascript:;" :data-categoryName="ChildItem.categoryName" :data-category2Id="ChildItem.categoryId">{{ChildItem.categoryName}}</a>
                                                    <!--<a href="javascript:;" @click="toSearch({categoryName:ChildItem.categoryName,category2Id:ChildItem.categoryId})">{{ChildItem.categoryName}}</a>-->
                                                    <!--<router-link to="/Search">{{ChildItem.categoryName}}</router-link>-->
                                                </dt>
                                                <dd>
                                                    <!--三级分类-->
                                                    <em v-for="ChildChildItem in ChildItem.categoryChild" :key="ChildChildItem.categoryId">
                                                        <a href="javascript:;" :data-categoryName="ChildChildItem.categoryName" :data-category3Id="ChildChildItem.categoryId">{{ChildChildItem.categoryName}}</a>
                                                        <!--<a href="javascript:;" @click="toSearch({categoryName:ChildChildItem.categoryName,category3Id:ChildChildItem.categoryId})">{{ChildChildItem.categoryName}}</a>-->
                                                        <!--<router-link to="/Search">{{ChildChildItem.categoryName}}</router-link>-->
                                                    </em>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
    import throttle from "lodash/throttle.js";
    // import _ from "lodash";
    import {mapState} from "vuex";
    export default {
        name: "TypeNav",
        data(){
          return {
             /* currentIndex:-2代表鼠标在三级分类的外部
              currentIndex:-1代表鼠标刚刚进入三级分类
              currentIndex:>-1 代表鼠标已经选中一个一级分类项*/
              currentIndex:-2, //带当前滑动在哪一个一级分类上
              showOnelevel:["/","/Home"].includes(this.$route.path)
          }
        },
        computed:{
            ...mapState({CategoryList(state){return state.a.CategoryList}}),
            /*showOnelevel(){
                //当命中/ 或/Home时 返回true ; 其他返回false
                return ["/","/Home"].includes(this.$route.path)+
            }*/
        },
        methods:{
            // 控制一级分类的显示隐藏
            allEnter(){
                //不处于主页
                if(!["/","/Home"].includes(this.$route.path)){
                    this.showOnelevel = true
                }
            },

            //控制二三级分类的显示与隐藏的逻辑
            wrapEnter(){
                this.currentIndex = -1;
            },
            wrapLeave(){
                this.currentIndex = -2;
                //不处于主页
                if(!["/","/Home"].includes(this.$route.path)){
                    this.showOnelevel = false
                }
            },
            itemEnter:throttle(function (index){
                //为了解决移除到三级分类列表外时 二三级分类还能显示的bug
                if(this.currentIndex > -2){
                    this.currentIndex = index;
                }
            },200),
            //点击三级分类 跳转到search组件
            // toSearch({categoryName="",category1Id="",category2Id="",category3Id=""}){
            toSearch(ev){
                //ev.target:真正触发事件的dom节点
                const {categoryname="",category1id="",category2id="",category3id=""}
                    = ev.target.dataset;

                let localtion = {name:'Search',query:{}}
                categoryname ? localtion.query.categoryName=categoryname : ""
                category1id ? localtion.query.category1Id=category1id : ""
                category2id ? localtion.query.category2Id=category2id : ""
                category3id ? localtion.query.category3Id=category3id : ""

                //要不要携带params数据  这时候就不能使用path 的使用命名式路由
                if( Object.keys(this.$route.params).length !== 0){
                    //代表query有值
                    localtion.params = this.$route.params
                }
                this.$router.push(localtion)

              if(this.$route.path.toLowerCase().startsWith("/search")){
                    this.$router.replace(localtion)
                }else{
                    this.$router.push(localtion)
    }
                //隐藏一级分类 (serach组件跳serach组件时;TypeNav的data不会重新计算)
                this.wrapLeave()
            }
        },
        mounted(){
          this.$bus.$on("keyword",(val)=>{
            this.keyword = val
          })
        }
    }
</script>

<style scoped lang="less">
    .type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}

</style>