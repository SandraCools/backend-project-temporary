import {FunctionComponent} from 'react'
import PageTitle from '@/components/custom/pageTitle'
import DAL from '@dal'
import Contact from '@/app/(authenticated)/tags/[tagId]/contact'
import {Separator} from '@/components/ui/separator'
import TagContactForm from '@/app/(authenticated)/tags/[tagId]/tagContactForm'
import {getSessionProfileOrRedirect} from '@mediators'

interface TagIdPageParams {
  params: Promise<{
    tagId: string
  }>
}

const TagIdPage: FunctionComponent<TagIdPageParams> = async ({params}) => {
  const profile = await getSessionProfileOrRedirect()
  const {tagId} = await params
  const tag = await DAL.getTag(profile.id, tagId)
  const contacts = await DAL.getContacts(profile.id, '')

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageTitle>{tag.name}</PageTitle>
      </div>

      <TagContactForm contacts={contacts} />

      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        {tag.contacts.map(c => (
          <Contact {...c} key={c.id} />
        ))}
      </div>
    </>
  )
}

export default TagIdPage
