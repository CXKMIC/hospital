<template>
  <!-- 书籍列表卡片 -->
  <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="医生姓名" label-width="70px">
            <el-input clearable v-model="formInline.username" placeholder="请输入医生姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="70px">
            <el-input clearable v-model="formInline.book_name" placeholder="请输入性别"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" label-width="70px">
            <el-input clearable v-model="formInline.book_name" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="所属诊室" label-width="70px">
            <el-input clearable v-model="formInline.book_name" placeholder="请输入所属诊室"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 10px">
            <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
            <el-button type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
            <el-button type="success" icon="el-icon-plus" @click="handleAdd">添加</el-button>
          </el-form-item>
        </el-form>

        <!-- 表格内容显示区域   -->
        <el-table
          :data="tableData"
          style="width: 100%">

          <el-table-column
          label="员工号"
          width="100">
        <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.employee_number }}</span>
        </template>
        </el-table-column>

          <el-table-column
          label="医生姓名"
          width="100">
        <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.doctor_name }}</span>
        </template>
        </el-table-column>

        <el-table-column
          label="性别"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.gender }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="出生日期"
          width="130">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date_of_birth }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="身份证号"
          width="130">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.identity_card }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="电话号码"
          width="130">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.phone_number }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="挂号费"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.registration_fee }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="医生描述"
          width="130">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.description }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="所属诊室"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.office_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="照片"
          width="130">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.photo }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- Form -->
      <el-dialog title="医生信息" :visible.sync="dialogFormVisible" >
        <el-form :model="form">
          <el-form-item label="员工号" :label-width="formLabelWidth">
            <el-input v-model="form.employee_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医生姓名" :label-width="formLabelWidth">
            <el-input v-model="form.doctor_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-input v-model="form.gender" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" :label-width="formLabelWidth">
            <el-input v-model="form.date_of_birth" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth">
            <el-input v-model="form.identity_card" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth">
            <el-input v-model="form.phone_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="挂号费" :label-width="formLabelWidth">
            <el-input v-model="form.registration_fee" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医生描述" :label-width="formLabelWidth">
            <el-input v-model="form.description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属诊室" :label-width="formLabelWidth">
            <el-input v-model="form.office_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="照片" :label-width="formLabelWidth">
            <el-input v-model="form.photo" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"  @click="handleEditconfirm">确 定</el-button>
        </div>
      </el-dialog>
      <br>
      <!--   分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        :total="employee_number">
      </el-pagination>
      
    </el-card>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'doctor',
    data() {
        return {
            formInline: {
              employee_number: "",
              doctor_name: "",
              gender:"",
              date_of_birth: "",
              identity_card: "",
              phone_number: "",
              registration_fee: "",
              description: "",
              office_name: "",
              photo: "",
            },
            value: "",
            //列表
            tableData: [{
                    employee_number: "xasdw12312",
                    "doctor_name": "活着",
                    "gender": 1,
                    "date_of_birth": "余华",
                    "identity_card": "清华大学出版社",
                    "phone_number": 23.3,
                    "registration_fee": 9,
                    "description": "huozhe.png",
                    "office_name": 100,
                    "photo": 100
                }],
            currentPage: 1,
            pageSize: 10,
            employee_number: 0,
            status:0,
            
            //编辑 添加
            dialogFormVisible: false,
            form: {
            },
            formLabelWidth: '120px',
            index:'',
        };
  },
  created() {
    this.handleQueryAll()
  },
  methods: {
      onSubmit() {
          console.log("submit!");
      },
      handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(page) {
          console.log(`当前页: ${page}`);
          axios({
            url: `/api/doctors`,
            method: 'get',
            params: {
              page: page,
              size: this.pageSize
            }
          }).then(res => {
            this.tableData = res.data
          })
      },
      handleEdit(index, row){
        console.log(row)
        this.status = 0
        this.dialogFormVisible = true
        this.index = index
      },
      handleEditconfirm () {
        //添加
        if(this.status === 1) {
          this.tableData.unshift(this.form)
          this.form = {}
          this.status = 0
        //编辑
        } else {
          Object.keys(this.tableData[this.index]).forEach((key)=>{
            if(this.form[key]) {
              this.tableData[this.index][key] = this.form[key]
            }
          })
          this.form={}
        }
        this.dialogFormVisible = false
        axios({
          url: `/api/doctors/:id}`,
          method: 'put',
          data: this.tableData[this.index]
        })
        .then(()=> this.handleQueryAll())
      },

      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          // 向服务器发送删除数据的请求
          axios.delete(`/api/doctors/:id}`)
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              // 从表格数据中移除已删除的数据
              this.tableData = this.tableData.filter(item => item.employee_number !== row.employee_number);
            })
            .catch(error => {
              console.error('删除数据失败：', error);
              this.$message.error('删除数据失败，请稍后重试。');
            });
        })  
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      
      handleReset() {
          this.formInline.doctor_name_name = "";
          this.formInline.gender = "";
          this.formInline.phone_number = "";
          this.formInline.office_name = "";
      },
      handleQueryAll() {
        axios({
          url: `/api/doctors`,
          method: 'get',
        }).then(res => {
          this.tableData = res.data
          this.employee_number = res.data.length
        })
      },
      handleQuery() {
        let data = this.formInline
        axios({
          url: `/api/doctors`,
          method: 'get',
          data: {
            type: data.type
          }
        }).then(res => {
          this.tableData = res.data
        })
      },
      handleAdd() {
        axios.post(`/api/doctors`, this.tableData)
        .then(res => {
          console.log(this);
          const data = res.data;
          if (res.status == "200") {
              this, this.tableData.push(data);
          }
          else if (res.status == "400") {
              this.$message.warning(res.msg);
          }
          else if (res.status == "401") {
              this.$message.error(res.msg);
          }
          else {
              this.$message.error("服务器出错了！");
          }
        })
        .then(()=> this.handleQueryAll())
        
        this.dialogFormVisible=true
        this.status = 1
      },
  },
}
</script>

<style scoped>
.box-card {
  height: calc(100vh - 5px);
  position: relative;
}

.el-pagination {
  left: 50%;
  position: absolute;
  bottom: 3px;
  transform: translateX(-50%);
}
.el-dialog .el-input{
    width: 500px;
  }
</style>