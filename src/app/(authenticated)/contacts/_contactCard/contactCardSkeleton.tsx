import {FunctionComponent} from 'react'
import {Card, CardContent} from '@/components/ui/card'
import {Skeleton} from '@/components/ui/skeleton'

const ContactCardSkeleton: FunctionComponent = () => {
  return (
    <Card className="my-4">
      <CardContent className="flex items-center h-full p-4 gap-4">
        <div>
          <Skeleton className="w-12 h-12 rounded-full" />
        </div>
        <div className="flex-grow flex justify-between">
          <div>
            <Skeleton className="w-24 h-6 mb-2" />
            <Skeleton className="w-32 h-4" />
          </div>
          <Skeleton className="w-8 h-8" />
        </div>
      </CardContent>
    </Card>
  )
}

export default ContactCardSkeleton
