import request from "@/utils/request";

/**
 * 获取商城基本信息
 */
export async function getShopConfig(param) {
  return request({
    url: "/mall/configs",
    method: "get",
    params: param,
  });
}

/**
 * 用户登录
 */
export async function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data: data,
  });
}

/**
 * 获取验证码
 */
export async function getVerifyImage(param) {

  return request({
    url: "/auth/verification",
    method: "get",
    params: param,
  });
}

/**
 * 获取验证码
 */
export async function getQrCode(param) {
  return request({
    url: "/mall/qr_code",
    method: "get",
    params: param,
  });
}

/**
 * 校验验证码
 */
export async function verifyVerifyImage(data) {

  return request({
    url: "/auth/verification",
    method: "post",
    params: data,
  });

}

/**
 * 获取用户基础信息
 */
export async function getBaseInfo() {

  return request({
    url: "/user/current",
    method: "get",
  });
}

/**
 * 退出
 */
export async function logout() {
  return request({
    url: "/user/logout",
    method: "post",
  });
}

/**
 * 获取单个广告
 */
export async function getAd(param) {
  return request({
    url: "/mall/ad",
    method: "get",
    params: param,
  });
}

/**
 * 获取广告列表
 */
export async function getAds(param) {
  return request({
    url: "/mall/ad/list",
    method: "get",
    params: param,
  });
}

/**
 * 获取地址列表
 */
export async function getRegionList(param) {

  return request({
    url: "/mall/region/list",
    method: "get",
    params: param,
  });
}

/**
 * 用户订单分页
 */
export async function userOrderPaging(param) {
  return request({
    url: "/order/user/page",
    method: "get",
    params: param,
  });
}
/*
 *秒杀活动页面
 * */
export async function getSeckill(param) {
  return request({
    url: "/mall/flash_sale/page",
    method: "get",
    params: param,
  });
}

/**
 * 商品收藏
 */
export async function collectionRecords(param) {
  return request({
    url: "/mall/goods_collect/page",
    method: "get",
    params: param,
  });
}
/*
 * 团购商品
 **/
export async function getGroup(param) {
  return request({
    url: "/mall/group_buy/goods/page",
    method: "get",
    params: param,
  });
}

/*商品分类查询列表*/
export async function getGoodsCategoryList(is_level1) {

  return request(`/mall/goods/category/list?level=${is_level1}`);

}

/*商品分类查询列表*/
export async function getGoodsCategories(param) {
  return request({
    url: "/mall/goods/category/list",
    method: "get",
    params: param,
  });
}

/*商品相册列表*/
export async function getGoodsImages(param) {
  return request({
    url: "/mall/goods/image/list",
    method: "get",
    params: param,
  });
}

/*商品列表*/
export async function getGoods(param) {
  return request({
    url: "/mall/goods/page",
    method: "get",
    params: param,
  });
}

/*商品信息*/
export async function getGoodsById(id) {
  return request({
    url: "/mall/goods/" + id,
    method: "get",
  });
}

/*商品sku信息*/
export async function getGoodsSku(params) {
  return request({
    url: "/mall/goods/sku",
    method: "get",
    params: params,
  });
}

/*商品配送运费信息*/
export async function getGoodsFreight(params) {
  return request({
    url: "/mall/goods/freight",
    method: "get",
    params: params,
  });
}

/*商品属性*/
export async function getGoodsAttr(params) {
  return request({
    url: "/mall/goods_attr/list",
    method: "get",
    params: params,
  });
}

/*商品评价信息*/
export async function getCommentStatistics(params) {
  return request({
    url: "/order/comment/statistics",
    method: "get",
    params: params,
  });
}

/*店铺分类评分*/
export async function getStoreClassStatistics(params) {
  return request({
    url: "/seller/store/class/statistics",
    method: "get",
    params: params,
  });
}

/*店铺街相关
 */
export async function getStoreStreet(params) {
  return request({
    url: "/seller/store/street",
    method: "get",
    params: params,
  });
}

/*店铺分类*/
export async function getStoreClassify() {

  return request(`/seller/store_class/list`);

}

/*
 * 商品访问记录
 **/
export async function accessGoods(param) {
  return request({
    url: "/mall/goods/visit/page",
    method: "get",
    params: param,
  });
}

