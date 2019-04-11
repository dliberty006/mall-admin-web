import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/icon/list',
    method:'get',
    params:params
  })
}
export function createIcon(data) {
  return request({
    url:'/icon/create',
    method:'post',
    data:data
  })
}
export function updateStatus(data) {
  return request({
    url:'/icon/update/status',
    method:'post',
    data:data
  })
}

export function deleteIcon(id) {
  return request({
    url:'/icon/delete/'+id,
    method:'get',
  })
}

export function getIcon(id) {
  return request({
    url:'/icon/'+id,
    method:'get',
  })
}

export function updateIcon(id,data) {
  return request({
    url:'/icon/update/'+id,
    method:'post',
    data:data
  })
}

