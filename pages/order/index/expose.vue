<template>
	<div>
		<div id="l-header">
			<div class="w">
				<div class="b-logo-box">
					<a href="/" target="_blank" class="logo-link">
						<img @/static/images/logo2.png" width="183"
						 height="62" class="logo-sub">
					</a>
				</div>
				<ul class="b-subnav-box">
					<li class="nav-current">
						<a href="javascript:void(0);" target="_self">{{i18n.informant_center}}</a>
					</li>
					<li class="nav-jd">
						<a href="/" target="_blank"><span class="txt-sub">{{i18n.return_home}}</span></a>
					</li>
				</ul>
			</div>
		</div>
		<div class="w crumb_position">
			<a href="">{{i18n.informant_center}}</a>&nbsp;&gt;&nbsp;
			<strong class="crumb-curr">{{i18n.adulterant}}</strong>
		</div>
		<div class="w l-main">

			<!--  /widget/ud-pinfo/ud-pinfo.vm -->
			<div class="re-model-wrap">
				<div class="re-model-hd">
					<h3 class="title">{{i18n.goods_message}}</h3>
				</div>
				<dl class="re-model-s01 b-simply-box">
					<dt class="h-simply-img">
						<nuxt-link :to="{name:'goodsInfo',query:{id:goods.goods_id}}" target="_blank">
							<img
							  :src="apiHead + '/mall/goods/thumb_image?width=50&height=50&goods_id=' + goods.goods_id"
							  height="100"
							  alt="100*100"
							/>
						</nuxt-link>
					</dt>
					<dd class="h-simply-info">
						<p class="p-name">
							{{i18n.goods_name}}:<nuxt-link :to="{name:'goodsInfo',query:{id:goods.goods_id}}" target="_blank">{{goods.goods_name}}</nuxt-link>
						</p>
						<ul class="p-info-list">
							<li class="sub-item">{{i18n.goods_sn}}: {{goods.goods_sn}}</li>
							<li class="sub-item">{{i18n.goods_classify}}：{{goodsCat.name}}</li>
							<li class="sub-item" id="categorys">{{i18n.goods_title}}：{{goods.goods_remark}}</li>
							<li class="sub-item">{{i18n.reported_merchant}}：{{store.store_name}}</li>
						</ul>
					</dd>
				</dl>
			</div>
			<!--/ /widget/ud-pinfo/ud-pinfo.vm -->

			<!--  /widget/ud-jbtype/ud-jbtype.vm -->
			<div class="re-model-wrap" id="ud-jbtype">
				<div class="re-model-hd">
					<h3 class="title">{{i18n.report_type}}</h3>
				</div>
				<div class="re-model-bd">
					<ul class="re-jbtype-box">
						<li class="li-item" :class="expose.expose_type_id == type.expose_type_id ? 're-on' : ''" @click="changeExposeType(type)" v-for="type in exposeTypeList" :key="type.expose_type_id" :title="type.expose_type_desc">
							{{type.expose_type_name}}<s class="icon-on"></s>
						</li>
						<li>
							<div class="msg-text">{{i18n.more_report}}</div>
						</li>
					</ul>
				</div>
			</div>

			<!--/ /widget/ud-jbtype/ud-jbtype.vm -->
			<div class="re-model-wrap">
				<div class="re-model-hd">
					<h3 class="title">
						<span class="txt-red">*</span> {{i18n.which_iswrong}}
						<!--<small class="txt-gray">（仅可以选择一项）</small>-->
					</h3>
				</div>
				<div class="re-model-bd" v-if="expose.expose_type_id">
					<textarea v-model="expose.expose_content" cols="30" rows="10" style="border: 1px solid #E6E6E6;width: 935px; height: 144px;margin-bottom: 8px;padding: 5px;"
					 :placeholder="i18n.illegal_reason"></textarea>
					<div class="msg-care">({{i18n.attention}})</div>
				</div>
			</div>
			<!--  -->
			<div class="re-model-wrap ud-upload">
				<div class="re-model-hd">
					<h3 class="title">
						<span class="txt-red">*</span>
						{{i18n.upload_proof}}
					</h3>
				</div>
				<div class="re-model-bd">
					<dl class="re-explain-box">
						<dt class="h-img-box">
							<img @/static/images/loadz_03.jpg" width="60" height="60" :alt="i18n.linq"></dt>
						<dd class="h-img-info">
							<h5 class="title">{{i18n.sample_requirements}}</h5>
							<p>{{i18n.require_one}}</p>
						</dd>
					</dl>
					<div class="re-upload-box">
						<span class="fl-text">{{i18n.uploading}}：</span>
						<div class="upload-img-box">
							<div class="img-lists">
								<ul class="img-list-ul" id="imgBox">
									<li>
										<el-upload
										  action="/mall/upload?type=expose"
										  list-type="picture-card"
										  :on-success="handleAvatarSuccess"
										  :before-upload="beforeAvatarUpload"
										  :on-preview="handlePictureCardPreview"
										  :on-remove="handleRemove"
										>
										<i class="el-icon-plus"></i>
										</el-upload>
										<el-dialog :visible.sync="dialogVisible">
										  <img width="100%" :src="dialogImageUrl" alt />
										</el-dialog>
									</li>
								</ul>
							</div>
							<div class="img-utips">
								{{i18n.picture_layout}}<br>{{i18n.picture_size}}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="re-model-wrap">
				<div class="re-model-hd">
					<h3 class="title">{{i18n.relevant_orders}}
						<small class="msg-text">（{{i18n.here_add}}）</small>
					</h3>
				</div>
				<div class="re-model-bd">
					<div class="re-form-wrap">
						<label class="h-label">{{i18n.order}}：</label>
						<input type="text" v-model="expose.expose_order_sn" onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
						 class="g-text" maxlength="18">
					</div>
				</div>
			</div>
			<p class="ud-jblink">
				{{i18n.myreport}}-【<nuxt-link :to="{name:'expose_list'}">{{i18n.inform_message}}</nuxt-link>】{{i18n.query_report}}
			</p>
			<div class="btn-groups">
				<input type="button" :value="i18n.submit_report" class="btn-s01" @click="addReport">
			</div>

		</div>
	</div>
