import { HashIcon } from 'lucide-react'
import React from 'react'

interface Props {
    type: "Channel"|"Conversation",
    name:string
}

const ChatWelcome = (props: Props) => {
    const {type,name } = props
  return (
    <div 
    className='mt-auto  flex flex-col space-y-1.5  px-3.5 mb.3.5'>
        {
            type ==="Channel" &&(
                <div className='h-[4.688rem] w-[4.688rem] rounded-full  bg-neutral-500 dark:bg-neutral-700  flex items-center  justify-center  '>
                    <HashIcon className='h-12  w-12  text-white'/>
                    </div>
            )
        }
        <p className=' text-xl md:text-3xl font-bold'>
        {type ==="Channel" ? "Welcome to #" : ""} &nbsp;{name}

        </p>
        <p className=' text-slate-600 dark:text-slate-400 text-sm'>
            {
                type ==="Channel" ?
                `This is the start  of the  #${name} channel.`: 
                `This is the start  of your conversation with  #${name}.`
            }

        </p>
    </div>
  )
}

export default ChatWelcome