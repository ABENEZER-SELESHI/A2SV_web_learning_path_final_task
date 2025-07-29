// app/(components)/__tests__/OpportunityCard.test.tsx
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import JobCard from '../OpportunityCard'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { SessionProvider } from 'next-auth/react'
import '@testing-library/jest-dom'
import { act } from 'react'

// Clean up DOM after each test
afterEach(() => {
  cleanup()
})

// 🔧 Mock useSession to simulate logged-in user
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: () => ({
    data: { user: { name: 'Test User', email: 'test@example.com' } },
    status: 'authenticated',
  }),
}))

// ✅ Mock BookmarkButton to isolate JobCard behavior
const mockBookmarkClick = jest.fn()

jest.mock('../BookmarkButton', () => (props: any) => (
  <button onClick={mockBookmarkClick} aria-label="bookmark">
    {props.isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
  </button>
))

// Helper function to wrap component in providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <SessionProvider session={null}>
      <Provider store={store}>{ui}</Provider>
    </SessionProvider>
  )
}

describe('JobCard', () => {
  const mockJob = {
    id: '1',
    icon: 'test-icon.png',
    title: 'Frontend Developer',
    location: ['Addis Ababa'],
    description: 'We are looking for a frontend developer.',
    company: 'Tech Corp',
    isBookmarked: false,
  }

  it('renders job title, company, location, and description', () => {
    renderWithProviders(<JobCard {...mockJob} />)

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Tech Corp')).toBeInTheDocument()
    expect(screen.getByText('Addis Ababa')).toBeInTheDocument()
    expect(screen.getByText('We are looking for a frontend developer.')).toBeInTheDocument()
  })

  it('renders image with the correct src', () => {
    renderWithProviders(<JobCard {...mockJob} />)

    const img = screen.getByAltText(`logo-${mockJob.id}`) as HTMLImageElement
    expect(img.src).toContain('test-icon.png')
  })

  it('renders fallback image if no icon is provided', () => {
    renderWithProviders(<JobCard {...{ ...mockJob, icon: undefined }} />)

    const img = screen.getByAltText(`logo-${mockJob.id}`) as HTMLImageElement
    expect(img.src).toContain('placeholder-logo.png')
  })

  it('triggers bookmark interaction when clicked', async () => {
    renderWithProviders(<JobCard {...mockJob} />)

    const button = screen.getByRole('button', { name: /bookmark/i })

    await act(async () => {
      fireEvent.click(button)
    })

    expect(mockBookmarkClick).toHaveBeenCalled()
  })
})
