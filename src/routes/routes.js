//  import Home from 'pages/Home/Home'
//  import Login from 'pages/Login/Login'
//  import Search from 'pages/Search/Search'
//  import Register from 'pages/Register/Register'
   
//  import Detail from 'pages/Detail/index'
//  import AddCartSuccess from 'pages/AddCartSuccess/index'
//  import ShopCart from 'pages/ShopCart/index'
const Home = ()=>import(/*webpackChunkName: "Home" */'pages/Home/Home')
const Login = ()=>import(/*webpackChunkName: "Login" */'pages/Login/Login')
const Search = ()=>import(/*webpackChunkName: "Search" */'pages/Search/Search')
const Register = ()=>import(/*webpackChunkName: "Register" */'pages/Register/Register')
const Detail = ()=>import(/*webpackChunkName: "Detail" */'pages/Detail/index')
const AddCartSuccess = ()=>import(/*webpackChunkName: "AddCartSuccess" */'pages/AddCartSuccess/index')
const ShopCart = ()=>import(/*webpackChunkName: "ShopCart" */'pages/ShopCart/index')
const Pay = ()=>import(/*webpackChunkName: "Pay" */'pages/Pay/index')
const PaySuccess = ()=>import(/*webpackChunkName: "PaySuccess" */'pages/PaySuccess/index')
const Trade = ()=>import(/*webpackChunkName: "Trade" */'pages/Trade/index')
const Center = ()=>import(/*webpackChunkName: "Center" */'pages/Center/index')
export default [
    {path: '/Home',component: Home},
    {path:'/Login',component: Login,meta:{hideFooter:true}},
    {path:'/Register',component:Register,meta:{hideFooter:true}},
    //这些meta信息在组件上可以通过$route.meta获取到
    {path:'/ShopCart',component:ShopCart},
    {
        //命名式路由
        name:"Search",
        //代表keyword可有可无
        path:"/Search/:keyword?",
        component:Search,
        props:route=>({
            keyword:route.params.keyword,categoryName:route.query.categoryName,categoryId:route.query.categoryId,category2Id:route.query.category2Id,category3Id:route.query.category3Id
        })
    },
    {
        //props为true可以携带id,props为true时可以携带params数据
        path:"/Detail/:id",
        component: Detail,
        props:true
    },
    { 
        //想拿函数数据,props得拿函数
        path:"/AddCartSuccess",
        component: AddCartSuccess,
        props:route=>({
            skuNum:route.query.skuNum
        })
    },
    {
        path:"/ShopCart",
        component: ShopCart,
        //当处于登录状态时 再也不能去登录页
        async beforeEnter(to,from,next){
            const userInfo = store.state.user.userInfo;
            if(userInfo.name){
                //登录状态
                next("/")
            }else{
                //未登录状态 直接放行
                next()
            }
        }
    },
    {
        path:"/Trade",
        component:Trade,
        beforeEnter(to,from,next){
            //只能从购物车列表组件跳转过来!!!
            if(from.path.split("/")[1].toLowerCase() === "shopcart"){
                next()
            }else{
                next("/shopcart")
            }
        }
    },
    { 
        path:"/Pay",
        component:Pay,
        beforeEnter(to,from,next){
            //只能从交易Trade组件跳转过来!!!
            if(from.path.split("/")[1].toLowerCase() === "trade"){
                next()
            }else{
                next("/shopcart")
            }
        }
    },
    { 
        path:"/Center",
        component:Center,
         
    },
    {
        path:"/PaySuccess",
        component:PaySuccess,
        beforeEnter(to,from,next){
            //只能从支付组件跳转过来!!!
            if(from.path.split("/")[1].toLowerCase() === "pay"){
                next()
            }else{
                next("/shopcart")
            }
        }
    },
    {path:'/',redirect:"/Home"}
]