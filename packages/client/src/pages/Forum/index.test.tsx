import React from 'react'
import { render } from '@testing-library/react'

import { ForumList } from '@/pages/Forum/components/ForumList'
import { ForumView } from '@/pages/Forum/components/ForumView'

jest.mock('react-redux', () => ({
  useSelector: () => ({ isCreateTopic: true, topicsList: [] }),
  useDispatch: jest.fn(),
}))

describe('Forum', () => {
  test('should render ForumList component', () => {
    const { asFragment } = render(<ForumList />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render ForumView component', () => {
    const { asFragment } = render(<ForumView />)

    expect(asFragment()).toMatchSnapshot()
  })
})
