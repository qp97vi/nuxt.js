var Q=require('q');
export default function asyncLoadJs (url) {
  return Q.Promise((resolve, reject) => {
    let srcArr = document.getElementsByTagName("script");
    let hasLoaded = false;
    for (let i=0;i<srcArr.length;i++){//判断当前js是否加载上
      hasLoaded = (srcArr[i].src==url)?true:false;
    }
    if (hasLoaded) {
      resolve();
      return;
    }
    let script = document.createElement('script')
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild(script);
    script.onload = () => {
      resolve();
    }
    script.onerror = () => {
      reject();
    }
  })
}

export function loadCss(url){
  let css = document.createElement('link');
  css.href = url;
  css.rel = 'stylesheet';
  css.type = 'text/css';
  document.head.appendChild(css);
}

export function loadJs () {
  //加载css
  // loadCss( appDomainRoot+"/minemapapi/v1.3/minemap.css");
  // loadCss( appDomainRoot+"/minemapapi/v1.3/plugins/draw/minemap-draw.css");
  // loadCss( appDomainRoot+"/minemapapi/v1.3/plugins/edit/minemap-edit.css");
  //加载js
  return Q.Promise((resolve, reject) => {
    asyncLoadJs("https://apis.google.com/js/api:client.js")
      .then(() => {
        return asyncLoadJs("https://connect.facebook.net/en_US/sdk.js")
      })
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function loadAdvJs () {
  //加载广告js
  return Q.Promise((resolve, reject) => {
    asyncLoadJs("./adv.js")
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function loadImJs (imOrigin) {
  //加载css
  //加载js
  loadCss(imOrigin + "/static/test/common/layui/css/layui.css");
  return Q.Promise((resolve, reject) => {
    asyncLoadJs("//libs.baidu.com/jquery/2.0.0/jquery.min.js")
      .then(() => {
        return asyncLoadJs(imOrigin + "/static/test/common/layui/layui.js")
      })
	  .then(() => {
	    return asyncLoadJs(imOrigin + "/static/test/common/js/main.js")
	  })
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function getWssOrws () {
	if(window.location.protocol == "https:"){
		return "wss:"
	}else{
		return "ws:"
	}
}