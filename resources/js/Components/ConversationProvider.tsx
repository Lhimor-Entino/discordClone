import { createContext, useContext, useEffect, useState } from "react";
import {User} from "@/types"
import { Channel } from "laravel-echo";

const  ConversationContext = createContext({
    onlineUsers: []  as User[],
    echoInstance: undefined  as undefined|Channel
})

export const useLaravelEcho = () => useContext(ConversationContext);

const ConversationProvider  = ({children} : {children: React.ReactNode}) =>{
    const [onlineUsers,setOnlineusers] =  useState<User[]>([]);
    const [echoInstance,setEchoInstance] = useState<Channel | undefined>(undefined);

    useEffect(()=>{
            const echo = window.Echo.join("global_channel").here((users:User[])=>{
             setOnlineusers(users)
            }).error(()=> setEchoInstance(undefined));
            setEchoInstance(echo)
    },[])

    return (
        <ConversationContext.Provider value={{onlineUsers,echoInstance}}>
            {children}
        </ConversationContext.Provider>
    )
}

export default ConversationProvider