<template>
  <div class="base">
    <!-- 注册登录界面 -->
   <div  class="loginAndRegist">
        <!--登录表单-->
        <div  class="loginArea">
            <transition
                    name="animate__animated animate__bounce"
                    enter-active-class="animate__fadeInUp"
                    leave-active-class="animate__zoomOut"
                    appear
            >
            <!-- 标语 -->
            <div v-show="isShow" class="title">
                LOGIN
            </div>
            </transition>
            <transition
                    name="animate__animated animate__bounce"
                    enter-active-class="animate__fadeInUp"
                    leave-active-class="animate__zoomOut"
                    appear
            >
            <!--下拉框 密码框和用户名框 -->
                <div v-show="isShow" class="pwdArea">
                    <div style="flex: 1;justify-content: center;display: flex;align-items: center">
                        帐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:&nbsp;&nbsp;
                       <el-input class="username" v-model="loginUser.account" style="width: 165px"  placeholder="账号"></el-input>
                    </div>
                    <div style="flex: 1;justify-content: center;display: flex;align-items: center">
                        密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:&nbsp;&nbsp; 
                        <el-input placeholder="密码"  v-model="loginUser.password" style="width: 165px" show-password></el-input>
                    </div>
            </div>
            </transition>
            <transition
                    name="animate__animated animate__bounce"
                    enter-active-class="animate__fadeInUp"
                    leave-active-class="animate__zoomOut"
                    appear
            >
            <!-- 登录按钮 -->
            <div v-show="isShow" class="btnArea">
                <el-button type="success" round style="background-color: #3e8fb2;letter-spacing: 5px" @click="UserLogin"  >登录</el-button>
            </div>
            </transition>
        </div>
        <div class="registArea">
        </div>
        <!-- 信息展示界面 -->
        <div id="aaa" class="showInfo"
              :style="{
             borderTopRightRadius:styleObj.bordertoprightradius,
             borderBottomRightRadius:styleObj.borderbottomrightradius,
             borderTopLeftRadius:styleObj.bordertopleftradius,
             borderBottomLeftRadius:styleObj.borderbottomleftradius,
             right:styleObj.rightDis
            }"
              ref="showInfoView">

          <transition
                name="animate__animated animate__bounce"
                enter-active-class="animate__fadeInUp"
                leave-active-class="animate__zoomOut"
                appear
        >
            <div v-show="isShow" style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;height: 100%">
             <!-- 欢迎语 -->
                 <div style="flex: 2;display: flex;align-items: center;font-size: 22px;color: #FFFFFF;font-weight: bold">
                 欢迎登入医院系统
                 </div>
            <!-- 欢迎图片 -->
                 <div style="flex: 2">
                     <!-- <el-button type="success"  style="background-color:#3e8fb2;border: 1px solid #ffffff;" round @click="changeToRegiest">还没有账户？点击注册</el-button> -->
                     <div style="display: flex;align-items: center;font-size: 22px;color: #FFFFFF;font-weight: bold">请输入您的账号密码</div>
                 </div>
           </div>
        </transition>
        </div>
   </div>
   
  </div>
</template>

<script>
import 'animate.css';
import axios from 'axios'

export default {

    name:'Login',
    data(){
        return{
            //看看用不用转成用户对象
            loginUser:{
                account:"",
                password:""
            },
            styleObj:{
                bordertoprightradius:'15px',
                borderbottomrightradius: '15px',
                bordertopleftradius:'0px',
                borderbottomleftradius:'0px',
                rightDis:'0px'
            },
            isShow:true
        }
    },

    methods: {
      // 用户登录
      UserLogin() {
        axios.post('/api/login', {
          account: this.loginUser.account,
          password: this.loginUser.password
        })
          .then(res => {
            console.log(res);
            if (res.data.code === 0) {
              console.log(res.data);
              localStorage.setItem("token",res.data.data.token)
              this.$message.success('登录成功！');
              this.$router.push('/info');
            }
            // else{
            //       this.$message.success('管理员登录成功！');
            //       this.$router.push('/admin');
            // }
          })
          .catch(error => {
            console.error(error);
            this.$message.error('请求出错！');
          });
    }
},

}

</script>

<style>

.base{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/images/wallhaven.jpg");
    background-size: 100%;
}
.loginAndRegist{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.loginArea{
    background-color: rgba(255,255,255,0.8);
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    height: 400px;
    width: 350px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
}
.registArea{
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    height: 400px;
    width: 350px;
    background-color: rgba(255,255,255,0.8);
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content:center ;
    align-items: center;
}
.showInfo{
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    position: absolute;
    height: 400px;
    width: 350px;
    z-index:2;
    top: 0;
    right: 0;
    background-color: rgba(22, 95, 113, 0.8);
    background-size: 90%;
}
.showInfo:hover{
    background-size: 100%;
    background-position: -50px -50px;
}
.title{
    width: 70%;
    flex:1;
    border-bottom: 1px solid #3e8fb2;
    display: flex;
    align-items: center;
    color: #3e8fb2;
    font-weight: bold;
    font-size: 24px;
    display: flex;
    justify-content: center;
}
#aaa{
    transition: 0.3s linear;
}
.pwdArea{
    width: 100%;
    flex:2;
    display: flex;
    flex-direction: column;
    color: #3e8fb2;
    font-size: 16px;
}

.pwdArea select{
    outline: none;
    width: 165px;
    height: 28px;
    border-radius:13px ;
    padding-left: 10px;
    font-size: 12px;
    border: 1px solid gray;
    text-align: center;
    text-align-last: center;
}

.pwdArea select:focus{
    border: 2px solid #3e8fb2;
}

.pwdArea input{
    outline: none;
    height: 30%;
    border-radius:13px ;
    padding-left: 10px;
    font-size: 12px;
    border: 1px solid gray;
}
.pwdArea input:focus{
    border: 2px solid #3e8fb2;
}
    .btnArea{
        flex:1;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

</style>