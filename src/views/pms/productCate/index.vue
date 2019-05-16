<template>
  <div class="app-container">
    <el-container class="my-el-container">
      <el-header class="my-el-header" height="50px">
        <i class="el-icon-tickets"></i>
        <span>数据列表</span>
      </el-header>
      <el-container class="my-el-container-content">
        <el-aside width="200px" style="border-right: 1px solid #d4dde2;" class="tree">
          <div class="refalsh" @click="refalshTree">
            <i class="el-icon-refresh"></i>
            刷新
          </div>
          <el-tree
            :props="props"
            :load="loadNode"
            lazy
            :accordion="false"
            highlight-current
            @check-change="handleCheckChange"
            @node-expand="handleExpand"
            @node-collapse="handleCollapse"
            @node-click="handleClick"
            >
            <span class="custom-tree-node" slot-scope="{node,data}">
              <i v-if="data.isChildren == '0'" class="el-icon-document icon-color"></i>
              <i v-else class="el-icon-plus icon-border"></i>
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </el-aside>
        <el-main class="my-el-main">
          <div>
            <el-button style="margin-left: 20px;" size="small" type="success" icon="el-icon-plus" @click="handleAddProductCate">添加</el-button>
            <el-table ref="productCateTable"
                      style="width: 100%"
                      :data="list"
                      v-loading="listLoading">
                <el-table-column label="编号" width="100" align="center">
                  <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="分类名称" align="center">
                  <template slot-scope="scope">{{scope.row.categoryName}}</template>
                </el-table-column>
                <el-table-column label="分类编码" width="100" align="center">
                  <template slot-scope="scope">{{scope.row.categoryCode}}</template>
                </el-table-column>
                <el-table-column label="排序" width="100" align="center">
                  <template slot-scope="scope">{{scope.row.sort}}</template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleUpdate(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除
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
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
  import {fetchNode,fetchList,deleteProductCate,updateShowStatus,updateNavStatus} from '@/api/productCate'

  export default {
    name: "productCateList",
    data() {
      return {
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          pageNum: 1,
          pageSize: 5
        },
        props: {
          label: 'categoryName',
          children: 'id'
        },
        parentId: -1,
        addParentId:-1
      }
    },
    created() {
      var param = {};
      param.parentId = this.parentId;
      this.getList(param);
    },
    watch: {

    },
    methods: {
      loadNode(node, resolve) {
        if (node.data) {
          this.parentId = node.data.id
        } else {
          this.parentId = -1
        }
        if((node.data && node.data.isChildren == '1') || !node.data){
          fetchNode(this.parentId).then(response => {
            return resolve(response.categoryList);
          });
        }else{
          return resolve([]);
        }
      },
      getList(param) {
        this.listLoading = true;
        fetchList(param.parentId, this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.rows;
          this.total = response.total;
        });
      },
      handleClick(data , node , cus){
        var param = {};
        param.parentId = data.id;
        this.listQuery.pageNum=1;
        this.getList(param);
        this.addParentId = data.id;
      },
      handleCheckChange(){

      },
      handleExpand(data , node , cus){
        if(data.isChildren=='1'){
          cus.$el.childNodes[0].children[1].children[0].classList = ["el-icon-minus icon-border"];
        }
      },
      handleCollapse(data , node , cus){
        if(data.isChildren=='1'){
          cus.$el.childNodes[0].children[1].children[0].classList = ["el-icon-plus icon-border"];
        }
      },
      handleUpdate(index, row) {
        this.$router.push({path:'/pms/updateProductCate',query:{id:row.id}});
      },
      handleDelete(index, row) {
        if(row.isChildren == '1'){
          this.$alert("此分类有下级分类，不可删除，请先删除下级分类","提示");
        }else{
          this.$confirm('是否要删除该分类', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteProductCate(row.id).then(response => {
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: 1000
              });
              this.refalshTree();
            });
          });
        }
      },
      refalshTree(){
        window.location.reload();
      },
      handleAddProductCate() {
        this.$router.push({path:'/pms/addProductCate',query:{parentId:this.addParentId}});
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
      handleNavStatusChange(index, row) {
        let data = new URLSearchParams();
        let ids=[];
        ids.push(row.id)
        data.append('ids',ids);
        data.append('navStatus',row.navStatus);
        updateNavStatus(data).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      handleShowStatusChange(index, row) {
        let data = new URLSearchParams();
        let ids=[];
        ids.push(row.id)
        data.append('ids',ids);
        data.append('showStatus',row.showStatus);
        updateShowStatus(data).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      handleShowNextLevel(index, row) {
        this.$router.push({path: '/pms/productCate', query: {parentId: row.id}})
      },
      handleTransferProduct(index, row) {
        console.log('handleAddProductCate');
      }

    }
  }
</script>

<style scoped>
.refalsh{
  height: 50px;
    line-height: 50px;
    padding: 0 24px;
    color: #8a8e98;
    cursor: pointer;
    user-select: none;
}
.my-el-container{
    background: #fff;
    border: 1px solid #d4dde2;
    margin-bottom: 24px;
}
.my-el-container-content{
  min-height: 500px;
}
.my-el-header{
  height: 50px;
  line-height: 50px;
  background: #eceff1;
  padding: 0 24px;
  font-size: 14px;
  color: #565656;
  overflow: hidden;
  border-bottom: 1px solid #d4dde2;
}
.my-el-main{
  padding: 20px 0;
}
.icon-border{
  border: 1px solid #dddddd;
  transform: scale(0.7);
  padding: 2px;
}
.icon-color{
  color: #dddddd;
}
</style>
