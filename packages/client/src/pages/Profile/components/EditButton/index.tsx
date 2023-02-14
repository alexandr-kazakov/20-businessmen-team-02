import { Button, ButtonVariant } from '../../../../components/UI/Button'

import { useAppDispatch } from '../../../../app/redux/hooks'
import { getProfile, setProfileView } from '../../../../pages/Auth/redux/authSlice'

type Props = {
  children: string
  variant?: ButtonVariant
}

export const EditButton: React.FC<Props> = ({ children, variant }) => {
  const dispatch = useAppDispatch()

  const handlerToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(getProfile())
    dispatch(setProfileView())
  }

  return (
    <Button onClick={handlerToggle} type="button" variant={variant}>
      {children}
    </Button>
  )
}
