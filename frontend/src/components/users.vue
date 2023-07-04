<template>
  <!-- 书籍列表卡片 -->
  <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户名" label-width="70px">
            <el-input clearable v-model="formInline.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="所属角色" label-width="70px">
            <el-input clearable v-model="formInline.role_name" placeholder="请输入角色名"></el-input>
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
          label="用户号"
          width="200">
        <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.user_id }}</span>
        </template>
        </el-table-column>

          <el-table-column
          label="用户名"
          width="200">
        <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
        </el-table-column>

        <el-table-column
          label="密码"
          width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.password }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="所属角色"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.role_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="员工号"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.employee_number }}</span>
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
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible" >
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属角色" :label-width="formLabelWidth">
            <el-input v-model="form.role_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工号" :label-width="formLabelWidth">
            <el-input v-model="form.employee_number" autocomplete="off"></el-input>
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
        :total="bookNumber">
      </el-pagination>
      
    </el-card>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'users',
    data() {
        return {
            formInline: {
              username: "",
              role_name: "",
            },
            value: "",
            //列表
            tableData: [{
                    user_id: "xasdw12312",
                    "username": "活着",
                    "password": "1111111111",
                    "role_name": "余华",
                    "employee_number": "清华大学出版社",
                }],
            currentPage: 1,
            pageSize: 10,
            bookNumber: 0,
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
            url: `/api/books`,
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
          url: `/api/books/${this.tableData[this.index].user_id}`,
          method: 'put',
          data: this.tableData[this.index]
        })
        .then(()=> this.handleQueryAll())
      },

      handleDelete(index, row) {
          this.$confirm('此操作将永久删除该书籍信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.tableData = this.tableData.filter(item => item.user_id  !== row.user_id)
        })  
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      
      handleReset() {
          this.formInline.username = "";
          this.formInline.role_name = "";
      },
      handleQueryAll() {
        axios({
          url: `/api/books`,
          method: 'get',
        }).then(res => {
          this.tableData = res.data
          this.bookNumber = res.data.length
        })
      },
      handleQuery() {
        let data = this.formInline
        axios({
          url: `/api/books`,
          method: 'get',
          data: {
            type: data.type
          }
        }).then(res => {
          this.tableData = res.data
        })
      },
      handleAdd() {
        axios.post(`/api/books`, this.tableData)
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