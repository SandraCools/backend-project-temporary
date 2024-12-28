'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function NewMessagePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      onderwerp: formData.get('onderwerp'),
      bericht: formData.get('bericht'),
      ontvangerIds: formData.getAll('ontvangers'),
    }

    try {
      await fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      router.push('/berichten')
    } catch (error) {
      console.error('Failed to send message:', error)
      setLoading(false)
    }
  }
  //TODO: Juiste multiple select gebruiken
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Nieuw Bericht</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Aan:</label>

          <Select name="ontvangers" multiple>

            <SelectTrigger>
              <SelectValue placeholder="Selecteer ontvangers" />
            </SelectTrigger>
            <SelectContent>
              {/* Hier komen de gebruikers uit de database */}
              <SelectItem value="user1">Gebruiker 1</SelectItem>
              <SelectItem value="user2">Gebruiker 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Onderwerp:</label>
          <Input name="onderwerp" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Bericht:</label>
          <Textarea name="bericht" rows={10} required />
        </div>
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Annuleren
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Verzenden...' : 'Verzenden'}
          </Button>
        </div>
      </form>
    </div>
  )
}

