'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import type { BerichtMetInfo } from '@/lib/models/messages'
import { MessageModal } from './bericht-modal'

interface MessageListProps {
  initialMessages: BerichtMetInfo[]
}

export function MessageList({ initialMessages }: MessageListProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<BerichtMetInfo | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'inbox'

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' })
      setMessages(messages.filter(m => m.id !== id))
    } catch (error) {
      console.error('Failed to delete message:', error)
    }

    setDeletingId(null)
  }

  const handleMessageClick = async (message: BerichtMetInfo) => {
    setSelectedMessage(message)

    if (!message.gelezen) {
      try {
        await fetch(`/api/messages/${message.id}/read`, {
          method: 'POST',
        })
        setMessages(messages.map(m =>
          m.id === message.id ? { ...m, gelezen: true } : m
        ))
      } catch (error) {
        console.error('Failed to mark message as read:', error)
      }
    }
  }

  return (
    <>
      <div className="flex-1 overflow-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`
              flex items-center justify-between p-4 border-b cursor-pointer
              hover:bg-gray-50 transition-colors
              ${deletingId === message.id ? 'bg-red-100' : ''}
            `}
            onClick={() => handleMessageClick(message)}
          >
            <div className="flex-1">
              <h3 className={`${!message.gelezen ? 'font-bold' : ''}`}>
                {message.onderwerp}
              </h3>
              <p className="text-sm text-gray-600">
                Van: {message.verzender.voornaam} {message.verzender.familienaam}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(message.verzondenOp), 'dd MMM HH:mm', { locale: nl })}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(message.id)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <MessageModal
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />
    </>
  )
}

