import {FunctionComponent} from 'react'
import {getTags} from '@dal'
import PageTitle from '@/components/custom/pageTitle'
import TagForm from '@/app/(authenticated)/tags/tagForm'
import {Separator} from '@/components/ui/separator'
import Tag from '@/app/(authenticated)/tags/tag'
import {getSessionProfileOrRedirect} from '@mediators'

const TagsPage: FunctionComponent = async () => {
  const profile = await getSessionProfileOrRedirect()
  const tags = await getTags(profile.id)

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageTitle>Tags</PageTitle>
      </div>

      <TagForm />

      <Separator className="my-4" />

      <div className="flex flex-col gap-4">
        {tags.map(t => (
          <Tag {...t} key={t.id} />
        ))}
      </div>
    </>
  )
}

export default TagsPage
