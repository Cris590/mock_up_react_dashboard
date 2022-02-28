import { fetchSinToken ,fetchConToken} from "../helpers/fetch";
import { types } from "../types/types"
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'



export const startLoginUserPassword=(user,password) => {
    return async (dispatch)=>{

        const endpoint='app/auth/login';
        const resp= await fetchSinToken(endpoint,{identificacion:user,password},'POST');

        const body=await resp.json()
        if(body.ok){
            const {activo,...usuario}=body.usuario;      
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime())
            dispatch(login(usuario));
        }else{
            Swal.fire('Error',body.msg,'error')
        }
        
    }
}


export const startChecking = ()=>{
    return async (dispatch)=>{

        const endpoint='app/auth/renew';
        const resp= await fetchConToken(endpoint);
        const body=await resp.json()
        if(body.ok){
            const {activo,...usuario}=body.usuario;      
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime())
            dispatch(login(usuario));
        }else{
            dispatch(checkingFinish());
        }
        
    }

}

const checkingFinish=()=>({type:types.checkingFinish}) 


const login=(usuario)=>({
    type:types.login,
    payload:{
        checking:false,
        ...usuario
    }
})

export const logout=(usuario)=>
{
    localStorage.removeItem('token');
    localStorage.removeItem('token-init-date')
    return {
        type:types.logout
    }
}
     


  