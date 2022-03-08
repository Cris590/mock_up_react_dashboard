
const baseUrl=process.env.REACT_APP_BACKEND_HOST

const fetchSinToken = (endpoint,data,method='GET') => {

    const url=`${baseUrl}/${endpoint}`;
    if(method==='GET'){
        return fetch(url);
    }else{
        return fetch(url,{
            method,
            headers: { 
                'Content-Type': 'application/json',
            }, 
            body:JSON.stringify(data)
        });
    }
}

const fetchConToken = (endpoint,data,method='GET') => {
    const url=`${baseUrl}/${endpoint}`;
    const token =localStorage.getItem('token');
    if(method==='GET'){
        return fetch(url,{
            method,
            headers: { 
                'Content-Type': 'application/json',
                'x-token':token
            }, 
        });
    }else{  
        return fetch(url,{
            method,
            headers: { 
                'Content-Type': 'application/json',
                'x-token':token
            }, 
            body:JSON.stringify(data)
        });
    }
}

const fetchMultipartToken = (endpoint,data,method='POST') => {
    const formData=new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    });
    
    const url=`${baseUrl}/${endpoint}`;
    const token =localStorage.getItem('token');

    return fetch(url,{
        method,
        body: formData,
        redirect: 'follow',
        headers: { 
            'x-token':token
        }, 
    })
}

export {
    fetchSinToken,
    fetchConToken,
    fetchMultipartToken
}