import {FunctionComponent} from 'react'
import {getContacts, getMeetings} from '@dal'
import Meeting from '@/app/(authenticated)/meetings/meeting'
import AddMeetingForm from '@/app/(authenticated)/meetings/meetingForm'
import PageTitle from '@/components/custom/pageTitle'
import {Separator} from '@/components/ui/separator'
import {getSessionProfileOrRedirect} from '@mediators'

const MeetingsPage: FunctionComponent = async () => {
  const profile = await getSessionProfileOrRedirect()
  const meetings = await getMeetings(profile.id)
  const contacts = await getContacts(profile.id, '')

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageTitle>My meetings</PageTitle>
      </div>

      <AddMeetingForm contacts={contacts} />

      <Separator />

      <div className="flex gap-4 mt-4">
        {meetings.map(m => (
          <Meeting {...m} key={m.id} />
        ))}
      </div>
    </>
  )
}

export default MeetingsPage
