import { PageProps, ChannelType} from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import React, { FormEventHandler, useEffect, useMemo } from 'react'
import { useModal } from '../Hooks/useModal'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'

interface Props {}

const CHANNELTYPES :ChannelType[] = ['TEXT' , 'VIDEO','AUDIO']
type FormData = {
    name:string,
    channel_id?:number,
    type:ChannelType
}
const EditChannelModal = (props: Props) => {
    const {current_server} = usePage<PageProps>().props

    const {isOpen,onClose,type,data:ModalData} = useModal();
    const {channel} = ModalData;

    const {data,setData,post,processing,errors,reset} = useForm<FormData>({
        channel_id:channel?.id,
        name: channel?.name||"",
        type:channel?.type||"TEXT"
    })

    const OPEN = useMemo(()=>isOpen&&type==='EditChannel',[isOpen,type]);

    const handleClose = () => {
        reset();
        onClose();
    }

    useEffect(() => {
            if(errors.name) toast.error(errors.name)
            if(errors.type) toast.error(errors.type)
    },[errors])

    useEffect(() => {

        if(!channel) return;
        setData(val =>({
            ...val,
            channel_id:channel.id,
            type:channel.type,
            name: channel.name
        }))
    },[channel])

    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        post(route("servers.channels.update",{
            server_id:current_server.id
        }),{
            onSuccess: () => {
                toast.success("Channel Updated Successfully")
                handleClose()
            },
            onError: (e) => {
                toast.error("An error  occured while updating the channel. Please Try again");
                console.log(e)
            }
        })
    }
  return (
    <Dialog open={OPEN} onOpenChange={handleClose}>
        <DialogContent className='p-0 overflow-auto'>
            <DialogHeader className='pt-7 px-5'>
            <DialogTitle className='text-2xl text-center font-bold '> Edit Channel</DialogTitle>
            </DialogHeader>

            <form id="channel" onSubmit={onSubmit} className='flex flex-col space-y-7'>
                <div className='flex flex-col space-y-7 px-5'>
                   <Label className='uppercase text-xs font-bold'>Channel Name</Label>
                   <Input 
                    value={data.name}
                    onChange={({target}) => setData("name",target.value)}
                    required
                    disabled={processing}
                    className='border-0 focus-visible:!ring-0 focus-visible:!ring-offeset-0'
                    placeholder='Channel name...'
                   />
                </div>

                <div className='space-y-1'>
                   <Label className='uppercase text-xs font-bold'>Channel Type</Label>
               <Select>
                    <SelectTrigger
                    className=' bg-secondary border-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 capitalize outline-none'
                    >
                        <SelectValue  placeholder="Select Channel Type"/>

                    </SelectTrigger>
                    <SelectContent>

                        {
                            CHANNELTYPES.map( channelType => (
                                <SelectItem key={channelType} value={channelType} className=' capitalize'>
                                        {channelType}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
               </Select>
                </div>
            </form>

            <DialogFooter className='px-5 py-3.5'>
                        <Button disabled={processing} form='channel' className='ml-auto'>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default EditChannelModal