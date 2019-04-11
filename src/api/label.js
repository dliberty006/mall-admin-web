import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/label/list',
    method:'get',
    params:params
  })
}
export function createLabel(data) {
  return request({
    url:'/label/create',
    method:'post',
    data:data
  })
}
export function updateShowStatus(data) {
  return request({
    url:'/label/update/showStatus',
    method:'post',
    data:data
  })
}

export function deleteLabel(id) {
  return request({
    url:'/label/delete/'+id,
    method:'get',
  })
}

export function getLabel(id) {
  return request({
    url:'/label/'+id,
    method:'get',
  })
}

export function updateLabel(id,data) {
  return request({
    url:'/label/update/'+id,
    method:'post',
    data:data
  })
}

export function getLabelList() {
  return request({
    url:'/label/listAll',
    method:'get',
  })
}

