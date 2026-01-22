import { GitHub, LinkedIn } from "lucide-react";

export const details = {
  first_name: "Tyron",
  middle_name: "Panti",
  last_name: "Bechayda",
  role: "Full Stack Web Developer",
  email: "tyronbechayda1112@gmail.com",
  phone: "09205662597",
  about: `Currently pursuing a Bachelor of Science in Information Technology at the 
          Polytechnic University of the Philippines. A passionate Full Stack Web Developer 
          with knowledge in building dynamic and scalable web applications. Currently exploring 
          the realms of React and frontend design for enhanced user experiences.`,

  socials: [
    {
      id: 1,
      name: "github",
      url: "https://github.com/TyronBech",
      icon: GitHub,
    },
    {
      id: 2,
      name: "linkedin",
      url: "https://www.linkedin.com/in/tyronbechayda1112",
      icon: LinkedIn,
    }
  ],

  school: {
    name: "Polytechnic University of the Philippines",
    branch: "Taguig City",
    degree: "Bachelor of Science in Information Technology",
    start_year: 2022,
    graduation_year: 2026,
  },

  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "Tailwind CSS",
    "React",
    "Php",
    "Laravel",
    "C",
    "C++",
    "Java",
    "Python",
    "MySQL",
  ],

  experiences: [
    {
      id: 1,
      company: "Polytechnic University of the Philippines",
      role: "Full Stack Web Developer",
      description: `Developed Laravel-based web application for Library Management System,
                    using RFID and Barcode technologies to streamline students' activities and book management inside the library.
                    Utilizing PHP Laravel for backend development, MySQL for database management, and frontend framework like Tailwind CSS for styling.`,
      start_year: 2023,
      end_year: null,
    },
    {
      id: 2,
      company: "iEMINENCE, Inc.",
      role: "Full Stack Web Developer Intern",
      description: `Contributed to the developement of web application for a parmapharmaceutical company.
                    Implementing responsive UI forms, proper data validation, and seamless user experience.`,
      start_year: "October 2025",
      end_year: "January 2026",
    },
  ],
}