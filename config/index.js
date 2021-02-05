/**
 * @description 系统全局配置
 */
export default {
	/**
	 * @description 全局请求域名
	 */
	globalUrl: 'https://bb2t.tp-shop.cn',
	/**
	 * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
	 */
	tokenCookieExpires: 1,
	/**
	 * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天
	 */
	passCookieExpires: 1,
	/**
	 * @description 此处修改网站名称
	 */
	webName: '',
	/**
	 * @description 是否只保持一个子菜单的展开
	 */
	uniqueOpened: true,
	/**
	 * @description token key
	 */
	TokenKey: 'JPCToken',

	/**
	 * @description 请求超时时间，毫秒（默认2分钟）
	 */
	timeout: 10000,

	/**
	 * 底部文字，支持html语法
	 */
	footerTxt: '',

	/**
	 * 备案号
	 */
	caseNumber: '',
	/**
	 * 用户
	 */
	User: 'JUser',
	/**
	 * 定位地址
	 */
	Location: 'JLocation'
}
