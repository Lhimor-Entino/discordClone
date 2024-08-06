import { Server, User } from '@/types'
import React from 'react'
import MobileToggle from '../MobileToggle';
import { HashIcon } from 'lucide-react';
import UserAvatar from '../UserAvatar';
import { Badge } from '../ui/badge';
import ChatVideoButton from './ChatVideoButton';

interface Props {
    server: Server;
    name: string;
    type: "Channel"|"Conversation";
    user?: User
}

const ChatHeader = (props: Props) => {
    const {
        server,
        name,
        type,
        user,
    } = props
  return (
    <div className=' text-base font-semibold px-2.5 flex items-center h-12 border-b-2 border-secondary z-0'>
        <MobileToggle /> 
        {type === "Channel" && <HashIcon className='h-5 w-5  text-slate-500  dark:text-slate-400 mr-1.5' />}
        {type === "Conversation" && <UserAvatar user={user!} className='h-5 w-5  text-slate-500  dark:text-slate-400 mr-1.5' />}
        <p className='font-semibold  text-base text-black  dark:text-white'>{name}</p>
        <div className='ml-auto  flex  items-center'>
            {type ==="Conversation" && <ChatVideoButton />}
        </div>
        <Badge  variant={"outline"}  className='bg-emerald-600 text-white border-none'>Connected</Badge>
    </div>
  )
}

export default ChatHeader