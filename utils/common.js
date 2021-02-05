module.exports = {
	Obj2Str: function (obj) {
		var str = '';
		for (var i in obj) {
			str += (str ? '&' : '') + i + '=' + obj[i]
		}
		return str;
	},
	/** 格式化时间 */
	format: function (timestamp, fmt) {
		var date = new Date();
		date.setTime(timestamp * 1000);
		var o = {
			"M+": date.getMonth() + 1, //月份 
			"d+": date.getDate(), //日 
			"h+": date.getHours(), //小时 
			"m+": date.getMinutes(), //分 
			"s+": date.getSeconds(), //秒 
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
			"S": date.getMilliseconds() //毫秒 
		};
		if (typeof fmt == 'undefined') fmt = 'yyyy-MM-dd hh:mm:ss';
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	//验证密码  
	// 对应的验证规则是：密码中必须包含字母、数字、特称字符，至少6个字符，最多16个字符。 
	VerifyPassword(password) {
		var regex = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$'); //符合格式的
		var num = new RegExp('^[0-9]{6,16}$') //验证数字
		if (num.test(password) == true) {
			this.toast("none", "密码不能全是数字", 3000)
			return false
		}
		if (regex.test(password) == true) {
			return regex.test(password)
		} else {
			this.toast("none", "密码过于简单", 3000)
			return false;

		}

	},
	/**
	 * 时间戳差 转为 剩余时间(时分秒中文作为间隔)
	 */
	remainTime(diffms) {
		const daysms = 24 * 60 * 60 * 1000;
		const hoursms = 60 * 60 * 1000;
		const minutems = 60 * 1000;
		const secondms = 1000;
		var result = '';
		let hasfrontVal = false;
		
		var differDay = Math.floor(diffms / daysms);
		result = differDay ? differDay + '天' : '0天';
		hasfrontVal = differDay ? true : false;

		diffms -= differDay * daysms;
		var differHour = Math.floor(diffms / hoursms);
		result += differHour ? differHour + '时' : '0时';
		hasfrontVal = differHour ? true : false;

		diffms -= differHour * hoursms;
		var differMinute = Math.floor(diffms / minutems);
		result += differMinute ? differMinute + '分' : '0分';

		diffms -= differMinute * minutems;
		var differSecond = Math.floor(diffms / secondms);
		result += differSecond ? differSecond + '秒' : '0秒';
		
		return result;
	}
	,
	/**
	 * 时间戳差 转为 剩余时间(:作为间隔)
	 */
	remainTime2(diffms) {
		const daysms = 24 * 60 * 60 * 1000;
		const hoursms = 60 * 60 * 1000;
		const minutems = 60 * 1000;
		const secondms = 1000;
		var result = '';
		let hasfrontVal = false;
		
		var differDay = Math.floor(diffms / daysms);
		result = differDay ? differDay + ':' : '0:';
		hasfrontVal = differDay ? true : false;

		diffms -= differDay * daysms;
		var differHour = Math.floor(diffms / hoursms);
		result += differHour ? differHour + ':' : '0:';
		hasfrontVal = differHour ? true : false;

		diffms -= differHour * hoursms;
		var differMinute = Math.floor(diffms / minutems);
		result += differMinute ? differMinute + ':' : '0:';

		diffms -= differMinute * minutems;
		var differSecond = Math.floor(diffms / secondms);
		result += differSecond ? differSecond + '' : '0';
		
		return result;
	},
	/*设置sessionStorage值*/ 
	setSessionData(key,data) {
		let storage = window.sessionStorage;  
		storage.setItem(key, JSON.stringify(data)); 
	},
	/*获取sessionStorage值*/
	getSessionData(key) {
		let storage = window.sessionStorage;  
		let data;
		data =  JSON.parse(storage.getItem(key))||[];
		return data;
	},
	/*清除指定值  sessionStorage*/
	removeSessionItem(key) {
		let storage = window.sessionStorage;  
		storage.removeItem(key);
	},
	/*清除所有 sessionStorage*/
	clearSession() {
		sessionStorage.clear();
	} ,
}