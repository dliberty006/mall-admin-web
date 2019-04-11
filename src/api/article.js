import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/article/list',
    method:'get',
    params:params
  })
}
export function createArticle(data) {
  return request({
    url:'/article/create',
    method:'post',
    data:data
  })
}
export function updateStatus(data) {
  return request({
    url:'/article/update/status',
    method:'post',
    data:data
  })
}

export function deleteArticle(id) {
  return request({
    url:'/article/delete/'+id,
    method:'get',
  })
}

export function getArticle(id) {
  return request({
    url:'/article/'+id,
    method:'get',
  })
}

export function updateArticle(id,data) {
  return request({
    url:'/article/update/'+id,
    method:'post',
    data:data
  })
}

