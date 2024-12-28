'use client'
import {FunctionComponent, PropsWithChildren, useState} from 'react'
import {TooltipProvider} from '@/components/ui/tooltip'
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable'
import {cn} from '@/lib/utils'
import {Separator} from '@/components/ui/separator'
import {Calendar, User, Mail, Images} from 'lucide-react'
import NavItem from '@/app/navItem'
import {Profile} from '@/lib/models/users'

interface NavbarProps extends PropsWithChildren {
  profile: Profile | null
}

const Navbar: FunctionComponent<NavbarProps> = ({children, profile}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
        <ResizablePanel
          defaultSize={isCollapsed ? 5 : 15}
          collapsedSize={5}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => setIsCollapsed(true)}
          onResize={() => setIsCollapsed(false)}
          className={cn(isCollapsed && 'transition-all duration-300 ease-in-out', 'min-w-[3.5em]')}>
          <div className="flex flex-col gap-4 py-2">
            <NavItem
              isCollapsed={isCollapsed}
              Icon={User}
              title={profile ? profile.username : 'Login'}
              path={profile ? '/account' : '/login'}
            />
            <Separator />
            <NavItem isCollapsed={isCollapsed} Icon={Mail} title="Berichten" path="/berichten" />
            <NavItem isCollapsed={isCollapsed} Icon={Images} title="Foto's" path="/fotos" />
            {/*<NavItem isCollapsed={isCollapsed} Icon={Calendar} title="Foto's" path="/kalender" />*/}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80} minSize={60}>
          <div className="h-[100vh] mt-4 flex justify-center overflow-y-scroll">
            <div className="w-[80%] md:w-[75%]">{children}</div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}

export default Navbar
