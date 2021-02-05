import {mapState} from "vuex";
export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(['shop_basic']),
        i18nCommon(){
            return this.$t("common")
        }
    },
    created() {
        if(this.shop_basic!=null){
            let config =this.shop_basic;
            if(config==null||!config.monetary||config.monetary==1){
                return this.i18nCommon.symbol ="￥"
            }else if(config.monetary==2) {
                return this.i18nCommon.symbol ="$"
            }
        }
    },
}