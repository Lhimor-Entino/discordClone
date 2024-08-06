import React, { useMemo, useState } from 'react'
import { useModal } from '../Hooks/useModal'
import axios from 'axios'
import { toast } from 'sonner'
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Loader2Icon } from 'lucide-react';
interface Props {}

const DeleteMessageConfirmModal = (props: Props) => {
    const {isOpen,onClose,type,data} = useModal()
    
    const [loading,setLoading] = useState(false)

    const OPEN = useMemo(
        () => isOpen && type === "DeleteMessage",
        [isOpen, type]
    );
    const onDelete = () => {
        if(!data.href) return;

        axios.post(data.href)
        .then(() => { 
            onClose();
            toast.success("Message deleted successfully");
        })
        .catch(() => toast.error("Failed to delete message. Please try Again"))
        .finally(() => setLoading(false))
    }
  return (
    <Dialog open={OPEN} onOpenChange={onClose}>
    <DialogContent className="p-0 overflow-auto">
        <DialogHeader className="pt-7 px-5">
            <DialogTitle className="text-2xl text-center font-bold">
                Delete Message
            </DialogTitle>
            <DialogDescription className="text-center">
               Are you sure?
            </DialogDescription>
        </DialogHeader>
        <DialogFooter className='px-5 py-3.5 bg-primary-foreground'>
            <div className='flex justify-between item-center w-full'>
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                            Cancel
                    </Button>
                    <Button variant="destructive" onClick={onDelete} disabled={loading}>
                            {loading && <Loader2Icon className='h-5 w-5 animate-spin mr-2' />}
                            Confirm
                    </Button>
            </div>
        </DialogFooter>
    </DialogContent>
</Dialog>
  )
}

export default DeleteMessageConfirmModal