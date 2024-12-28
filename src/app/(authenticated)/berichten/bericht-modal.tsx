'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { BerichtMetInfo } from '@/lib/models/messages'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'

interface MessageModalProps {
  message: BerichtMetInfo | null
  onClose: () => void
}

export function MessageModal({ message, onClose }: MessageModalProps) {
  if (!message) return null

  return (
    <Dialog open={!!message} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{message.onderwerp}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <p>Van: {message.verzender.voornaam} {message.verzender.familienaam}</p>
            <p>Verzonden op: {format(new Date(message.verzondenOp), 'dd MMMM yyyy HH:mm', { locale: nl })}</p>
          </div>
          <div className="text-sm text-gray-600">
            <p>Aan: {message.ontvangers.map(o => `${o.voornaam} ${o.familienaam}`).join(', ')}</p>
          </div>
          <p className="whitespace-pre-wrap">{message.bericht}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

