import { render, screen } from '@testing-library/react';
import About from './About';
import type { PortfolioData } from '@/types/portfolio';
import { describe, it, expect } from 'vitest';

const mockData: PortfolioData = {
  first_name: 'Jane',
  middle_name: 'M.',
  last_name: 'Doe',
  role: 'Software Engineer',
  email: 'janedoe@example.com',
  phone: '123-456-7890',
  message: 'Hi!',
  about: 'I am a passionate Full Stack developer who loves solving complex challenges.',
  profile_image: {},
  about_image: {},
  about_image_alt: 'Jane Doe Image',
  experience_image: {},
  experience_image_alt: 'Jane Experience Image',
  address: {
    city: 'Metropolis',
    country: 'USA',
  },
  statuses: {
    work: true,
    projects: false,
  },
  socials: [
    { name: 'GitHub', url: 'https://github.com/janedoe' },
  ],
  school: {
    name: 'State University',
    branch: 'Central Campus',
    degree: 'Bachelor of Science in Computer Science',
    start_year: 2022,
    graduation_year: 2026,
  },
  skills: [],
  experiences: [],
  projects: [],
  featured: [],
};

describe('About Component', () => {
  it('should render the component with correct user information', () => {
    render(<About data={mockData} />);

    // Assert main headings
    expect(screen.getByRole('heading', { name: /About me/i })).toBeInTheDocument();

    // Assert text content
    expect(
      screen.getByText('I am a passionate Full Stack developer who loves solving complex challenges.')
    ).toBeInTheDocument();

    // Assert school information
    expect(screen.getByText(/Bachelor of Science in Computer Science/)).toBeInTheDocument();
    expect(screen.getByText(/State University/)).toBeInTheDocument();
    expect(screen.getByText(/Central Campus/)).toBeInTheDocument();
    expect(screen.getByText(/2022/)).toBeInTheDocument();
    expect(screen.getByText(/2026/)).toBeInTheDocument();

    // Assert image and its alt text
    const image = screen.getByAltText('Jane Doe Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://mock-image-url.com/image.jpg');
  });
});
