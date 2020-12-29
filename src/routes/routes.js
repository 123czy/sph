// import test from "pages/test/test"
import goods from "pages/goods/goods"
import ratings from "pages/ratings/ratings"
import seller from "pages/seller/seller"
export default [
    // {path:"/test",component:test},
    {path:"/goods",component:goods},
    {path:"/ratings",component:ratings},
    {path:"/seller",component:seller},
    {path:"/",redirect:"/goods"}
]