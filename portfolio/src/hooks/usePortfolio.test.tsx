import { renderHook, waitFor } from '@testing-library/react';
import { usePortfolio } from './usePortfolio';
import { client } from '@/data/sanity';
import { describe, it, expect, vi, type Mock } from 'vitest';

describe('usePortfolio Hook', () => {
  it('should initially return loading state and null data', () => {
    // Mock the fetch behavior to not resolve immediately to test loading state
    (client.fetch as unknown as Mock).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => usePortfolio());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it('should load portfolio data and update state on successful fetch', async () => {
    const mockProfile = {
      first_name: 'Jane',
      last_name: 'Doe',
      role: 'Software Engineer',
      email: 'jane@example.com',
      phone: '1234567890',
      message: 'Hello World',
      about: 'About me content',
      school: {
        name: 'State U',
        branch: 'Central',
        degree: 'BSCS',
        start_year: 2022,
        graduation_year: 2026,
      },
      statuses: { work: true, projects: false },
    };

    const mockExperiences = [
      {
        id: 1,
        company: 'Company A',
        role: 'Web Developer',
        description: ['Built web applications'],
        start_date: 'September 2024',
        end_year: null,
      },
    ];

    const mockProjects = [
      {
        id: 1,
        name: 'Task Manager App',
        description: 'Simulates task tracking and lists',
        technologies: ['React'],
        repository: 'https://github.com/example/repo',
        type: 'Web',
        year: 2024,
      },
    ];

    const mockFeatured = [
      {
        _id: '1',
        title: 'Featured Project',
        description: 'A featured project description',
      }
    ];

    const mockSeasonal = [
      {
        _id: 's1',
        name: 'halloween',
        start_date: '10-24',
        end_date: '11-02',
      }
    ];

    // Mock client.fetch returns profile, experiences, projects, featured, and seasonal sequentially for Promise.all
    (client.fetch as unknown as Mock)
      .mockResolvedValueOnce(mockProfile)
      .mockResolvedValueOnce(mockExperiences)
      .mockResolvedValueOnce(mockProjects)
      .mockResolvedValueOnce(mockFeatured)
      .mockResolvedValueOnce(mockSeasonal);

    const { result } = renderHook(() => usePortfolio());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual({
      ...mockProfile,
      experiences: mockExperiences,
      projects: mockProjects,
      featured: mockFeatured,
      seasonalDecorations: mockSeasonal,
    });
  });

  it('should handle fetch errors gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    (client.fetch as unknown as Mock).mockRejectedValueOnce(new Error('Sanity API error'));

    const { result } = renderHook(() => usePortfolio());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
