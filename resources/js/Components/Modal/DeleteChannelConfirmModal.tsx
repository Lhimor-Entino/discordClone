import { PageProps } from "@/types"
import { router, usePage } from "@inertiajs/react"
import { useModal } from "../Hooks/useModal"
import { toast } from "sonner"
import { useMemo, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"


interface Props  {}

const DeleteChannelConfirmModal = (props: Props) => {

    const {current_channel,current_server} = usePage<PageProps>().props
    const {isOpen,onClose,type,data:ModalData} = useModal();
    const [loading,setLoading] = useState(false)
    const onDelete = () => {

        if (!ModalData.channel) return;
        setLoading(true)
        router.post(route('servers.channels.destroy',{
            server_id:current_server.id,
            channel_id:ModalData.channel.id
        }),{
            
            current_channel_id:current_channel.id
        },{
            onSuccess: () => {
                toast.success("Channel deleted Successfully");
                onClose()
            },
            onError: () => toast.error("Failed to delete channel. Please try again")
        })
    }
    

    const OPEN = useMemo(()=>isOpen&&type==='DeleteChannel',[isOpen,type]);
  return (
   <Dialog open={OPEN} onOpenChange={onClose}>
        <DialogContent className="p-0 overflow-auto">
                <DialogHeader className="pt-7 px-5">
                        <DialogTitle className="text-2xl text-center font-bold">
                                Delete Channel &nbsp;
                                <span className="font-semibold text-indigo-500">#{ModalData.channel?.name}</span>
                        </DialogTitle>
                        <DialogDescription className="text-center" >This action is irreversible...</DialogDescription>
                </DialogHeader>
                <DialogFooter className="px-5 py-3.5 bg-primary-foreground">
                    <div className="flex justify-between items-center w-full">
                        <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
                        <Button variant="destructive" onClick={onDelete} disabled={loading ||!ModalData.channel?.id}>Confirm</Button>
                    </div>

                </DialogFooter>
        </DialogContent>
   </Dialog>
  )
}

export default DeleteChannelConfirmModal