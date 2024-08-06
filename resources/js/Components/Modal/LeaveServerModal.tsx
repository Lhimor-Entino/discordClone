import React, { useMemo, useState } from 'react'
import { useModal } from '../Hooks/useModal';
import { router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { toast } from 'sonner';
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
interface Props  {}

const LeaveServerModal = (props: Props) => {
    
    const {isOpen,onClose,type,data:ModalData} = useModal(); 
    const {current_server} = usePage<PageProps>().props
    const [loading,setLoading] = useState(false)  

    const OPEN = useMemo(
        () => isOpen && type === "LeaveServer",
        [isOpen, type]
    );
    const onLeave = () => {
        router.post(route('servers.leave'),{
            server_id: current_server.id
        },{
            onSuccess:()=> {
                toast.success("Server left successfully"); 
              onClose()
              },
              onError: () =>  toast.error("Failed to left server. Please try Again"),
              onFinish: () => setLoading(false)
        })
    }
  return (
     <Dialog open={OPEN} onOpenChange={onClose}>
    <DialogContent className="p-0 overflow-auto">
            <DialogHeader className="pt-7 px-5">
                    <DialogTitle className="text-2xl text-center font-bold">
                            Leave Server &nbsp;
                            <span className="font-semibold text-indigo-500">#{current_server.name}</span>
                    </DialogTitle>
                    <DialogDescription className="text-center" >This action is irreversible...</DialogDescription>
            </DialogHeader>
            <DialogFooter className="px-5 py-3.5 bg-primary-foreground">
                <div className="flex justify-between items-center w-full">
                    <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
                    <Button variant="destructive" onClick={onLeave} disabled={loading}>Confirm</Button>
                </div>

            </DialogFooter>
    </DialogContent>
</Dialog>
  )
}

export default LeaveServerModal