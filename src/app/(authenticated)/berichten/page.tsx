import { Suspense } from 'react'
import { MessageList } from './overzicht'
import { NewMessageButton } from './nieuw-bericht'
import { MessageTabs } from './tabs'
import type { BerichtMetInfo } from '@/lib/models/messages'
import {getMessagesSent, getMessagesInbox} from '@dal'
import {getSessionProfileOrRedirect} from '@mediators'

async function getMessages(tab: string, userId: string): Promise<BerichtMetInfo[]> {
  if (tab === 'verzonden') {
    return getMessagesSent(userId)
  }
  return getMessagesInbox(userId)
}


export default async function BerichtenPage({searchParams}: {searchParams: { tab?: string }}) {
  const profile = await getSessionProfileOrRedirect()

  const tab = searchParams.tab || 'inbox'

  const userId = profile.id
  const messages = await getMessages(tab, userId)


  return (
    <div className="flex flex-col h-full bg-[#40B3B3]">
      <div className="flex flex-col h-full bg-white rounded-t-lg">
        <header className="p-4 bg-[#40B3B3]">
          <h1 className="text-2xl font-bold text-white">Berichten</h1>
        </header>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-2 border-b">
            <MessageTabs />
            <NewMessageButton />
          </div>
          <Suspense fallback={<div className="p-4">Laden...</div>}>
            <MessageList initialMessages={messages} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

