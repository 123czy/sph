<template>
    <!-- <div>contact</div> -->
    <div>
        {{msg}}<button @click="changeX"></button>
        {{a}}<button @click="changeA"></button>
    </div>
</template>

<script>
   import {getBaseCategoryList,getBanners,getFloors} from "http/http"
    export default {
        name: "contact",
        async created(){
            const body = await getFloors();
            console.log(body);
        }
    }
</script>

<style scoped>

</style>