/*
 * 删除商品访问记录
 **/
export async function deleteAccessRecords(param) {
  return request({
    url: "/mall/goods/visit",
    method: "delete",
    params: param,
  });
}

/*
 * 用户地址列表
 **/
export async function customerAddress() {
  return request({
    url: "/user/address/list",
    method: "get",
  });
}

/*删除用户地址*/
export async function removeAddress(id) {
  return request({
    url: "/user/address/" + id,
    method: "delete",
  });
}

/*
 * 用户兑换优惠券
 **/
export async function exchangeCoupon(data) {
  return request({
    url: "/mall/user/coupon",
    method: "post",
    data: data,
  });
}

/*
 * 用户优惠券列表
 **/
export async function userCoupons() {
  return request({
    url: "/mall/user/coupon/list",
    method: "get",
  });
}

/**
 * 订单商品评价列表
 */
export async function userCommentPaging(param) {
  return request({
    url: "/order/order_goods/comment/page",
    method: "get",
    params: param,
  });
}

/**
 * 商品评价列表
 */
export async function commentPage(param) {
  return request({
    url: "/order/comment/page",
    method: "get",
    params: param,
  });
}

/**
 * 商家回复商品评价列表
 */
export async function getCommentReplyList(param) {
  return request({
    url: "/order/comment/reply/list",
    method: "get",
    params: param,
  });
}

/**
 * 商品评价回复列表
 */
export async function getReplyList(param) {
  return request({
    url: "/order/reply/list",
    method: "get",
    params: param,
  });
}

/*
 * 用户优惠券分页
 **/
export async function userCouponPage(param) {
  return request({
    url: "/mall/user/coupon/page",
    method: "get",
    params: param,
  });
}

/*获取预售*/
export async function getPreSellList(params) {
  return request({
    url: "/mall/pre_sell/page",
    method: "get",
    params: params,
  });
}

/* 获取用户入驻资料 */
export async function getStoreApplyInfo() {
  return request({
    url: "/seller/store_apply/user",
    method: "get",
  });
}

/* 保存入驻申请 */
export async function saveStoreApply(data) {
  return request({
    url: "/seller/store_apply/user",
    method: "post",
    data: data,
  });
}

/* 更新入驻申请 */
export async function updateStoreApply(data) {
  return request({
    url: "/seller/store_apply/user",
    method: "put",
    data: data,
  });
}

/**
 * 获取商品分类下拉列表
 */
export async function getGoodsCategoryTree(param) {
  return request({
    url: "/mall/goods/category/tree",
    method: "get",
    params: param,
  });
}

/**
 * 获取入驻申请分类信息
 *
 * @export
 * @param {*} param 入驻时申请分类保存的三级分类id
 * @returns
 */
export async function getStoreApplyStoreClassInfo(param) {
  return request({
    url: "/mall/goods/category/store_apply/store_class",
    method: "get",
    params: param,
  });
}

/*获取促销*/
export async function getPromGoods(params) {
  return request({
    url: "/mall/prom_goods/goods/page",
    method: "get",
    params: params,
  });
}

/*获取咨询记录*/
export async function getGoodsConsultPage(params) {
  return request({
    url: "/mall/consult/user/page",
    method: "get",
    params: params,
  });
}

/*获取商品咨询分页*/
export async function getConsultPage(params) {
  return request({
    url: "/mall/consult/page",
    method: "get",
    params: params,
  });
}

/*获取举报信息*/
export async function getExposePage(params) {
  return request({
    url: "/order/expose/user/page",
    method: "get",
    params: params,
  });
}

/*文章左侧导航*/
export async function getArticleList(params) {
  return request({
    url: "/mall/article/directory",
    method: "get",
    params: params,
  });
}

/*文章右侧内容*/
export async function getArticle(id) {
  return request({
    url: `/mall/article?article_id=${id}`,
    method: "get",
  });
}

/*文章列表*/
export async function getArticles(params) {
  return request({
    url: "/mall/article/list",
    method: "get",
    params: params,
  });
}

/*用户获取分销订单列表*/
export async function getRebateOrderList(params) {
  return request({
    url: "/order/rebate_log/order_goods",
    method: "get",
    params: params,
  });
}

/*获取用户下线订单概况*/
export async function getRebateLogSurvey() {
  return request({
    url: "/order/rebate_log/survey",
    method: "get",
  });
}

