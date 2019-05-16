import request from '@/utils/request'
export function fetchNode(parentId) {
  return request({
    url:'/category/list',
    method:'get',
    params: {'parentId':parentId}
  })
}
export function fetchList(parentId,params) {
  return request({
    url:'/category/productCategory/list/'+parentId,
    method:'get',
    params:params
  })
}

export function fetchAll() {
  return request({
    url:'/category/getAll',
    method:'get'
  })
}

export function deleteProductCate(id) {
  return request({
    url:'/category/delete/'+id,
    method:'get'
  })
}

export function createProductCate(data) {
  return request({
    url:'/category/create',
    method:'post',
    data:data
  })
}

export function updateProductCate(id,data) {
  return request({
    url:'/category//update/'+id,
    method:'post',
    data:data
  })
}

export function getProductCate(id) {
  return request({
    url:'/category/select/'+id,
    method:'get',
  })
}

export function updateShowStatus(data) {
  return request({
    url:'/productCategory/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateNavStatus(data) {
  return request({
    url:'/productCategory/update/navStatus',
    method:'post',
    data:data
  })
}

export function fetchListWithChildren() {
  return request({
    url:'/productCategory/list/withChildren',
    method:'get'
  })
}
