import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router'

const AuthLayout = () => {

    const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
        <header className='w-full flex justify-around py-6'>
            <Button 
                className='text-accent-foreground' 
                variant='outline' 
                onClick={() => navigate(-1)}
            >
                <ChevronLeftIcon className='size-5' /> Go Back
            </Button>

            <ModeToggle />
        </header>
        
        <div className="flex-1 flex items-center justify-center px-4 overflow-auto">
            <Outlet />
        </div>
    </div>
  )
}

export default AuthLayout
