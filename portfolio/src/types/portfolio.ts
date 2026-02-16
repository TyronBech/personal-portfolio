import type { SanityImageSource } from "@sanity/image-url";

export interface Social {
  name: string;
  url: string;
}

export interface Address {
  city: string;
  country: string;
}

export interface Statuses {
  work: boolean;
  projects: boolean;
}

export interface School {
  name: string;
  branch: string;
  degree: string;
  start_year: number;
  graduation_year: number;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  description: string;
  start_year: string;
  end_year: string | null;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  repository: string;
  type: string;
  year: number;
  project_image: SanityImageSource;
}

export interface PortfolioData {
  first_name: string;
  middle_name: string;
  last_name: string;
  role: string;
  email: string;
  phone: string;
  message: string;
  about: string;
  profile_image: SanityImageSource;
  about_image: SanityImageSource;
  about_image_alt: string;
  experience_image: SanityImageSource;
  experience_image_alt: string;
  address: Address;
  statuses: Statuses;
  socials: Social[];
  school: School;
  skills: string[];
  experiences: Experience[];
  projects: Project[];
}
