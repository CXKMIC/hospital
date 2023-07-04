<template>
<div>
  <div>

  <el-tabs :tab-position="tabPosition" style="height: 100vh;">
    <el-tab-pane label="科室管理"><department></department></el-tab-pane>
    <el-tab-pane label="诊室管理"><clinic></clinic></el-tab-pane>
    <el-tab-pane label="医生管理"><doctor></doctor>></el-tab-pane>
    <el-tab-pane label="出诊管理"><appointmentRecord></appointmentRecord>></el-tab-pane>
    <el-tab-pane label="用户管理"><users></users></el-tab-pane>
  </el-tabs>


  </div>
</div>
</template>

<script>
import department from '@/components/department.vue'
import clinic from '@/components/clinic.vue'
import doctor from '@/components/doctor.vue'
import users from '@/components/users.vue'
import appointmentRecord from '@/components/AppointmentRecord.vue'
  export default {
    name: 'Admin',
    data() {
        return {
            tabPosition: 'left',
        };
  },
  methods: {
  },
    components: { department,clinic,doctor,appointmentRecord,users }
}
</script>

<style scoped>
::v-deep .el-tabs--left .el-tabs__header.is-left{
  width: 15vh;
}
::v-deep #tab-0{
  text-align: center;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
}
::v-deep #tab-1{
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  height: 60px;
}
::v-deep #tab-2{
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  height: 60px;
}
::v-deep #tab-3{
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  height: 60px;
}
::v-deep #tab-4{
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  height: 60px;
}
</style>