/*用户订单商品*/
export async function getOrderGoods(params) {
  return request({
    url: "/order/order_goods",
    method: "get",
    params: params,
  });
}

/*店铺信息*/
export async function getStore(params) {
  return request({
    url: "/seller/store",
    method: "get",
    params: params,
  });
}

/*品牌信息*/
export async function getBrand(params) {
  return request({
    url: "/mall/brand",
    method: "get",
    params: params,
  });
}

/*品牌列表信息*/
export async function getBrands(params) {
  return request({
    url: "/mall/brand/list",
    method: "get",
    params: params,
  });
}

/*获取商品规格*/
export async function getSpec(params) {
  return request({
    url: "/mall/spec/goods",
    method: "get",
    params: params,
  });
}

/*获取商品规格价格以及判断是否为多规格商品*/
export async function getSpecPrice(params) {
  return request({
    url: "/mall/spec_goods_price/list",
    method: "get",
    params: params,
  });
}

/*获取店铺特色服务保障*/
export async function getGuaranteeItem(params) {
  return request({
    url: "/seller/guarantee_item/list/store_guarantee_info",
    method: "get",
    params: params,
  });
}

/*获取秒杀单个记录*/
export async function getFalseSale(id) {
  return request({
    url: "/mall/false_sale/" + id,
    method: "get",
  });
}

/*获取团购单个记录*/
export async function getGroupBuy(id) {
  return request({
    url: "/mall/group_buy/" + id,
    method: "get",
  });
}

/*获取促销单个记录*/
export async function getPromGoodsById(id) {
  return request({
    url: "/mall/prom_goods/" + id,
    method: "get",
  });
}

/*获取预售单个记录*/
export async function getPreSell(id) {
  return request({
    url: "/mall/pre_sell/" + id,
    method: "get",
  });
}

/*发货信息列表*/
export async function getLogistics(params) {
  return request({
    url: "/order/delivery_doc/list/user",
    method: "get",
    params: params,
  });
}

/*发货信息*/
export async function getDeliveryDoc(id) {
  return request({
    url: "/order/delivery_doc/" + id,
    method: "get",
  });
}

/*订单添加售后*/
export async function addReturnGoods(params) {
  return request({
    url: "/order/return_goods",
    method: "post",
    data: params,
  });
}

/*我的推广*/
export async function minePromotion(params) {
  return request({
    url: "/user/lower_level",
    method: "get",
    params: params,
  });
}

/*获取商品收藏*/
export async function getGoodsCollection(params) {
  return request({
    url: "/mall/goods_collects",
    method: "get",
    params: params,
  });
}

/*添加商品收藏*/
export async function addGoodsCollection(id) {
  return request({
    url: "/mall/goods_collects/" + id,
    method: "post",
  });
}

/*批量添加商品收藏*/
export async function addGoodsCollectionList(ids) {
  return request({
    url: "/mall/goods_collects/list/" + ids,
    method: "post",
  });
}

/*删除商品收藏*/
export async function removeGoodsCollection(id) {
  return request({
    url: "/mall/goods_collects/" + id,
    method: "delete",
  });
}

/*用户店铺收藏*/
export async function getShopCollect(params) {
  return request({
    url: "/user/store_collect/user/page",
    method: "get",
    params: params,
  });
}

/*用户取消店铺收藏*/
export async function storeCancelCollection(id) {
  return request({
    url: "/user/store_collect/" + id,
    method: "delete",
  });
}

/*用户退换货记录*/
export async function getUserReturnGoodsPage(params) {
  return request({
    url: "/order/return_goods/page/user",
    method: "get",
    params: params,
  });
}

/*删除优惠卷*/
export async function removeCoupon(id) {
  return request({
    url: "/mall/coupon/user_coupon/" + id,
    method: "delete",
  });
}

/*获取用户充值记录*/
export async function getUserRechargeRecord(params) {
  return request({
    url: "/order/recharge/page",
    method: "get",
    params: params,
  });
}

/*提现申请分页*/
export async function getapplicationWithdrawal(params) {
  return request({
    url: "/user/withdrawals/page",
    method: "get",
    params: params,
  });
}

/*我的积分*/
export async function getIntegralList(params) {
  return request({
    url: "/user/account_log/pay_points/page",
    method: "get",
    params: params,
  });
}

