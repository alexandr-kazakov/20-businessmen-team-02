import { FC, ReactNode } from 'react'
import { useHistory } from 'react-router-dom'

interface WithRedirectToProps {
  url: string
  children: ReactNode
}

export const WithRedirectTo: FC<WithRedirectToProps> = ({ url, children }) => {
  const history = useHistory()

  return (
    <div onClick={() => history.push(`${url}`)} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  )
}
