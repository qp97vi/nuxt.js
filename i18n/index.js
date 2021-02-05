import Cookies from 'js-cookie'
import VueI18n from 'vue-i18n'
import Vue from 'vue'
Vue.use(VueI18n)
import ElementLocale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'




import {
	zh as commonZh,
	en as commonEn
} from './common'
import {
	zh as loginZh,
	en as loginEn
} from './login'
import {
	zh as componentsZh,
	en as componentsEn,
	cf as componentsCf
} from './components'
import {
	zh as userZh,
	en as userEn
} from './user'

import {
	zh as activityZh,
	en as activityEn
} from './activity'

import {
	zh as articleZh,
	en as articleEn
} from './article'

import {
	zh as cartZh,
	en as cartEn
} from './cart'

import {
	zh as goodsZh,
	en as goodsEn
} from './goods'

import {
	zh as newjoinZh,
	en as newjoinEn
} from './newjoin'

import {
	zh as orderZh,
	en as orderEn
} from './order'



let EN = {
	lang: 'en',
	common: commonEn,
	login: loginEn,
	components: componentsEn,
	user: userEn,
	activity: activityEn,
	article:articleEn,
	cart:cartEn,
	goods:goodsEn,
	newjoin:newjoinEn,
	order:orderEn,
	...enLocale,
}

let CF ={
	lang: 'cf',
	components: componentsCf,
	...zhLocale,
}

let ZH = {
	lang: 'zh',
	common: commonZh,
	login: loginZh,
	components: componentsZh,
	user: userZh,
	activity: activityZh,
	article:articleZh, 
	cart:cartZh,
	goods:goodsZh,
	newjoin:newjoinZh,
	order:orderZh,
	...zhLocale,
}
export default ({ app, store }) => {
  const data = {}
  const locale = Cookies.get('hb_lang') || 'en_US'
//   const readDir = ['en_US', 'zh_CN', 'th_TH']
//   for (let i = 0; i < readDir.length; i++) {
//     data[readDir[i]] = Object.assign({}, require(`./${readDir[i]}.json`))
//   }

  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale:'zh_CN',
    fallbackLocale: locale, // 语言环境中不存在相应massage键时回退到指定语言
    messages: {
		en_US: EN,
		zh_CN: ZH,
		cf_CN: CF,
	}
  })
}




const i18n = new VueI18n({
	// locale: localStorage.getItem('language') || 'zh_CN',
	messages: {
		en_US: EN,
		zh_CN: ZH,
		cf_CN: CF,
	}
})
ElementLocale.i18n((key,value)=>i18n.t(key,value))