/*用户获取资金余额列表信息*/
export async function getfundBalance(params) {
  return request({
    url: "/user/account_log/user_money/page",
    method: "get",
    params: params,
  });
}

/*用户获取资金余额列表信息*/
export async function goodsCategory(params) {
  return request({
    url: "/mall/goods/visit/cat/list",
    method: "get",
    params: params,
  });
}

/*地区列表*/
export async function getInList(params) {
  return request({
    url: "/mall/region/list",
    method: "get",
    params: params,
  });
}

/*店铺商品分类*/
export async function getStoreGoodsClassList(params) {
  return request({
    url: "/seller/store_goods_class/list",
    method: "get",
    params: params,
  });
}

/*新增地址*/
export async function newAddress(params) {
  return request({
    url: "/user/address",
    method: "post",
    data: params,
  });
}

/*单个用户地址*/
export async function singleUserAddress(id) {
  return request({
    url: "/user/address/" + id,
    method: "get",
  });
}

/*修改用户地址*/
export async function modifyUserAddress(params) {
  return request({
    url: "/user/address",
    method: "put",
    data: params,
  });
}

/*商品搜索*/
export async function commoditySearch(params) {
  return request({
    url: "/order/user/page",
    method: "get",
    params: params,
  });
}

/*订单商品退货记录*/
export async function returnRecord(params) {
  return request({
    url: "/order/return_goods",
    method: "get",
    params: params,
  });
}

/*订单商品退货记录列表*/
export async function returnRecordList(params) {
  return request({
    url: "/order/return_goods/list",
    method: "get",
    params: params,
  });
}

/*订单详情页*/
export async function getorderDetails(params) {
  return request({
    url: "/order/user",
    method: "get",
    params: params,
  });
}
/*获取投诉记录列表*/
export async function getComplainPage(params) {
  return request({
    url: "/order/complain/page/user",
    method: "get",
    params: params,
  });
}

/*获取预售活动*/
export async function preSellDetails(id) {
  return request({
    url: "/mall/pre_sell/" + id,
    method: "get",
  });
}

/*物流信息测试结果*/
export async function getLogisticsInformation(params) {
  return request({
    url: "/order/delivery_doc/express",
    method: "get",
    params: params,
  });
}

/*订单确认收货*/
export async function confirmReceipt(data) {
  return request({
    url: "/order/order_status/2",
    method: "put",
    data: data,
  });
}

/*获取购物车账单*/
export async function getCartBill(params) {
  return request({
    url: "/mall/cart/bill",
    method: "get",
    params: params,
  });
}

/*获取购物车账单*/
export async function addCart(data) {
  return request({
    url: "/mall/cart",
    method: "post",
    data: data,
  });
}

/*修改购物车账单*/
export async function updateCart(data) {
  return request({
    url: "/mall/cart/bill",
    method: "put",
    data: data,
  });
}

/*删除购物车*/
export async function deleteCart(ids) {
  return request({
    url: "/mall/cart/" + ids,
    method: "delete",
  });
}

/*获取购物车订单*/
export async function getCartOrder(params) {
  return request({
    url: "/mall/cart/order",
    method: "get",
    params: params,
  });
}

/*提交购物车订单*/
export async function addCartOrder(data) {
  return request({
    url: "/mall/cart/order",
    method: "post",
    data: data,
  });

}




/*提交立即购买订单*/
export async function addCartOrderByGoodsSku(data, goodsId, itemId, goodsNum) {
	return request({
		url: '/mall/cart/order?goods_id=' + goodsId + '&item_id=' + itemId + '&goods_num=' + goodsNum,
		method: 'post',
		data: data
	})
}

/*获取获取支付订单*/
export async function getPayMasterOrder(params) {
  return request({
    url: "/order/pay/master_order",
    method: "get",
    params: params,
  });
}

/*微信支付订单*/
export async function wxPayOrder(data) {
  return request({
    url: "/order/unified",
    method: "post",
    data: data,
  });
}

/*支付宝支付订单*/
export async function aliPayOrder(params) {
  return request({
    url: "/order/ali_pay",
    method: "post",
    params: params,
  });
}

/*获取用户发票*/
export async function getUserExtend() {
  return request({
    url: "/user/user_extend",
    method: "get",
  });
}

