// /plugins/vuex-persistedstate.js
// import createPersistedState from 'vuex-persistedstate'
// import Cookies from 'js-cookie'

// export default ({ store }) => {
//   // “将Vuex中的数据同步到cookie中”这种事只有客户端会做
//   if (!process.client) {
//     return
//   }

//   createPersistedState({
//     // 通过配置修改vuex-persistedstate的读写行为
//     // 将操作目标改为cookie
//     storage: {
//       getItem: key => {
//         return Cookies.get(key)
//       },
//       setItem: (key, value) => {
//         Cookies.set(key, value, {
//           expires: 365
//         })
//       },
//       removeItem: key => {
//         Cookies.remove(key)
//       }
//     }
//   })(store)
// }


import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: "store", // 读取本地存储的数据到store
        })(store)
    })
}