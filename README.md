### sph进度表
    a. 搭建了项目的环境
    b. 搭建git仓库
    c. 拆分静态组件
    d. 实现头部的路由跳转
        点击登录 -> 登录界面
        点击注册 -> 注册界面
        点击我的购物车 -> 购物车界面
        点击尚品汇logo -> 主界面
        点击搜索按钮 -> 搜索界面;search组件 (携带搜索数据)
            将搜索数据作为params携带到了search组件
    e. 实现TypeNav组件的功能
        1.TypeNav组件与vuex交互
        2.事件控制二三级分类列表的显示与隐藏
        3.优化高频事件触发: 利用lodash进行函数节流处理
        4.优化减小打包文件: 对lodash库实现按需引入//(引入使用import throttle from "lodash/throttle.js",而不是import _ from "lodash";)
        5.解决快速移出后可能显示第一个分类的子分类列表的bug

        //day02
        6.优化减少组件对象数量: 使用编程式导航代替声明式导航
            点击三级分类中的任意一级 都应该要跳转到search组件
            将分类信息作为query携带到search组件
            优化search组件(与路由相解耦)
        7.优化事件处理效率: 利用事件委托
        8.利用标签自定义属性携带动态数据
        9.控制一级列表的显示与隐藏
                在home上 一级分类要显示
                在其他页 一级分类要隐藏
        10.一级列表显示隐藏的过渡效果
        11.优化请求执行的位置, 减少请求次数
            三级分类数据的请求是在app组件开始获取的;而不是TypeNav组件
        12.合并分类query参数与搜索的关键字params参数

    d. ListContainer组件
        1.使用swiper实现静态页面轮播
        2.解决多个swiper冲突的问题
        //(因为多个swiper可能用同一个class,为避免这种情况，可以直接去拿dom节点,就是用$ref去拿，且ref只会在当前节点有作用)
        3.解决swiper动态页面轮播的bug
        4.定义可复用的轮播组件
        5.解决Floor组件中轮播有问题的bug
            immediate:true

e. search组件
        1.动态化search组件的details部分
        2.根据分类和关键字进行搜索
              --只要搜索条件产生变化;就应该重新发送请求 获取当前搜索条件所对应的数据;
                当从search组件跳到search组件时 生命周期钩子是不会被重新调用的;这时候
                哪怕搜索条件产生了变化;也不会重新发请求!!!  请求不应该在生命周期中发送;
                而应该在watch中;而且immediate必须为true
              --当每一次重置搜索条件时;分页都应该从第一页开始
        3.动态化search组件的selector部分(SearchSelector组件)
        4.动态化search组件的bread部分,全部结果区域(过滤条件的显示)
               删除搜索关键字过滤条件时;头部的输入框清空一下
               删除搜索关键字或三级分类过滤条件时;URL要同步
               当再往Search组件跳转的时候;如果头部的输入框已经为空;则请求数据不带搜索关键字了!!(直接借助URL同步)
                    问题: 当动态路由&命名路由相结合时;如果我们用下述方式进行跳转;path会丢
                        {name:"Search",path:"/search/:keyword?",component:Search}
                        this.$router.push({
                            name:"Search",
                            parmas:{}
                        })
                        this.$router.push({
                            name:"Search",
                            parmas:{keyword:""}
                        })
                        当动态路由&命名路由相结合时;如果我们用下述方式进行跳转;path不会丢
                        this.$router.push({
                            name:"Search",
                            parmas:{keyword:"有值"}
                        })
                        this.$router.push({
                            name:"Search"
                        })

        4.根据品牌进行搜索
        5.根据属性进行搜索
        6.排序搜索
        7.自定义分页组件
            <Pagination></Pagination>
            props:
                total,总条数
                pageSize,每页显示多少条
                lxyms,连续页码数
                indexFromWrap: 当前页的默认值
            事件
                updateCPage: 当当前页发生改变时;当前事件会被触发


