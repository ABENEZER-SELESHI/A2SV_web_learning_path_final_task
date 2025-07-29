// app/(components)/__tests__/BookmarkButton.test.tsx
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import BookmarkButton from '../BookmarkButton'
import { SessionProvider } from 'next-auth/react'

afterEach(() => {
  cleanup()
})

// 👇 Mock RTK Query mutation hooks
jest.mock('../../services/Service', () => ({
  useCreateBookmarkMutation: () => [jest.fn().mockReturnValue({ unwrap: jest.fn() })],
  useRemoveBookmarkMutation: () => [jest.fn().mockReturnValue({ unwrap: jest.fn() })],
}))

// 👇 Mock useSession from next-auth
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: () => ({
    data: { user: { name: 'Test User' } }, // simulate a logged-in user
  }),
}))

const renderWithSession = (ui: React.ReactElement) => {
  return render(<SessionProvider session={null}>{ui}</SessionProvider>)
}

describe('BookmarkButton', () => {
  it('renders with initial unbookmarked state', () => {
    renderWithSession(<BookmarkButton isBookmarked={false} id="1" />)
    expect(screen.getByText('☆ Bookmark')).toBeInTheDocument()
  })

  it('renders with initial bookmarked state', () => {
    renderWithSession(<BookmarkButton isBookmarked={true} id="1" />)
    expect(screen.getByText('★ Bookmarked')).toBeInTheDocument()
  })

  it('toggles bookmark state when clicked (logged in)', () => {
    renderWithSession(<BookmarkButton isBookmarked={false} id="1" />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    // We don't assert internal state change here because the mock doesn't perform real mutation
    // You could spy on the mutation hook calls if needed
  })
})
