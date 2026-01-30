import CPU from "@/assets/images/CPU.png";
import Games from "@/assets/images/Games.png";
import Shapes from "@/assets/images/Shapes.png";

export const details = {
  first_name: "Tyron",
  middle_name: "Panti",
  last_name: "Bechayda",
  role: "Full Stack Web/Software Developer",
  email: "tyronbechayda1112@gmail.com",
  phone: "09205662597",
  message: "Hi! I am Tyron Bechayda - a passionate Full Stack Web/Software Developer creating a seamless and scalable solutions for modern web applications.",
  about: `Currently pursuing a Bachelor of Science in Information Technology at the 
          Polytechnic University of the Philippines. A passionate Full Stack Web/Software Developer 
          with knowledge in building dynamic and scalable applications. Currently exploring 
          the realms of React and frontend design for enhanced user experiences.`,

  address: {
    city: "Taguig City",
    country: "Philippines",
  },

  status: "Available for work",

  socials: [
    {
      id: 1,
      name: "GitHub",
      url: "https://github.com/TyronBech",
      icon: null,
    },
    {
      id: 2,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/tyronbechayda1112",
      icon:  null,
    },
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
    "PHP",
    "Laravel",
    "C",
    "C++",
    "Java",
    "Python",
    "Git",
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
      start_year: "September 2024",
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
    {
      id: 3,
      company: "Bicutan Parochial School, Inc.",
      role: "Web Developer",
      description: `Contributed to the development of the school's official website.
                    Implemented responsive design, interactive features, and optimized performance for better user experience. 
                    Utilized WordPress for content management and frontend development.`,
      start_year: "July 2025",
      end_year: null,
    },
  ],

  projects: [
    {
      id: 1,
      name: "CPU Process Scheduler",
      description: `A desktop application that simulates various CPU scheduling algorithms
                    such as FCFS, SJF, Priority Scheduling, and Round Robin. 
                    Built using Java Swing for the user interface and Java for backend logic.`,
      technologies: ["C++", "Visual Studio"],
      repository: "https://github.com/TyronBech/Process-Scheduling-Programs",
      type: "CLI Application",
      year: 2024,
      image: CPU,
    },
    {
      id: 2,
      name: "Python Mini Games",
      description: `Composed of 2 mini games developed using Python's tkinter library.
                    Includes games like Rock-Paper-Scissors and tick-tack-toe with interactive graphics.`,
      technologies: ["Python", "tkinter", "Visual Studio Code"],
      repository: "https://github.com/TyronBech/Py_Games",
      type: "Desktop Application",
      year: 2023,
      image: Games,
    },
    {
      id: 3,
      name: "Shape Calculator",
      description: `A GUI-based application that calculates area of various 2-dimensional shapes.
                    Built using Java Swing for the user interface and Java for backend logic.`,
      technologies: ["Java", "Java Swing", "Eclipse IDE"],
      repository: "https://github.com/TyronBech/Shape_Calculator",
      type: "Desktop Application",
      year: 2024,
      image: Shapes,
    }
  ],
}