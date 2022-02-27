/*
    uid:215431,
    name:'Cristian
*/

import { types } from "../types/types";

const initialState={
    checking:true,
};

export const authReducer=(state=initialState,action)=>{
    switch (action.type) {
        case types.login:
            return{
                ...state,
                ...action.payload
            }
        case types.checkingFinish:

            return {
                ...state,
                checking:false
            }
        case types.logout:
            return {}
    
        default:
            return state;
    }
}