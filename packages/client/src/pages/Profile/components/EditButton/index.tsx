import { Button, ButtonVariant } from '../../../../components/UI/Button'

import { setprofileView } from '../../redux/profileSlice'
import { useAppDispatch } from '../../../../app/redux/hooks'

type Props = {
  children: string
  variant?: ButtonVariant
}

export const EditButton: React.FC<Props> = ({ children, variant }) => {
  const dispatch = useAppDispatch()

  const handlerToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(setprofileView())
  }

  return (
    <Button onClick={handlerToggle} type="button" variant={variant}>
      {children}
    </Button>
  )
}
