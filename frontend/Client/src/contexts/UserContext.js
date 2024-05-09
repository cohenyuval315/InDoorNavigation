import React,{useContext, useEffect, useState} from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {  
    const [loadingUser,setLoadingUser] = useState(true);
    const [user,setUser] = useState(null);
    const [accessToken,setAccessToken] = useState(null);

    const isAdmin = async () => {
        if(!user || !accessToken) return false;
    }
    const getUserDataByAccessToken = async (accessToken) => {
        if (accessToken !== null){
            return {

            }
        }
        return null;
    }

    const readAccessToken =  async ()=> {
        setLoadingUser(true);
        const accessToken = ""; // async storage
        if (accessToken){
            const response = await getUserDataByAccessToken(accessToken);
            if (response){
                setUser(response);
                setAccessToken(accessToken)
            }else{
                setUser(null);
                setAccessToken(null);
            }
        }
        setLoadingUser(false);
    }

    const writeAccessToken = async () => {

    }

    const loginUser = async () => {
        const ok = true;
        if (ok){
            const accessToken = ok
            setLoadingUser(true);
            await writeAccessToken(accessToken)
            await readAccessToken(accessToken)
        }else{
            return null;
        }
        
    }

    const signUpUser = async () => {
        
    }

    const deleteAccessToken = async () => {

    }

    const logout = async () => {
        setUser(null);
        setAccessToken(null);
        await deleteAccessToken();
    }
    


    useEffect(()=>{
        readAccessToken();
    },[])

  
    return (
      <UserContext.Provider
      value={{
        user,
        loadingUser,
        logout,
        isAdmin,
        loginUser,
        signUpUser
      }}>
        { children }
      </UserContext.Provider>
    )
  
}

export const useUser = () => {
    return useContext(UserContext);
};
  
