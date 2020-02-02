import axios from 'axios'
import { Loading } from 'element-ui'

const post = async (url, data) => {
    const loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    return axios({
        method: 'POST',
        url: '/api/admin' + url,
        headers: {
            'authtoken': '31c535a1d1a0826b39057dfd9a2dbdb8',
            'Content-Type': 'application/json'
        },
        data: data
    }).then(res => {
        loading.close()
        return res
    })
}

const get = async (url, params) => {
    const loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    return axios({
        method: 'GET',
        url: '/api/admin' + url,
        headers: {
            'authtoken': '31c535a1d1a0826b39057dfd9a2dbdb8',
            'Content-Type': 'application/json'
        },
        params: params
    }).then(res => {
        loading.close()
        return res
    })
}


export default {
    post,
    get
}
