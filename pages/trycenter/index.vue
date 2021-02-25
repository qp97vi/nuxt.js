<template>
    <div>
        <top-bar></top-bar>
        <search-box></search-box>
        <div class="w1224" style="overflow: hidden;">
            <nuxt-link :to="{name:'all_try'}"  class="trytitle"  :class="routerName == 'all_try' ? 'action' : ''">
                <div>全部试用</div>
            </nuxt-link>
            <nuxt-link :to="{name:'try_foreshow'}" class="trytitle"  :class="routerName == 'try_foreshow' ? 'action' : ''">
                <div>试用预告</div>
            </nuxt-link>
            <nuxt-link  :to="{name:'my_trial'}" class="trytitle"  :class="routerName == '' ? 'action' : ''">
                <div>我的试用</div>
            </nuxt-link>
        </div>
        <nuxt-child></nuxt-child>
    </div>
</template>
<script>
    import TopBar from "@/components/TopBar/index.vue";
    import SearchBox from "@/components/SearchBox/index.vue";
    export default{
        data(){
            return{
                
            }
        },
        created(){
        },
        components: {
            TopBar,
            SearchBox,
        },
        computed:{
            routerName:function(){
                return this.$route.name
            } 
        },
        mounted(){
            
        }
       
    }
</script>
<style>
    .trytitle{
        float: left;
        width: 140px;
        height: 44px;
        text-align: center;
        line-height: 44px;
        font-size: 15px;
    }
    .action{
        border-bottom: 2px solid #0F5499;
        font-weight: 900;
        color: #0F5499;
    }
</style>