/*添加或者修改用户发票*/
export async function addOrUpdateUserExtend(data) {
  return request({
    url: "/user/user_extend",
    method: "put",
    data: data,
  });
}
/*卖家服务提交评价*/
export async function submitEvaluation(data) {
  return request({
    url: "/order/comment",
    method: "post",
    data: data,
  });
 
	return request({
		url: '/user/user_extend',
		method: 'put',
		data: data
	})
}

/*订单服务提交评价*/
// export async function orderComment (data) {
//   return request({
//     url: '/order/comment',
//     method: 'post',
//     data: data
//   })
// }

/*获取优惠券账单*/
export async function getCouponPage(params) {
  return request({
    url: "/mall/coupon/page",
    method: "get",
    params: params,
  });
}

/*用户猜你喜欢*/
export async function getGuessYouLike(params) {
  return request({
    url: "/mall/goods/visit/list",
    method: "get",
    params: params,
  });
}

/*用户余额提现*/
export async function userWithdrawals(data) {
  return request({
    url: "/user/withdrawals",
    method: "post",
    data: data,
  });
}

/*订单服务评价*/
export async function orderEvaluate(data) {
  return request({
    url: "/order/order_comment",
    method: "post",
    data: data,
  });
}

/*用户第三方绑定信息*/
export async function oauthUser(params) {
  return request({
    url: "/user/oauth",
    method: "get",
    params: params,
  });
}

/*申请纠纷类型*/
export async function getDisputeType(params) {
  return request({
    url: "/order/complain_subject/list",
    method: "get",
    params: params,
  });
}

/*举报单数据*/
export async function getReportSingle(params) {
  return request({
    url: "/order/expose",
    method: "get",
    params: params,
  });
}

/*个人信息修改*/
export async function revampPersonalDetails(data) {
  return request({
    url: "/user/",
    method: "put",
    data: data,
  });
}

/*订单搜后记录*/
export async function balanceCompensation(param, form) {
  return request({
    url: "/order/return_goods/delivery/user?id=" + param,
    method: "post",
    data: form,
  });
}

/*取消服务单*/
export async function cancelServiceOrder(params) {
  return request({
    url: "/order/return_goods/status/-2",
    method: "put",
    params: params,
  });
}

/*取消订单*/
export async function cancellationOrder(data) {
  return request({
    url: "/order/order_status/3",
    method: "put",
    data: data,
  });
}

/*删除评价*/
export async function deleteComments(data) {
  return request({
    url: "/order/comment/user",
    method: "delete",
    params: data,
  });
}

/*获取投诉信息*/
export async function getComplain(params) {
  return request({
    url: "/order/complain",
    method: "get",
    params: params,
  });
}

/*获取投诉对话*/
export async function getComplainTalkList(params) {
  return request({
    url: "/order/complain_talk/list",
    method: "get",
    params: params,
  });
}

/*修改投诉*/
export async function updateComplain(data) {
  return request({
    url: "/order/complain",
    method: "put",
    data: data,
  });
}

/*投诉(发布对话)*/
export async function addComplainTalk(data) {
  return request({
    url: "/order/complain_talk",
    method: "post",
    data: data,
  });
}

/*提交纠纷申请*/
export async function applicationDispute(data) {
  return request({
    url: "/order/complain",
    method: "post",
    data: data,
  });
}

/*获取短信验证码 */
export async function getCode(data) {
  return request({
    url: "/user/sms/log",
    method: "post",
    data: data,
  });
}

/*获取邮箱验证码 */
export async function getEmailCode(data) {
  return request({
    url: "/user/mail/log",
    method: "post",
    data: data,
  });
}

/*获取验证码倒计时 */
// export async function countDown() {
//   return request({
//     url: '/mall/configs?inc_type=sms',
//     method: 'get'
//   })
// }

/*修改手机号 */
export async function amendNumber(data) {
  return request({
    url: "/user/mobile",
    method: "put",
    data: data,
  });
}

/*修改用户信息 */
export async function updateUserInfo(data) {
  return request({
    url: "/user/",
    method: "put",
    data: data,
  });
}

/*获取等级 */
export async function accessLevel(data) {
  return request({
    url: "/user/user_level",
    method: "get",
    params: data,
  });
}

