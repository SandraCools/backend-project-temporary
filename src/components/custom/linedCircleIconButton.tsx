import {FunctionComponent} from 'react'
import {Button, ButtonProps} from '@/components/ui/button'
import {LucideIcon} from 'lucide-react'

interface LinedCircleButtonProps extends ButtonProps {
  Icon: LucideIcon
}

const LinedCircleIconButton: FunctionComponent<LinedCircleButtonProps> = ({Icon, ...buttonProps}) => {
  return (
    <div className="flex items-center">
      <div className="border border-muted flex-grow h-0.5"></div>
      <Button variant="ghost" className="p-0 border-2 rounded-full border-muted" {...buttonProps}>
        <Icon size={30} className="text-muted m-0" />
      </Button>
      <div className="border border-muted flex-grow h-0.5"></div>
    </div>
  )
}

export default LinedCircleIconButton
