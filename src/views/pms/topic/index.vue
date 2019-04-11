<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchTopicList()"
            type="primary"
            size="small">
            查询结果
          </el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-form-item label="输入搜索：">
              <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="标签名称/关键字"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addTopic()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="topicTable"
                :data="list"
                style="width: 100%"
                @sort-change='sortChange'
                :default-sort = "{prop: 'create_time', order: 'descending'}"
                v-loading="listLoading"
                border>
        
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="标签名称" align="center">
          <template slot-scope="scope">{{scope.row.topicName}}</template>
        </el-table-column>
        <el-table-column label="标签描述" align="center">
          <template slot-scope="scope">{{scope.row.topicDesc}}</template>
        </el-table-column>
        <el-table-column label="是否显示"  align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" sortable="custom" label="创建时间"  align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column label="修改时间" prop="update_time" sortable="custom"  align="center">
          <template slot-scope="scope">{{scope.row.updateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini" type="primary" icon="el-icon-edit" circle
              @click="handleUpdate(scope.$index, scope.row)">
            </el-button>
            <el-button
              size="mini"
             type="danger" icon="el-icon-delete" circle
              @click="handleDelete(scope.$index, scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList, updateShowStatus, deleteTopic} from '@/api/topic'

  export default {
    name: 'topicList',
    data() {
      return {
        listQuery: {
          keyword: null,
          prop:null,
          order:null,
          pageNum: 1,
          pageSize: 10
        },
        list: null,
        total: null,
        listLoading: true,
        multipleSelection: []
      }
    },
    created() {
      
      
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.rows;
          this.total = response.total;
          this.totalPage = response.pageInfo.totalPage;
          this.pageSize = response.pageInfo.pageSize;
        });
      },
     
      handleUpdate(index, row) {
        this.$router.push({path: '/pms/updateTopic', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该标签', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTopic(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
      sortChange: function(column) {
          if (column.prop) {
            this.listQuery.prop = column.prop
            this.listQuery.order = column.order
          } else {
             this.listQuery.prop = null
            this.listQuery.order = null
          }
         this.getList();
      },
      handleShowStatusChange(index, row) {
        let data = new URLSearchParams();
        ;
        data.append("ids", row.id);
        data.append("showStatus", row.showStatus);
        updateShowStatus(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.showStatus === 0) {
            row.showStatus = 1;
          } else {
            row.showStatus = 0;
          }
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      searchTopicList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      addTopic() {
        this.$router.push({path: '/pms/addTopic'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