</template>

<script>
	import { 
		getGoodsById,
		getStore,
		getGoodsFirstId,
		exposeTypeList,
		exposeApply,
		} from "@/utils/api.js";
	import {
		getUser
	} from "@/utils/auth.js";
	export default {
		data() {
			return {
				user: getUser(), //用户信息
				expose: {
					expose_type_id: null, //举报类型id
				}, //举报信息
				goods: {},  //商品数据
				store: {},  //店铺信息
				goodsCat: {},  //商品分类数据
				exposeTypeList: [], //举报类型列表
				imageUrl: [], //证据上传
				dialogImageUrl: "", //图片路径
				dialogVisible: false, //
			}
		},
		created() {
			this._getGoods(this.$route.query.goods_id);
			this._exposeTypeList();
		},
		  computed: {
				i18n() {
					return this.$t('order.expose') 
				}
			},
		methods: {
			_getGoods(id) {
				getGoodsById(id).then(res => {
					this.goods = res;
					this._getStore();
					this._getGoodsCat();
				})
			},
			_exposeTypeList() {
				exposeTypeList().then(res => {
					this.exposeTypeList = res
				})
			},
			_getStore() {
				getStore({
					store_id: this.goods.store_id,
				}).then((res) => {
					this.store = res
				})
			},
			_getGoodsCat() {
				getGoodsFirstId({
					id: this.goods.cat_id3
				}).then(res => {
					this.goodsCat = res;
				})
			},
			addReport() {
				var _this = this
				if (this.expose.expose_type_id == null) {
					this.$message.error(_this.i18n.please_report_type)
					return;
				}
				this.expose.expose_time = new Date().getTime() / 1000;
				this.expose.expose_pic = this.imageUrl.join(",");
				this.expose.expose_user_id = this.user.user_id;
				this.expose.expose_goods_id = this.goods.goods_id;
				this.expose.expose_store_id = this.goods.store_id;
				this.expose.expose_goods_name = this.goods.goods_name;
				this.expose.expose_store_name = this.store.store_name;
				exposeApply(this.expose).then(res => {
					if (res.status == 1) {
						this.$message.success(_this.i18n.submit_successfully); 
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			changeExposeType(val) {
				this.expose.expose_type_id = val.expose_type_id;
				this.expose.expose_type_name = val.expose_type_name;
			},
			//图片上传
			handleAvatarSuccess(res, file) {
			  this.imageUrl.push(res.result);
			},
			beforeAvatarUpload(file) {
			  var _this = this
			  const isLt5M = file.size / 1024 / 1024 < 5;
			  const isLength = this.imageUrl.length < 5;
			  if (!isLength) {
			    this.$message.error(_this.i18n.five_pictures);
			  }
			  if (!isLt5M) {
			    this.$message.error(_this.i18n.pictures_size);
			  }
			  return isLength && isLt5M;
			},
			//图片删除
			handleRemove(file, fileList) {
			  if (file.response != undefined) {
			    this.imageUrl = this.imageUrl.filter(function(item, index, array) {
			      return item != file.response.result;
			    });
			  }
			},
			//图片放大查看
			handlePictureCardPreview(file) {
			  this.dialogImageUrl = file.url;
			  this.dialogVisible = true;
			},
		}
	}
</script>

<style scoped>
	@import "@/static/css/jubao.css";
	
	>>> .el-upload--picture-card {
	  width: 60px;
	  height: 60px;
	  line-height: 60px;
	}
	>>> .el-upload-list--picture-card .el-upload-list__item {
	  width: 60px;
	  height: 60px;
	}
	.upload-img-box .img-utips {
		float: left;
		width: 300px;
		height: 40px;
		line-height: 20px;
		margin-top: 10px;
		margin-left: 12px;
		color: #999;
	}
	.w {
		width: 990px;
		margin: 0 auto;
	}

	html,
	body,
	div,
	span,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	address,
	big,
	cite,
	code,
	del,
	em,
	font,
	img,
	ins,
	small,
	strong,
	var,
	b,
	u,
	i,
	center,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	form,
	label,
	legend {
		margin: 0;
		padding: 0;
	}

	.b-subnav-box {
		margin-top: 17px;
		margin-left: 13px;
	}

	body {
		font: 12px/150% Arial, Verdana, "\5b8b\4f53";
		color: #666;
		background: #fff;
		_background-image: url(about:blank);
		_background-attachment: fixed;
	}

	a img {
		border: 0;
	}

	a {
		color: #666;
		text-decoration: none;
	}

	img {
		vertical-align: middle;
	}

	ol,
	ul {
		list-style: none;
	}

	#ud-jbtype .msg-text {
		float: left;
		height: 36px;
		width: 126px;
	}

	#ud-jbtype .li-item {
		width: 148px;
		height: 58px;
		box-sizing: border-box;
	}
	.fl-text {
	    float: left;
	    width: 60px;
	    text-align: left;
	}
</style>
