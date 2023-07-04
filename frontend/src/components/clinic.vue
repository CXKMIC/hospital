<template>
  <!-- 书籍列表卡片 -->
  <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="科室名称" label-width="70px">
            <el-input clearable v-model="formInline.office_name" placeholder="请输入科室名"></el-input>
          </el-form-item>
          <el-form-item label="诊室名称" label-width="70px">
            <el-input clearable v-model="formInline.department_name" placeholder="请输入科室名"></el-input>
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
          label="诊室号"
          width="200">
        <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.office_id }}</span>
        </template>
        </el-table-column>

          <el-table-column
          label="诊室名称"
          width="300">
        <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.office_name }}</span>
        </template>
        </el-table-column>

        <el-table-column
          label="诊室描述"
          width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.office_description }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="所属科室"
          width="300">
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
      <el-dialog title="诊室信息" :visible.sync="dialogFormVisible" >
        <el-form :model="form">
          <el-form-item label="诊室号" :label-width="formLabelWidth">
            <el-input v-model="form.office_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="诊室名称" :label-width="formLabelWidth">
            <el-input v-model="form.office_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="诊室描述" :label-width="formLabelWidth">
            <el-input v-model="form.office_description" autocomplete="off"></el-input>
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
        :total="office_id">
      </el-pagination>
      
    </el-card>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'clinic',
    data() {
        return {
            formInline: {
              office_id: "",
              office_name: "",
              office_description:"",
              department_name: "",
            },
            value: "",
            //列表
            tableData: [{
                    office_id: "xasdw12312",
                    "office_name": "活着",
                    "office_description": "余华",
                    "department_name": "清华大学出版社",
                }],
            currentPage: 1,
            pageSize: 10,
            office_id: 0,
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

      async getOffices() {
        try {
          const response = await axios.get('/api/offices');
          this.officeList = response.data;
        } catch (error) {
          console.error('获取诊室列表失败：', error);
        }
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
          url: `/api/offices/:id}`,
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
          axios.delete(`/api/offices/:id`)
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              // 从表格数据中移除已删除的数据
              this.tableData = this.tableData.filter(item => item.office_id !== row.office_id);
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
          this.formInline.department_name = "";
          this.formInline.office_name = "";
      },
      handleQueryAll() {
        axios({
          url: `/api/offices`,
          method: 'get',
        }).then(res => {
          this.tableData = res.data
          this.office_id = res.data.length
        })
      },
      handleQuery() {
        let data = this.formInline
        axios({
          url: `/api/offices`,
          method: 'get',
          data: {
            type: data.type
          }
        }).then(res => {
          this.tableData = res.data
        })
      },
      handleAdd() {
        axios.post(`/api/offices`, this.tableData)
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