import {FunctionComponent, PropsWithChildren} from 'react'

const PageTitle: FunctionComponent<PropsWithChildren> = ({children}) => {
  return <h1 className="text-4xl">{children}</h1>
}

export default PageTitle