/*获取商品分类*/
export async function getStoreGoodsClassTree(params) {
  return request({
    url: "/seller/store_goods_class/tree",
    method: "get",
    params: params,
  });
}

/*获取店铺商品分类1*/
export async function getstoreCommodityClassifyw(params) {
  return request({
    url: "/seller/store_navigation/list",
    method: "get",
    params: params,
  });
}
/*商品列表*/
export async function getGoodsList(params, pageData) {
  return request({
    url: `/mall/goods/page`,
    method: "get",
    params: params,
  });
}
/*商品列表筛选*/
export async function getGoodsFilter(url) {
  return request({
    url: `/mall/goods/filter_urls?filter_url=/mall/goods/page?${url}`,
    method: "get",
  });
}
/*商品分类列表查询接口*/
export async function getGoodsId(params) {
  return request({
    url: `/mall/goods/category/list`,
    params: params,
    method: "get",
  });
}
/*查询一级分类*/
export async function getGoodsFirstId(params) {
  return request({
    url: "/mall/goods/category",
    params: params,
    method: "get",
  });
 

	return request({
		url: '/seller/store_navigation/list',
		method: 'get',
		params: params
	})
}

/*获取店铺商品分类2*/
export async function getstoreCommodityClassifyt(params) {
  return request({
    url: "/seller/store_navigation/user",
    method: "get",
    params: params,
  });
}

/*获取店铺最新用户收藏*/
export async function getcollectUser(params) {
  return request({
    url: "/user/store_collect/list/index",
    method: "get",
    params: params,
  });
}

/*用户收藏店铺*/
export async function getaddFavoriteStores(id) {
  return request({
    url: "/user/store_collect/" + id,
    method: "post",
  });
}

/*获取消息条目*/
export async function userMessageTab(param) {
  return request({
    url: "/user/message/tab?category=" + param,
    method: "get",
  });
}

/*物流消息分页*/
export async function messageLogisticsPage(params) {
  return request({
    url: "/user/message/message/logistics/page",
    method: "get",
    params: params,
  });
}

/*活动消息分页*/
export async function messageActivityPage(params) {
  return request({
    url: "/user/message/activity/page",
    method: "get",
    params: params,
  });
}

/*私信消息分页*/
export async function messagePrivatePage(params) {
  return request({
    url: "/user/message/message/private/page",
    method: "get",
    params: params,
  });
}

/*通知消息分页*/
export async function messageNoticePage(params) {
  return request({
    url: "/user/message/notice/page",
    method: "get",
    params: params,
  });
}

/*设置消息已读*/
export async function putMessageSee(params) {
  return request({
    url: "/user/message/is_see",
    method: "put",
    params: params,
  });
}

/*批量删除消息*/
export async function deleteMessage(id) {
  return request({
    url: "/user/message/" + id,
    method: "delete",
  });
}

/*获取订单商品*/
export async function getOrderGoodsList(params) {
  return request({
    url: "/order/order_goods/list",
    method: "get",
    params: params,
  });
}

/*校验短信验证码 */
export async function verification(data) {
  return request({
    url: "/user/sms/verification",
    method: "post",
    data: data,
  });
}

/*校验邮箱验证码 */
export async function checkEmailCode(data) {
  return request({
    url: "/user/mail/verification",
    method: "post",
    data: data,
  });
}

/*用户修改密码 */
export async function changePassWord(data) {
  return request({
    url: "/user/password",
    method: "put",
    data: data,
  });
}

/*消息数据 */
export async function getNews() {
  return request({
    url: "/user/message/count",
    method: "get",
  });
}

/*退出登录 */
export async function exitLogin() {
  return request({
    url: "/mall/logout",
    method: "post",
  });
}

/*修改支付密码 */
export async function changePaymentPassword(data) {
  return request({
    url: "/user/paypwd",
    method: "put",
    data: data,
  });
}

/*手机号注册 */
export async function mobilePhoneRegistration(data) {
  return request({
    url: "/user/register",
    method: "post",
    data: data,
  });
}

/*获取账号 */
export async function accessAccount(data) {
  return request({
    url: "/user/user",
    method: "get",
    params: data,
  });
}

/*忘记密码 */
export async function forgetPassword(data) {
  return request({
    url: "/user/password/forgot",
    method: "put",
    data: data,
  });
}

