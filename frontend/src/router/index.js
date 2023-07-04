import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: () => import ("../pages/Login.vue")
        },
        {
            path: '/info',
            name: 'Personinfo',
            component: () => import ("../pages/Person_info.vue")
        },
        {
            path: '/admin',
            name: 'Admin',
            component: () => import ("../pages/Admin.vue")
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     let user = JSON.parse(window.localStorage.getItem('access-user'))
    
//     if(from.path == '/') {
//         next()
//     } else if(to.path == '/') {
//         next()
//     } else {
//         if(user == null) {
//             next('/')
//         } else {
//             if (to.path == '/') {
//                 if(user) next(from.path)
//             }
//             next()
//         }
//     }
    
// })


export default router