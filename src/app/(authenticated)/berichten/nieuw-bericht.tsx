'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function NewMessageButton() {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push('/berichten/nieuw')}
      className="bg-[#40B3B3] hover:bg-[#359595]"
    >
      <Plus className="h-4 w-4" />
    </Button>
  )
}

