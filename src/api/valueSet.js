import request from '@/utils/request'
export function valueSetWrite(params) {
  return request({
    url:'/sys/value/write',
    method:'get',
    params:params
  })
}

