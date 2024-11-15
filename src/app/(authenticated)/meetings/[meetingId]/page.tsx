import {FunctionComponent} from 'react'
import {getContacts, getMeeting} from '@dal'
import PageTitle from '@/components/custom/pageTitle'
import MeetingForm from '@/app/(authenticated)/meetings/meetingForm'
import {getSessionProfileOrRedirect} from '@mediators'

interface MeetingDetailPageParams {
  params: Promise<{
    meetingId: string
  }>
}

const MeetingDetailPage: FunctionComponent<MeetingDetailPageParams> = async ({params}) => {
  const profile = await getSessionProfileOrRedirect()
  const {meetingId} = await params
  const meeting = await getMeeting(profile.id, meetingId)
  const contacts = await getContacts(profile.id, '')

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageTitle>My meetings</PageTitle>
      </div>

      <MeetingForm contacts={contacts} meeting={meeting} />
    </>
  )
}

export default MeetingDetailPage
