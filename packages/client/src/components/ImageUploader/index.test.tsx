import React from 'react'
import { render } from '@testing-library/react'
import { ImageUploader } from '@/components/ImageUploader/index'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

test('should render ImageUploader component', () => {
  const { asFragment } = render(<ImageUploader onChange={jest.fn()} onClick={jest.fn()} initPreview="example.img" />)

  expect(asFragment()).toMatchSnapshot()
})
