import axios from "axios";

export const loginUser = (email,password)=> async (dispatch)=>{
    try {
        dispatch({
            type:"LoginRequest"
        });

        const {data} = await axios.post("http://localhost:8777/api/user/login",{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        });

        dispatch({
            type:"LoginSuccess",
            payload: data.user,
        });

    }catch(error){
        dispatch({
            type:"LoginFailure",
            payload:error.response.data,
        });

    }
};


export const loadUser = ()=> async (dispatch)=>{
    try {
        dispatch({
            type:"LoadUserRequest"
        });

        const {data} = await axios.get("http://localhost:8777/api/user/me");

        dispatch({
            type:"LoadUserSuccess",
            payload: data.user,
        });

    }catch(error){
        dispatch({
            type:"LoadUserFailure",
            payload: error.response.data,
        });

    }
}