/*获取优惠券 */
export async function getCoupon(id) {
  return request({
    url: "/mall/coupon/" + id,
    method: "get",
  });
}

/*获取树状结构帮助分类 */
export async function helpTypeTree() {
  return request({
    url: "/mall/help_type/tree",
    method: "get",
  });
}

/*获取帮助列表 */
export async function helpList(params) {
  return request({
    url: "/mall/help/list",
    method: "get",
    params: params,
  });
}

/*获取帮助列表 */
export async function helpInfo(params) {
  return request({
    url: "/mall/help",
    method: "get",
    params: params,
  });
}

/**
 * 新增咨询
 */
export async function addGoodsConsult(data) {
  return request({
    url: "/mall/consult",
    method: "post",
    data: data,
  });
}

/*获取举报类型列表 */
export async function exposeTypeList() {
  return request({
    url: "/order/expose_type/list",
    method: "get",
  });
}

/*用户举报申请*/
export async function exposeApply(data) {
  return request({
    url: "/order/expose",
    method: "post",
    data: data,
  });
}

/*获取用户完整地址*/
export async function getAddress(params) {
  return request({
    url: "/mall/region/name",
    method: "get",
    params: params,
  });
}

/*获取Stripe可发布的密钥*/
export async function getStripePublishableKey(params) {
  return request({
    url: "/order/stripe/publishable_key",
    method: "get",
    params: params,
  });
}

export async function getStripeSecret(params) {
  return request({
    url: "/order/stripe/secret",
    method: "get",
    params: params,
  });
}

export async function getStripeSessionId(data) {
  return request({
    url: "/order/stripe/session",
    method: "post",
    data: data,
  });

	return request({
		url: '/order/stripe/publishable_key',
		method: 'get',
		params: params
	})
}


/* 获取楼层数据 */
export async function getfloors() {
  return request({
    url: "/mall/floor/index",
    method: "get",
  });
}
export async function getPayPalClientId(params) {
  return request({
    url: "/order/pay_pal/client_id",
    method: "get",
    params: params,
  });
}


export async function getStorePcIndexTemplate(storeId) {
  return request({
    url: "/seller/store/bind_template/" + storeId,
    method: "get",
  });
 
	return request({
		url: '/mall/floor/index',
		method: 'get',
	})
}
//获取友情链接列表
export async function getFriendLinkList() {
  return request({
    url: "/mall/friend_link/list",
    method: "get",
  });
}

// 获取服务协议
export async function getSystemArticle() {
  return request({
    url: "/mall/system_article?doc_code=agreement",
    method: "get",
  });
}

export async function getInventory(id) {
  return request({
    url: "/mall/inventory/" + id,
    method: "get",
  });
}

//获得全站海报
export async function getPosterAdmin() {
  return request({
    url: "/mall/poster/admin_poster",
    method: "get",
  });
}
//获得商家海报
export async function getPosterSeller(params) {
  return request({
    url: "/mall/poster/seller_poster",
    method: "get",
    params: params,
  });
 
	return request({
		url: '/mall/poster/admin_poster',
		method: 'get',
	})
}
//获取试用商品列表
export async function getIPageTrialGoods(params) {
  return request({
    url: "/mall/trial_goods",
    method: "get",
    params: params,
  });
}

//获取申请试用
export async function getTrialApply(params) {
  return request({
    url: "/mall/trial_apply",
    method: "get",
    params: params,
  });
}

//获取是否分享
export async function getCheckCounts(params) {
  return request({
    url: "/mall/trial_share/share_check",
    method: "get",
    params: params,
  });
}

//分享
export async function addshare(date) {
  return request({
    url: "/mall/trial_share",
    method: "post",
    data: date,
  });
}

//创建试用订单
export async function addTrialOrder(date) {
  return request({
    url: "/order/trial_order",
    method: "post",
    data: date,
  });
}

//获取是否申请
export async function getApplyCheck(params) {
  return request({
    url: "/mall/trial_apply/apply_check",
    method: "get",
    params: params,
  });
 
}

//获取试用订单
export async function getTrialOrder(params) {
 
  return request({
    url: "/order/trial_order",
    method: "get",
    params: params,
  });
}

//支付
export async function trialUserPay(date) {
 


  return request({
    url: "/order/trial_order/trial_user_pay",
    method: "post",
    data: date,
  });
}

