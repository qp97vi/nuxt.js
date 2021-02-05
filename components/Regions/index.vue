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
  <div>
    <el-cascader
      id="region-cascader"
      ref="myCascader"
      :options="options"
      @change="sendInfo"
      :props="props"
      :placeholder="oldAddress"
	    v-model="selectValue"
      size="mini"
      separator=","
    >
	</el-cascader>
  </div>
</template>

<script>
import { getRegionList } from "@/utils/api";
import { setLocation, getLocation } from "@/utils/auth";
export default {
  data() {
    return {
	  selectValue: '',
      data: [],
      options: [],
      id: 0,
      props: {
        test: null,
        value: "id",
        label: "name",
        lazy: true,
        Obj: this,
        lazyLoad(node, resolve) {
          var that = this;
          var nodes = [];
          if (node.value != null) {
            getRegionList({
              parent_id: node.value,
              is_have_child: true,
            }).then(function (res) {
              res.forEach(function (item, index) {
                nodes[index] = item;
                if (that.Obj.level > 0) {
                  nodes[index].leaf = that.Obj.level < item.level;
                } else {
                  nodes[index].leaf = item.is_no_children;
                }
              });
              resolve(nodes);
			  
            });
          }
        },
      },
    };
  },
  
  created() {
    this.getList();
  },
  watch:{
    initVal:{
      handler(newN,oldN){
        this.selectValue=this.initVal
      }
    }
  },
  props: ["isCache", "initVal", "level"],
  methods: {
    address(id) {
      var bool = false;
      getRegionList({ parent_id: id }).then((res) => {
        if (res.length == 0) {
          bool = true;
        } else {
          bool = false;
        }
      });
      return bool;
    },
    sendInfo(val) {
      var that = this;
      var labelArr = that.$refs["myCascader"].getCheckedNodes()[0].pathLabels;
      var location = { value: val, label: labelArr };
      if (this.isCache) {
        setLocation(location); //缓存地址id和地址名称
      }
      this.$emit("choose", location);
    },
    getList() {
      var that = this;
      getRegionList({
        parent_id: that.id,
      }).then(function (res) {
        that.options = res;
        that.options.forEach(function (item, index) {
          item.children = [];
        });
      });
    },
	getChange() {
	},
  },
  computed: {
    oldAddress: function () {
      if (this.isCache) {
        var location = getLocation();
        if (location != null && location.label.length > 0) {
          return location.label.join(",");
        } else {
          return this.initVal.join(",");
        }
      }
	    return this.initVal
    },
  },
};
</script>

<style scoped>
</style>
