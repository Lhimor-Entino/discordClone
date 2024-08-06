import { MenuIcon } from 'lucide-react'
import React from 'react'
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from './ui/sheet'
import { Button } from './ui/button'
import NavigationSidebar from './NavigationSidebar'
import ServerSidebar from '@/Layouts/ServerLayoutComponents/ServerSidebar'

interface Props{}

const MobileToggle = (props: Props) => {
  return (
      <Sheet>
            <SheetTrigger asChild className='z-0 '>
                <Button variant="ghost" size="icon" className='flex md:hidden'>
                    <MenuIcon />
                </Button>
                </SheetTrigger>
             <SheetContent side="left" className='p-0  flex  gap-0'>
                        <div  className='w-[4.5rem]'>
                            <NavigationSidebar />
                        </div>
              <ServerSidebar />
            </SheetContent>
      </Sheet>
  )
}

export default MobileToggle