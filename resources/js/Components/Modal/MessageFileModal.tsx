import React, { ChangeEventHandler, FormEventHandler, useEffect } from 'react'
import { useMemo,FC, useState } from "react";
import { useModal } from "../Hooks/useModal";
import { router, useForm, usePage } from "@inertiajs/react";
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from '../ui/button';
import { FileUploader } from 'react-drag-drop-files';
import { UploadCloudIcon } from 'lucide-react';
interface Props {}

const fileTypes = ['JPG','PNG','WEBP','JPEG','PDF']
const MessageFileModal = (props: Props) => {

    const { isOpen, onClose, type,data:ModalData } = useModal();

    const [imgPreview,setImgPreview] = useState("")
    const [fileType,setFileType] = useState("")
    const {post,data, setData,processing, errors,reset} = useForm<{file:File|undefined,message:string}>({
        message:"",
        file:undefined
    })
    const OPEN = useMemo(
        () => isOpen && type === "MessageFIle",
        [isOpen, type]
    );


    const handleClose = () =>{
        reset();
        onClose();
        setImgPreview("")
    }

    const onSubmit:FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();

        if(!ModalData.href) return;
      
    
        post((ModalData.href),{
            preserveScroll: true,
            preserveState: true,
            onSuccess: handleClose,
            onError: () => toast.error("Failed to send message")

        })
    }

    const onImageSelect:ChangeEventHandler<HTMLInputElement> = e =>{
        const {target} = e
        if(!target.files||target.files?.length<1) return null;

        const file= target.files[0]
        setData("file",file)
        setFileType(file.type)

        //application pdf
        if(file.type ==="application/pdf"){
            return setImgPreview( `${route('welcome')}/uploads/pdf/pdf.png`)
        }

        const url = URL.createObjectURL(file)
        setImgPreview(url)
    }

 

    const onFileDrop = (file: File) => {   
        setData("file",file)
        setFileType(file.type)
        //application pdf
        if(file.type ==="application/pdf"){
            return setImgPreview( `${route('welcome')}/uploads/pdf/pdf.png`)
        }

        const url = URL.createObjectURL(file)
        setImgPreview(url)
    }

    useEffect(()=>{

        if(errors.file){

            toast.error("Invalid File.")
        }
    },[errors.file])
  return (
    <Dialog open={OPEN} onOpenChange={handleClose}>
    <DialogContent className="p-0 overflow-auto">
        <DialogHeader className="pt-7 px-5">
            <DialogTitle className="text-2xl text-center font-bold">
                Create a Server
            </DialogTitle>
            <DialogDescription className="text-center">
                Provide a server name and image.
            </DialogDescription>
        </DialogHeader>

        <form
            onSubmit={onSubmit}
            id="server"
            className="flex flex-col gap-y-6"
        >
            <div className="flex flex-col gap-y-6 px-5">
            
                <FileUploader
                    types={fileTypes}
                    name="file"
                    handleChange={onFileDrop}
                    hoverTitle="Upload or drop a file right here"
                >
                    <label
                        htmlFor="image"
                        className="flex flex-col items-center justify-center cursor-pointer p-6"
                    >
                        {!imgPreview ? (
                            <UploadCloudIcon size={150} />
                        ) : (
                            <img
                                src={imgPreview}
                                width={150}
                                height={150}
                            />
                        )}

                        <p>Click To Select an Image</p>
                        <p>Or Drag and Drop Images Here...</p>
                    </label>
                </FileUploader>
                <input
                    id="image"
                    type="file"
                    hidden
                    accept=".png,.jpeg,.jpg,.webp,"
                    onChange={onImageSelect}
                />
            </div>
    
        </form>

        <DialogFooter>
            <Button disabled={processing} form="server" type="submit">
                Save changes
            </Button>
        </DialogFooter>
    </DialogContent>
</Dialog>
  )
}

export default MessageFileModal