//获取试用商品邮费
export async function getTrialGoodsfreight(params) {
 

  return request({
    url: "/mall/trial_goods/freight",
    method: "get",
    params: params,
  });
}

//收货确认
export async function putDelivery(params) {
 


  return request({
    url: "/order/trial_order/delivery",
    method: "put",
    params: params,
  });
}

//获取收货人信息
export async function getTrialOrderShippingByOrderSn(params) {
 

  return request({
    url: "/order/trial_order_shipping",
    method: "get",
    params: params,
  });
}

//试用商品所有试用轮播图
export async function getTrialPoster(params) {
 

  return request({
    url: "/mall/trial_poster",
    method: "get",
    params: params,
  });
}

// //获取试用订单的信息及物流
// export async function getTrialOrderDeliver(params) {
// 	return request({
// 		url: 'getTrialOrderDeliver',
// 		method: 'get',
// 		params: params
// 	})
// }
/**
 * 获取审核动态
 */
export async function getApprovedTrend(param) {
	return request({
		url: '/mall/trend_user/get_approved',
		method: 'get',
		params:param
	})
}

/**
 * 动态点赞
 */
export async function addTrendPraise(data) {
	return request({
		url: '/mall/trend_praise/addPraise',
		method: 'post',
		data: data
	})
 
}

//获取试用订单的信息及物流
export async function getTrialOrderDeliver(params) {
  return request({
    url: "/order/trial_order_deliver",
    method: "get",
    params: params,
  });
}

//获取订单里的试用商品
export async function getTrialOrderGoods(params) {
  return request({
    url: "/order/trial_order_goods",
    method: "get",
    params: params,
  });
}

//获取试用评论
export async function gettrialcomment() {
  return request({
    url: "/order/trial_comment",
    method: "get",
  });
}
//添加试用评论
export async function posttrialcomment(data) {
  return request({
    url: "/order/trial_comment",
    method: "post",
    data: data,
  });
}

/*
查询是否绑定三方平台
*/
export async function getBindInfo(params) {
  return request({
    url: "/user/oauth/user",
    method: "get",
    params: params,
  });
}

/*
查询试用流程
*/
export async function returnFlowInt(params) {
  return request({
    url: "/mall/trial_goods/flow",
    method: "get",
    params: params,
  });
}

/* 获取充值面额
 */
export async function getRechargeFaceIPage(param) {
  return request({
    url: "/order/recharge_face",
    method: "get",
    params: param,
  });
}

/* 创建充值单
 */
export async function addRecharge(data) {
  return request({
    url: "/order/recharge",
    method: "post",
    data: data,
  });
}
/*批量添加购物车*/
export async function addCartList(params) {
  return request({
    url: "/mall/cart/list",
    method: "post",
    data: params,
  });
}

/*未登录购物车展示*/ 
export async function getCartListBill(params) {
	return request({
		url: "/mall/cart/list/bill",
		method: 'POST',
		data: params,
	})
}


//获得code
export async function getcodeEmail(params) {
  return request({
    url: "/user/mail",
    method: "get",
    params: params,
  });
}


/*未登录检测是否能加入购物车*/
export async function getCartUnlisted(params) {
	return request({
		url:"/mall/cart/unlisted",
		method: 'post',
		data: params
	})
 
} 


//访客事件
export async function sba(data) {
	return request({ 
		url: "/mall/website/log",
		method: 'POST',
		data: data,
	})
}
 

/**
 * 动态详情
 */
export async function getTrendDetails(param) {
	return request({
		url: '/mall/trend/get_trend_details',
		method: 'get',
		params: param
	})
}
/**
 * 获取自己动态
 */
export async function getUserComment(param) {
	return request({
		url: '/mall/trend_user/get_user_trend',
		method: 'get',
		params: param
	})
}
/**
 * 获取自己点赞
 */
export async function getTrendPraise(param) {
	return request({
		url: '/mall/trend/get_trend_praise',
		method: 'get',
		params: param
	})
}

export async function getPaypalDetail(params) {
	return request({
		url: '/order/pay_pal/notify',
		method: 'get',
		params: params
	})
}

export async function getVirtualCode(params) {
	return request({
		url: '/order/virtual_code',
		method: 'get',
		params: params
	})
}