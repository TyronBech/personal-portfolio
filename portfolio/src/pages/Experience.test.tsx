import { render, screen } from '@testing-library/react';
import Experience from './Experience';
import type { PortfolioData } from '@/types/portfolio';
import { describe, it, expect } from 'vitest';

const mockData: PortfolioData = {
  first_name: 'Jane',
  middle_name: '',
  last_name: 'Doe',
  role: 'Software Engineer',
  email: 'janedoe@example.com',
  phone: '123-456-7890',
  message: 'Hi!',
  about: 'I am a developer.',
  profile_image: {},
  about_image: {},
  about_image_alt: '',
  experience_image: {},
  experience_image_alt: 'Experience Alt Text',
  address: { city: 'Metropolis', country: 'USA' },
  statuses: { work: true, projects: false },
  socials: [],
  school: { name: '', branch: '', degree: '', start_year: 2022, graduation_year: 2026 },
  skills: [],
  experiences: [
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      role: 'Full Stack Developer',
      description: ['Inventory System', 'Node/Postgres'],
      start_date: 'September 2024',
      end_year: null,
    },
    {
      id: 2,
      company: 'Innovate LLC',
      role: 'Intern',
      description: ['Contributed to e-commerce web app'],
      start_date: 'October 2025',
      end_year: 'January 2026',
    },
    {
      id: 3,
      company: 'Global Academy',
      role: 'Web Developer',
      description: ['Website performance tuning'],
      start_date: 'July 2025',
      end_year: null,
    },
  ],
  projects: [],
  featured: [],
};

describe('Experience Component', () => {
  it('should render experience details and sort them chronologically (most recent first)', () => {
    render(<Experience data={mockData} />);

    // Assert main header
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();

    // Assert roles and companies are rendered
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('at Tech Solutions Inc.')).toBeInTheDocument();
    expect(screen.getByText('Intern')).toBeInTheDocument();
    expect(screen.getByText('at Innovate LLC')).toBeInTheDocument();
    expect(screen.getByText('Web Developer')).toBeInTheDocument();
    expect(screen.getByText('at Global Academy')).toBeInTheDocument();

    // Assert descriptions are rendered
    expect(screen.getByText('Inventory System')).toBeInTheDocument();
    expect(screen.getByText('Contributed to e-commerce web app')).toBeInTheDocument();
    expect(screen.getByText('Website performance tuning')).toBeInTheDocument();

    // Assert experience image is rendered
    const image = screen.getByAltText('Experience Alt Text');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://mock-image-url.com/image.jpg');

    // Verify chronological order (most recent first):
    // 1. Intern at Innovate LLC (October 2025)
    // 2. Web Developer at Global Academy (July 2025)
    // 3. Full Stack Developer at Tech Solutions Inc. (September 2024)
    const roleElements = screen.getAllByRole('heading', { level: 3 });
    expect(roleElements).toHaveLength(3);
    
    expect(roleElements[0].textContent).toContain('Intern');
    expect(roleElements[0].textContent).toContain('at Innovate LLC');
    
    expect(roleElements[1].textContent).toContain('Web Developer');
    expect(roleElements[1].textContent).toContain('at Global Academy');
    
    expect(roleElements[2].textContent).toContain('Full Stack Developer');
    expect(roleElements[2].textContent).toContain('at Tech Solutions Inc.');
  });
});
