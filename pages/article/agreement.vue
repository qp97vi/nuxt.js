/**
 * VUEshop
 * ============================================================================
 * * 版权所有 2015-2027 深圳搜豹网络科技有限公司，并保留所有权利。
 * 网站地址: http://www.vueshop.com.cn
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和使用 .
 * 不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: soubao-java 2020-07-22 $
 */
 <template>
  <div class="hc-warp">
    <div style="font-size: 20px;font-weight: 900;margin-top: 10px;margin-bottom: 10px;">{{article.doc_title}}</div>
    <div v-html="article.doc_content"></div>
  </div>
</template>

<script>
  import {getSystemArticle} from "@/utils/api.js";
export default {
  data() {
    return {
      article:''
    };
  },
  created(){
    getSystemArticle().then(res=>{
      this.article=res
    })
  },
  computed: {
  	 
  },
  components: {}
};
</script>

<style scoped>
.hc-warp{
    width: 1219px;
    min-width: 1219px;
    margin: 0px auto;
}
</style>