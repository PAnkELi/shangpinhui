// 利用uuid生成游客的唯一标识符
import {v4 as uuidv4} from 'uuid'
let userId
// 封装一个函数使得同一个游客uuid只生成一次
export const getUUID = () => {
    userId = localStorage.getItem('USERTEMPID')
    if (!userId) {
        userId = uuidv4()
        localStorage.setItem('USERTEMPID', userId)
    }
    return userId
}