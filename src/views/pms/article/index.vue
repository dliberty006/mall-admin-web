<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-form-item label="输入搜索：">
              <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="文章名称/关键字"></el-input>
            </el-form-item>
            <el-form-item label="上架状态：">
            <el-select v-model="listQuery.articleStatus" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
            <el-button
            style="margin-left:20px"
            @click="searchArticleList()"
            type="primary"
            size="small">
            查询结果
          </el-button>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        type="success"
        @click="addArticle()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="articleTable"
                :data="list"
                style="width: 100%"
                @sort-change='sortChange'
                :default-sort = "{prop: 'create_time', order: 'descending'}"
                v-loading="listLoading"
                border>
        
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">{{scope.row.articleTitle}}</template>
        </el-table-column>
        <el-table-column label="副标题" align="center">
          <template slot-scope="scope">{{scope.row.articleSubTitle}}</template>
        </el-table-column>
        <el-table-column label="作者" align="center">
          <template slot-scope="scope">{{scope.row.articleAuth}}</template>
        </el-table-column>
        
        <el-table-column prop="praise_num" sortable="custom" label="点赞"  align="center">
          <template slot-scope="scope">{{scope.row.praiseNum}}</template>
        </el-table-column>
        <el-table-column prop="browse_num" sortable="custom" label="浏览"  align="center">
          <template slot-scope="scope">{{scope.row.browseNum}}</template>
        </el-table-column>
        
        <el-table-column prop="create_time" sortable="custom" label="创建时间"  align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column label="修改时间" prop="update_time" sortable="custom"  align="center">
          <template slot-scope="scope">{{scope.row.updateTime}}</template>
        </el-table-column>
        <el-table-column label="状态"  align="center">
          <template slot-scope="scope">
            <value-write code="content_status" :groupkey="scope.row.articleStatus"></value-write>
          </template>
        </el-table-column>
        <el-table-column label="上下架"  align="center">
          <template slot-scope="scope">
            <el-button type="success" v-if="scope.row.articleStatus == 20" round @click="handleStatusChange(scope.$index, scope.row,30)">上架</el-button>
            <el-button type="warning" v-if="scope.row.articleStatus == 30" round @click="handleStatusChange(scope.$index, scope.row,20)">下架</el-button>
          </template>
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
  import {fetchList, updateStatus, deleteArticle} from '@/api/article'
  import ValueWrite from '@/components/SysValue/valueWrite'
  export default {
    name: 'articleList',
    components:{ValueWrite},
    data() {
      return {
        listQuery: {
          keyword: null,
          articleStatus:null,
          prop:null,
          order:null,
          pageNum: 1,
          pageSize: 10
        },
        list: null,
        total: null,
        listLoading: true,
        multipleSelection: [],
        options: [{
          value: null,
          label: '全部'
        },{
          value: 20,
          label: '下架'
        }, {
          value: 30,
          label: '上架'
        }],
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
        this.$router.push({path: '/pms/updateArticle', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该文章', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteArticle(row.id).then(response => {
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
      handleStatusChange(index, row,status) {
        let data = new URLSearchParams();
        data.append("ids", row.id);
        data.append("status", status);

        let confirmTitle = "确定上架文章"
        if (status == 20) {
          confirmTitle = "确定下架文章"
        }

        this.$confirm(confirmTitle, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateStatus(data).then(response => {
            this.$message({
              message: '成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
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
      searchArticleList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      addArticle() {
        this.$router.push({path: '/pms/addArticle'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


