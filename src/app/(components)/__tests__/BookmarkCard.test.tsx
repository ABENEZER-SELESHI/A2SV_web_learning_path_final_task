// app/(components)/__tests__/BookmarkCard.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookmarkCard from '../BookmarkCard';

const mockData = {
  eventID: 'test123',
  title: 'Frontend Developer',
  opType: 'inPerson',
  orgName: 'Tech Corp',
  datePosted: '2025-07-28T00:00:00.000Z',
  dateBookmarked: '2025-07-29T00:00:00.000Z',
  logoUrl: '',
  location: 'Remote'
};

describe('BookmarkCard Component', () => {
  it('renders correctly with provided data', () => {
    render(<BookmarkCard {...mockData} />);
    
    const formattedDate = new Date(mockData.dateBookmarked).toLocaleDateString();

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Remote')).toBeInTheDocument();
    expect(screen.getByText(`Bookmarked on: ${formattedDate}`)).toBeInTheDocument();
    expect(screen.getByText('In person')).toBeInTheDocument();
    
    const logoImg = screen.getByAltText('logo-test123') as HTMLImageElement;
    expect(logoImg.src).toContain('/placeholder-logo.png');
  });

  it('renders provided logoUrl if available', () => {
    render(
      <BookmarkCard
        {...mockData}
        logoUrl="https://example.com/logo.png"
      />
    );
    const logoImg = screen.getByAltText('logo-test123') as HTMLImageElement;
    expect(logoImg.src).toBe('https://example.com/logo.png');
  });

  it('falls back to "inPerson" style if invalid opType is passed', () => {
    render(<BookmarkCard {...mockData} opType="unknown" />);
    expect(screen.getByText('unknown')).toBeInTheDocument(); // Label still shows the unknown type
  });
});
