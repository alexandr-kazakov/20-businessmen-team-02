import { Button } from '../../../../components/UI/Button'

import { setProfilenView } from '../../redux/profileSlice'
import { useAppDispatch } from '../../../../app/redux/hooks'

export const EditButton: React.FC = () => {
  const dispatch = useAppDispatch()

  const handlerToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(setProfilenView())
  }

  return (
    <Button onClick={handlerToggle} type="button">
      Изменить
    </Button>
  )
}
