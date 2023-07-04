<template>
  <!-- 书籍列表卡片 -->
  <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="出诊日期" label-width="70px">
            <el-input clearable v-model="formInline.visit_date" placeholder="请输入日期"></el-input>
          </el-form-item>
          <el-form-item label="医生姓名" label-width="70px">
            <el-input clearable v-model="formInline.doctor_name" placeholder="请输入姓名"></el-input>
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
          label="出诊单号"
          width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.visit_id }}</span>
          </template>
        </el-table-column>

          <el-table-column
          label="出诊日期"
          width="200">
        <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.visit_date }}</span>
        </template>
        </el-table-column>

        <el-table-column
          label="出诊时长"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.visit_hour }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="医生姓名"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.doctor_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="所属科室"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.department_name }}</span>
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
      <el-dialog title="出诊信息" :visible.sync="dialogFormVisible" >
        <el-form :model="form">
          <el-form-item label="出诊单号" :label-width="formLabelWidth">
            <el-input v-model="form.visit_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出诊日期" :label-width="formLabelWidth">
            <el-input v-model="form.visit_date" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出诊时长" :label-width="formLabelWidth">
            <el-input v-model="form.visit_hour" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="医生姓名" :label-width="formLabelWidth">
            <el-input v-model="form.doctor_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属科室" :label-width="formLabelWidth">
            <el-input v-model="form.department_name" autocomplete="off"></el-input>
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
        :total="visit_id">
      </el-pagination>
      
    </el-card>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'appointmentRecord',
    data() {
        return {
            formInline: {
              visit_id: "",
              doctor_name:"",
            },
            value: "",
            //列表
            tableData: [{
              visit_id: 987654,
                    "visit_date": "2001.10.10",
                    "visit_hour": 1 + "小时",
                    "doctor_name": "余华",
                    "department_name": "保卫科"
                }],
            currentPage: 1,
            pageSize: 10,
            visit_id: 0,
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
            url: `/api/visits`,
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
          url: `/api/visits:id}`,
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
          axios.delete(`/api/visits/:id`)
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              // 从表格数据中移除已删除的数据
              this.tableData = this.tableData.filter(item => item.visit_id !== row.visit_id);
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
          this.formInline.visit_id = "";
          this.formInline.doctor_name = "";
      },
      handleQueryAll() {
        axios({
          url: `/api/visits`,
          method: 'get',
        }).then(res => {
          this.tableData = res.data
          this.visit_id = res.data.length
        })
      },
      handleQuery() {
        let data = this.formInline
        axios({
          url: `/api/visits`,
          method: 'get',
          data: {
            type: data.type
          }
        }).then(res => {
          this.tableData = res.data
        })
      },
      handleAdd() {
        axios.post(`/api/visits`, this.tableData)
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