<template>
<div>
<div class="personalCenter">
    <el-container>
      <el-header>个人中心</el-header>
        <el-container>
          <el-main>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <div class="img">
                  <div @click="toggleChangeAvatarDialog">
                    <el-avatar
                      :size="100"
                      :src="photo"
                      box-align="center"
                    ></el-avatar>
                  </div>
                <div class="change"><el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true" >编辑</el-button></div>
              </div>
              </div>
            <el-descriptions>
              <el-descriptions-item label="员工号">{{info.employee_number}}</el-descriptions-item>
              <el-descriptions-item label="姓名">{{info.doctor_name}}</el-descriptions-item>
              <el-descriptions-item label="性别">{{info.gender ? '男' : '女'}}</el-descriptions-item>
              <el-descriptions-item label="出生日期">{{info.date_of_birth}}</el-descriptions-item>
              <el-descriptions-item label="身份证号">{{info.identity_card}}</el-descriptions-item>
              <el-descriptions-item label="手机号">{{info.phone_number}}</el-descriptions-item>
              <el-descriptions-item label="所属诊室">{{info.office_name}}</el-descriptions-item>
            </el-descriptions>
            <br>
            <br>
            </el-card>
          </el-main>

            <!-- Form -->
            <el-dialog title="个人信息" :visible.sync="dialogVisible">
              <el-form :model="form">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="form.doctor_name" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-radio v-model="radio" label="1">男</el-radio>
                  <el-radio v-model="radio" label="0">女</el-radio>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                  <el-input v-model="form.identity_card" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                  <el-input v-model="form.phone_number" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="formLabelWidth">
                  <el-input v-model="form.date_of_birth" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateDoctor">确 定</el-button>
              </div>
            </el-dialog>


            <el-dialog title="更改头像" :visible.sync="showChangeAvatarDialog">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-dialog>

        </el-container>
    </el-container>
  </div>

</div>
</template>

<script>
  import request from 'request'
  export default {
    name: "personinfo",
    data() {
      return {
        i: null,

        info: {
        employee_number: '01',
        doctor_name: 'cxk',
        phone_number: '110',
        identity_card: '12345',
        gender: '男',
        office_name: '保卫科',
        date_of_birth: '2001-10-10',
        },
        photo:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',

        //修改信息
        dialogVisible: false,
        form: {

        },
        formLabelWidth: '72px',
        radio: '1',
        input: '',
        showChangeAvatarDialog: false,
        imageUrl: ''
      }
    },

    methods: {
      async getDoctors() {
        try {
          const response = await request.get('/doctors');
          const userInfo = response.data;
          // 使用获取到的数据更新 info 对象
          this.info = userInfo;
          console.error('111');
        } catch (error) {
          console.error('获取用户信息失败：', error);
        }
      },

      async updateDoctor() {
        try {
          const response = await request.put(`/doctors/:id}`, this.form);
          const updatedDoctor = response.data;
          console.log('更新医生信息成功:', updatedDoctor);
          this.dialogVisible = false;
        } catch (error) {
          console.error('更新医生信息失败：', error);
        }
      },

      toggleChangeAvatarDialog() {
        this.showChangeAvatarDialog = true;
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    mounted(){
      this.getDoctors()
    }
  }

</script>

<style scoped>
.el-header {
    line-height: 60px;
    text-align: center;
    background-color: #b3c0d1;
  }

  .el-container{
    height: 100vh;
    background-color: #e9eef3;
  }

  .el-aside {
    line-height: 44px;
    text-align: center;
    background-color: #d3dce6;
  }
  .el-main {
    display: flex;
    justify-content: center;
    line-height: 36px;
    text-align: center;
    height: 500px;
  }

  .demo-basic--circle {
    box-align: 'center';
    margin-top: 30px;
    margin-left: 150px;
  }
  .change .el-button{
    float: right;
  }

::v-deep .el-dialog{
  height: 430px;
  width: 800px;
}

  .block {
    margin-left: 25px;
    font-weight: bold;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }

  .el-input{
    width: 400px;
  }

  .sex-change .el-button{
    float: left;
    margin-left: 10px;
  }

  .site-change .el-button{
    float: left;
    margin-top: 3px;
    margin-left: 10px;
  }

  .email-change .el-button{
    float: left;
    margin-top: 3px;
    margin-left: 10px;
  }

  .site{
    display: flex;
  }
  .site .el-input el-input--mini el-input-group el-input-group--append{
    width: 10px;
  }
  .box-card {
    width: 1368px;
    border-radius: 30px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #8c939d;
    border-radius: 6px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>