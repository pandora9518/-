//这里封装获取和本地存储token的办法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
//删除token的方法
export const DELETE_TOKEN = () => {
  return localStorage.removeItem('TOKEN')
}
