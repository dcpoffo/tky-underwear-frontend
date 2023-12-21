import axios from 'axios'

export const useAPI = () => {

  const URL_BASE = "http://192.168.1.8:8080";  

  const get = (url: string) => {
    return axios.get(URL_BASE + url)
  }

  const post = (url: string, data: any) => {
    return axios.post(URL_BASE + url, data)
  }

  const put = (url: string, data: any) => {
      return axios.put(URL_BASE + url, data)    
  }

  const _delete = (url: string) => { 
      return axios.delete(URL_BASE + url)
  }

  return { get, post, put, _delete}

}