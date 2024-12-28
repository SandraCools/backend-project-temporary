'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function MessageTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'inbox'

  const updateTab = (newTab: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', newTab)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex gap-2">
      <Button
        variant={tab === 'inbox' ? 'default' : 'ghost'}
        onClick={() => updateTab('inbox')}
      >
        INBOX
      </Button>
      <Button
        variant={tab === 'verzonden' ? 'default' : 'ghost'}
        onClick={() => updateTab('verzonden')}
      >
        VERZONDEN
      </Button>
    </div>
  )
}

