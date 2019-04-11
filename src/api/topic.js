import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/topic/list',
    method:'get',
    params:params
  })
}
export function createTopic(data) {
  return request({
    url:'/topic/create',
    method:'post',
    data:data
  })
}
export function updateShowStatus(data) {
  return request({
    url:'/topic/update/showStatus',
    method:'post',
    data:data
  })
}

export function deleteTopic(id) {
  return request({
    url:'/topic/delete/'+id,
    method:'get',
  })
}

export function getTopic(id) {
  return request({
    url:'/topic/'+id,
    method:'get',
  })
}

export function updateTopic(id,data) {
  return request({
    url:'/topic/update/'+id,
    method:'post',
    data:data
  })
}

