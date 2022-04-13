import axios from 'axios';
import { API } from '../Constants';

const http = axios.create({
  //withCredentials: false,
  baseURL: `${'http://localhost:27629/api/'}`,  
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // 'Cache-Control': 'no-cache',
    // Pragma: 'no-cache',
    //  Expires: '0'
  },
});
http.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token.toString()}`;
    return Promise.resolve(config);
  },
  (error) => Promise.reject(error)
);



// Response interceptor for API calls
http.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const access_token =localStorage.getItem("refreshToken");      
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;   
   let dto= localStorage.getItem("role") ;
   dto= JSON.parse(dto);
   var request ={username:'', refreshToken:''}
   request.username=dto.username;
   request.refreshToken =access_token;
    user.post("Refresh",  request )
                .then(async (response) => {
                    if (response.status == 200) {
                        localStorage.setItem('accessToken', response.data.dati.accessToken);
                        localStorage.setItem('refreshToken',response.data.dati.refreshToken);
                        
                        return http(originalRequest);
                        
                    }
                }).catch((error) => {
                  localStorage.setItem('accessToken', '');
                  localStorage.setItem('refreshToken','');
                  window.location.href = "/";
                });   
   
    
  }
  return Promise.reject(error);
});
  

  export const api = {
    get: (url, id) => http.get(url + id),
    getAll: (url) => http.get(url),
    post: (url, o) => http.post(url, o),
    put: (url, o, id) => http.put(`${url}${id || ''}`, o),
    delete: (url, id) => http.delete(url + id),
    deleteData: (url, data) => http.delete(url, { data }),
    getWithParam: (url, o) => http.get(url, o),
    //upload: (url, data) => httpMultiPart.post(url, data),
    getBlob: (url) => http.get(url, { responseType: 'blob' }),
  };

  export const user = {
    get: (url, id) => http.get(API.USER + url + id),
    getAll: (url) => http.get(API.USER + url),
    getMe: () => http.get(API.USER),
    post: (url,o) => http.post(`${API.USER + url}`,o),
    put: (url, o, id) => http.put(url +API.USER + url + id, o),
    delete: (url, id) => http.delete(API.USER + url + id),
    getWithParam: (url, o) => http.get(API.USER + url, o),
  };
  export const medico = {
    get: (url, id) => http.get(API.MEDICO + url + id),
    getAll: (url) => http.get(API.MEDICO + url),
    getMe: () => http.get(API.MEDICO),
    post: (url, o) => http.post(`${API.MEDICO + url}`, o),
    put: (url, o, id) => http.put(API.MEDICO + url + id, o),
    delete: (url, id) => http.delete(API.MEDICO + url + id),
    getWithParam: (url, o) => http.get(API.MEDICO + url, o),
  };

  export const patient = {
    get: (url, id) => http.get(`${API.PATIENT + url}` + id),
    getAll: (url) => http.get(API.PATIENT + url),
    getMe: () => http.get(API.PATIENT),
    post: (url, o) => http.post(`${API.PATIENT + url}` , o),
    put: (url, o, id) => http.put(API.PATIENT + url + id, o),
    delete: (url, id) => http.delete(API.PATIENT + url + id),
    getWithParam: (url, o) => http.get(API.PATIENT + url, o),
  };