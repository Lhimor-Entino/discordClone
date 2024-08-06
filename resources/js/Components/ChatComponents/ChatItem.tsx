import { Message, PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react';
import React, { FormEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import UserAvatar from '../UserAvatar';
import { cn } from '@/lib/utils';
import ActionTooltip from '../ActionTooltip';
import {format} from  "date-fns"
import {

    EditIcon,
    ShieldAlertIcon,
    ShieldCheckIcon,
    TrashIcon,
 
} from "lucide-react";
import { ROLE_ICON_MAP } from '@/Layouts/ServerLayoutComponents/ServerSidebar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { useModal } from '../Hooks/useModal';
interface Props {
    message: Message;
    type : "Channel"|"Conversation"
}
// const ROLE_ICON_MAP = {
//     "GUEST": null,
//     "MODERATOR": <ShieldCheckIcon className="mr-1.5 h-4 w-4 text-indigo-500" />,
//     "ADMIN": <ShieldAlertIcon className="mr-1.5 h-4 w-4 text-indigo-500" />,
// };

const DATE_FORMAT = "d MMMM yyyy HH:mm"
const ChatItem = (props: Props) => {
    const {message,type} = props

    const {current_channel,current_server,auth,current_conversation } = usePage<PageProps>().props
    const [newContent,setNewContent] = useState<string>(message.content);
    const [loading,setLoading] = useState(false)
    const [editing,setEditing] = useState(false)
    const input = useRef<HTMLInputElement>(null)
    const {onOpen} = useModal()
    const {user: sender} = message;
    const {user} = auth
    const role = current_server.users.find((user) => user.id === sender.id)?.pivot
    .member_role! || "GUEST";

    const fileType=message.file?.split(".").pop();


    const canDeleteMsg = useMemo( () => 
        !message.deleted_at && ((type==="Channel" &&( role ==="ADMIN" || role==="MODERATOR"))) || user.id ===message.user_id,[message,role]) 

    const canEditMsg = useMemo( ()=>!message.deleted_at &&(user.id===message.user_id) &&  !message.file,[message,role])
    const fileImage = fileType==="pdf"?route("welcome")+"/uploads/pdf/pdf.png":message.file;
 

    useEffect(() =>{
            if(input.current) input.current.focus();

            const handleKeydown = (e: KeyboardEvent) => {
                if(e.key ==="Escape" || e.code ==='Escape'){
                    setEditing(false)
                }
            }

            window.addEventListener("keydown",handleKeydown);
            return () => window.removeEventListener("keydown",handleKeydown);
    },[])

    const onInitiate = () => {
        if(message.user_id === user.id){
            return null;
        }
        router.post(route("conversation.initiate"),{
            user_id:sender.id
        })
    }

    const onDelete = () => {
        if(!current_channel&&type=="Channel"){
            return;
        }

        if(!current_conversation&&type==="Conversation"){
            return;
        }

        const  href  = type==="Channel" ? route("message.destroy",{message_id:message.id}) : route("conversation.destroy",{direct_message_id:message.id})
        onOpen("DeleteMessage",{
            href
        })
    
    }

    const onUpdate:FormEventHandler<HTMLFormElement> = e  =>{

        e.preventDefault();
        if(!current_channel&&type=="Channel"){
            return;
        }

        if(!current_conversation&&type==="Conversation"){
            return;
        }

        const  href  = type==="Channel" ? route("message.update") : route("conversation.update")

        axios.post(href,{
            content:newContent,
            message_id:message.id
        }).then(() => setEditing(false))
        .catch(() => toast.error("Failed to update  message. Please try again"))
        .finally(() => setLoading(false))
        setLoading(true)
    }
  return (
    <div className='relative  group flex items-center hover:bg-slate-300 dark:hover:bg-slate-900 p-3.5 transition duration-300 w-full'>

        <div className='group flex gap-x-1.5  items-start w-full'>

            {/* TODO INITIATE CONVERSATION */}
        <div onClick={onInitiate} className='cursor-pointer hover:drop-shadow-md  transition'>
            <UserAvatar user={sender} />
        </div>

        <div className=' flex  flex-col w-full'>
            <div className=' flex items-center gap-x-1.5'>
                <div className=' flex items-center'>
                        {/* TODO INITIATE CONVERSATION */}
                        <p onClick={onInitiate} className={cn('font-semibold text-sm  transition ', message.user_id!==user.id && 'cursor-pointer hover:underline')}>  
                            {sender.name}

                        </p>

                    <ActionTooltip label={role||""}>
                        <p className='ml-2'>{ROLE_ICON_MAP[role]}</p>
                    </ActionTooltip>
                </div>

                <span className='text-xs  text-slate-500 dark:text-slate-400'>
                {format(new Date(message.created_at),DATE_FORMAT )}
                </span>

            </div>

            {message.file && !message.deleted_at && (
                <a href={message.file} target='_blank' rel='noopener noreferrer' 
                className={cn('relative aspect-square rounded-md mt-1.5 overflow-hidden border flex  items-center bg-secondary', fileType==='pdf'? 'h-10 w-10' : 'h-48 w-48')}>
                    <img src={fileImage} alt='file' className='object-cover'/>

                </a>
            )}

            <p className={cn('text-xs',fileType === "pdf"  &&  !message.deleted_at? 'block': 'hidden')}>
                PDF FILE
            </p>

            {!editing && (
                <p className={cn('text-sm text-slate-600 dark:text-slate-300',
                    message.deleted_at && 'italic text-slate-500 dark:text-slate-400 text-xs mt-1'
                 )}>
                    {!message.deleted_at?message.content : "Message Deleted"}

                 {((message.created_at!==message.updated_at) && !message.deleted_at) &&(
                        <span className='text-[0.625rem] mx-1.5  text-slate-500 dark:text-slate-400'>
                                (edited)
                        </span>
                    )}
           
                </p>
            )}

                {(!message.file && editing) &&(
                        <> 
                        <form onSubmit={onUpdate} className='flex items-center w-full gap-x-1.5 pt-1.5'>
                                <div className='flex-1'>
                                    <Input autoFocus disabled={loading} ref={input} value={newContent}  onChange={({target}) =>setNewContent(target.value)} 
                                    className='p-1.5 bg-neutral-200/90 dark:bg-neutral-700/75 border-none !border-0 focus-visible!ring-0
                                    focus-visible:!ring-offset-0 text-neutral-600 dark:text-neutral-200'/>

                                </div>

                                <Button size="sm" disabled={loading}>
                                       Save
                                </Button>
                        </form>
                        </>
                    )
                 }
        </div>

        </div>
        {canDeleteMsg && (
            <div className='hidden group-hover:flex items-center gap-x-1.5  absolute p-1 -top-2 right-5 bg-white dark:bg-slate-800 border rounded-sm' >
                    {
                            canEditMsg  &&(
                                <ActionTooltip label='Edit'>
                                    <EditIcon onClick={() => setEditing(true)} className='cursor-pointer ml-auto w-4 h-4 text-slate-500
                                    hover:text-slate-600 dark:hover:text-slate-300  transition duration-300'/>
                                </ActionTooltip>
                            )
                    }

                         
                    <ActionTooltip label='Delete'>
                        {/* TODO ADD DELETE FUNTIONS */}
                        <TrashIcon onClick={onDelete} className='cursor-pointer ml-auto w-4 h-4 text-slate-500
                              hover:text-slate-600 dark:hover:text-slate-300  transition duration-300'/>
                     </ActionTooltip>
     
            </div>  
        )}
    </div>
  )
}

export default ChatItem