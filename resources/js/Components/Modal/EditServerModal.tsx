import React, { ChangeEventHandler, FormEventHandler, useEffect } from 'react'
import { useMemo,FC, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { useModal } from '../Hooks/useModal';
import { PageProps } from '@/types';
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon, UploadCloud, UploadCloudIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import { FileUploader } from "react-drag-drop-files";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
interface Props {}



const fileTypes = ["JPG", "PNG", "WEBP", "JPEG"];

const EditServerModal = () => {
    
    const fileTypes = ["JPG", "PNG", "WEBP",'JPEG'];
    const {current_server} = usePage<PageProps>().props;    
    const {isOpen,onClose,type} = useModal();

    const [imgPreview,setImgPreview] = useState(current_server.image);
    const { data, setData, post, processing, errors, reset } = useForm<{
        name:string,
        image:File|undefined,
        server_id:number}>
    ({
        server_id:current_server.id,
        name: current_server.name,
        image: undefined,
    }); 

    const onSubmit:FormEventHandler = (e) =>{
        e.preventDefault();
        post(route('servers.update'),{
            onSuccess:()=>{
                onClose();
                toast.success('Server Updated Successfully');
            }
        });
    }

    const onImageSelect:ChangeEventHandler<HTMLInputElement> = (e) =>{
        const {target}=e;
        if(!target.files||target.files?.length<1) return null;
        const file=target.files[0];
        const url = URL.createObjectURL(file) ;
        setData('image',file);
        setImgPreview(url);
    }

    const onFileDrop = (file:File) =>{
        const url = URL.createObjectURL(file) ;
        setData('image',file);
        setImgPreview(url);
    }

    const OPEN = useMemo(()=>isOpen&&type==='EditServer',[isOpen,type]);
    const handleClose = () =>{
        reset();
        onClose();
    }
    return (
        <Dialog open={OPEN} onOpenChange={handleClose}>   
            <DialogContent className='p-0 overflow-auto'>
                <DialogHeader className='pt-7 px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>Edit Server</DialogTitle>
                    <DialogDescription className='text-center'>Update Server Name and Image(optional)</DialogDescription>
                </DialogHeader>
                <form id='server' onSubmit={onSubmit} className='flex flex-col space-y-7'>
                    <div className='flex flex-col space-y-7 px-5'>
                        <div className='flex flex-col items-center justify-center text-center'>
                            {(errors.name||errors.image)&&<FileErrorAlert messages={[errors?.name||"",errors?.image||""]} />}
                            <FileUploader hoverTitle="Upload or drop a file right here" handleChange={onFileDrop} name="file" types={fileTypes}>
                                <label htmlFor="image" className='flex flex-col items-center justify-center cursor-pointer p-6'>
                                    {!imgPreview?<UploadCloud  size={150} />:<img src={imgPreview} width={150} height={150} />}
                                    <p>Click to Select an Image</p>
                                    <p>Or Drag and Drop Images Here...</p>
                                </label>
                            </FileUploader>
                            <input accept=".png,.jpeg,.jpg,.webp," onChange={onImageSelect} type="file" hidden id='image' />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <Label className='uppercase text-xs font-bold'>Server Name</Label>
                            <Input value={data.name} onChange={({target})=>setData('name',target.value)} required disabled={processing} className='border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0' placeholder='Server Name....' />    
                        </div>
                        
                    </div>
                </form>
                <DialogFooter className='px-5 py-3.5'>
                    <Button  disabled={processing} form='server' className='ml-auto'>Update Server</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default EditServerModal;



const FileErrorAlert = (props: {messages:string[]}) => {
    const {messages} = props;
    return  (
        <Alert variant='destructive'>
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {messages.map((msg,i)=> <span key={msg}>{msg}</span>)}
            </AlertDescription>
        </Alert>
    );
}