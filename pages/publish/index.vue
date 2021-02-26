<template>
    <div>
        <top-bar></top-bar>
        <search-box></search-box>
        <div class="w1224 main">
            <router-link class="nav" :to="{name:'publish_list'}" :class="routerName == 'publish_list' ? 'action' : ''">
                <div><i class="el-icon-house"></i>首页</div>
            </router-link>
            <router-link class="nav" :to="{name:'publish_recommend'}" :class="routerName == 'publish_recommend' ? 'action' : ''">
                <div>推荐</div>
            </router-link>
            <!-- <router-link class="nav" :to="{name:'publish_attention'}" :class="routerName == 'publish_attention' ? 'action' : ''">
                <div>关注</div>
            </router-link> -->
        </div>
        <hr size="2px" color="#0F5499" />
        <div class="bgcolor">
            <div class="w1224">
                <router-view></router-view>
            </div>
        </div>
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
        components: {
            TopBar,
            SearchBox,
        },
        computed:{
            routerName:function(){
                return this.$route.name
            }
        }
    }
</script>
<style scoped>
    .main{
        overflow: hidden;
        margin-top: 20px;
    }
    .nav{
        float: left;
        width: 140px;
        height: 44px;
        text-align: center;
        line-height:44px ;
        font-size: 16px;
    }
    .action{
        background: #0F5499;
        color: #fff;
        font-weight: 900;
    }
    .bgcolor{
        background: #ecececad;
    }
</style>