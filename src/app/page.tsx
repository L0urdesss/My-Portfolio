"use client";

import { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { CiLink } from "react-icons/ci";
import emailjs from '@emailjs/browser';
import { Snackbar, Alert } from '@mui/material';
import Image from 'next/image';
import { FaHtml5, FaCss3Alt, FaNodeJs, FaReact, FaLaravel, FaPython, FaGitAlt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiTypescript, SiMysql, SiInertia } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoVercel } from "react-icons/io5";
import { IoIosSchool } from "react-icons/io"; // Add this import
import { FaBuildingUser } from "react-icons/fa6"; // Add this import


// Custom hook to observe sections
const useSectionObserver = (setActiveNav: (id: string) => void) => {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [setActiveNav]);
};

// Header Component
const Header = ({
  activeNav,
  handleNavClick,
  darkMode,
  toggleDarkMode,
}: {
  activeNav: string;
  handleNavClick: (navItem: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 ${
        darkMode ? "bg-[#18191a] text-white" : "bg-white text-brown-800"
      } p-4`}
    >
      <div className="w-full md:w-3/4 max-w-5xl mx-auto flex justify-between items-center">
        <nav className="flex-1 flex justify-center">
          <ul className="flex space-x-2 md:space-x-5 items-center">
            {["home", "about", "education", "projects", "skills", "contact"].map((navItem) => (
              <li key={navItem}>
                <a
                  href={`#${navItem}`}
                  className={`text-[8px] md:text-[10px] hover:text-brown-600 transition-all duration-300 ${
                    activeNav === navItem
                      ? `border-b-1 ${
                          darkMode ? "border-white text-white" : "border-[#18191a] text-brown-600"
                        }`
                      : "border-b-1 border-transparent text-gray-500"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(navItem);
                  }}
                >
                  {navItem.charAt(0).toUpperCase() + navItem.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="p-1 transition"
          >
            {darkMode ? (
              <MdOutlineLightMode className="w-4 h-4" />
            ) : (
              <MdOutlineDarkMode className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default function Home() {
  const [activeNav, setActiveNav] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [highlight, setHighlight] = useState(false);

  useSectionObserver(setActiveNav);

  const handleNavClick = (navItem: string) => {
    document.getElementById(navItem)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // EmailJS Integration
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (form.current) {
    emailjs
      .sendForm('service_r7zbcmr', 'template_23ckq3d', form.current, {
        publicKey: 'NvoEeWkCOqdCVwrhb',
      })
      .then(
        (response) => {
          console.log('SUCCESS!', response);
          setOpenSnackbar(true);
          form.current?.reset();
        },
        (error) => {
          console.error('FAILED...', error);
          alert(`Failed to send: ${error.text || 'Unknown error'}`);
        },
      );
  }
};
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHighlight(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);



  return (
    <div className={`w-full p-4 ${darkMode ? "bg-[#18191a] text-white" : "bg-white text-brown-800"}`}>
      <Header
        activeNav={activeNav}
        handleNavClick={handleNavClick}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <div className="pt-1 md:pt-5">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center">
          <Image
            src="/pic.JPG"
            alt="Maria Lourdes T. Villaruz"
            width={160}
            height={160}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-4 border-2 border-gray-200"
            priority
          />

          <p className="text-sm md:text-md font-semibold text-brown-400">Hello, I&apos;m </p>
          <h6 className="text-4xl md:text-[50px] font-bold text-brown-600">Maria Lourdes T. Villaruz</h6>
          <p className="mt-4 text-xs md:text-xs text-gray-400">
            A dedicated Computer Science professional with a passion for designing and developing innovative, user-centric
            applications.
          </p>
          <p className="text-xs md:text-xs text-gray-400">
            Continuously exploring new technologies to create seamless and efficient digital experiences.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="/RESUME-VILLARUZ.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 md:px-5 md:py-2 ${
                darkMode ? "bg-white text-[#18191a]" : "bg-[#18191a] text-white"
              } text-[8px] md:text-[10px] font-semibold rounded-md hover:bg-brown-700 transition`}
            >
              View Resume
            </a>
            <a
              href="#contact"
              className={`px-4 py-2 md:px-5 md:py-2 border ${
                darkMode ? "border-white text-white" : "border-brown-600 text-brown-600"
              } text-[8px] md:text-[10px] font-semibold rounded-md hover:bg-brown-600`}
            >
              Contact Me
            </a>
          </div>

          <div className="mt-6 flex space-x-4">
            <a
              href="https://github.com/L0urdesss"
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? "text-white" : "text-[#18191a]"} hover:text-brown-700 transition`}
            >
              <FaGithub className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/maria-lourdes-villaruz-62b061329/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? "text-white" : "text-[#18191a]"} hover:text-brown-700 transition`}
            >
              <FaLinkedin className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a
              href="https://t.me/Lou0_0"
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? "text-white" : "text-[#18191a]"} hover:text-brown-700 transition`}
            >
              <FaTelegram className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </section>

        {/* About Section with responsive heading */}
        <section id="about" className="min-h-screen relative overflow-hidden">
          <h2
            ref={aboutRef}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              text-3xl sm:text-5xl md:text-6xl lg:text-[120px] font-bold opacity-10 ${
                aboutInView ? "slide-in" : ""
              }`}
            style={{ color: darkMode ? "#242526" : "#EBEDEF" }}
          >
            About Me
          </h2>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center justify-center gap-8 z-10">
            <div className="text-center md:text-left max-w-lg">
              <p className="mt-4 text-brown-400 font-light text-sm md:text-base">
                &lt; I enjoy exploring new technologies, playing games, and diving into creative projects. Whether it&apos;s coding, discovering new trends, experimenting with tools, or simply learning something new, I love the challenge of{" "}
                <span className={highlight ? "highlight-text" : ""}>continuous growth and innovation</span>. /&gt;
              </p>
            </div>
          </div>
        </section>
<section id="education" className="min-h-screen flex flex-col justify-center items-center">
  <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">

    {/* Education Timeline */}
    <div className="flex-1 rounded-lg p-6 flex flex-col">
      <div className="flex items-center mb-4">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <IoIosSchool className="w-5 h-5" />
          <span className="text-sm">Education</span>
        </h3>
      </div>
      <div className="flex">
        <div className="text-[10px] text-gray-400 font-mono mr-4 w-20">
          2021 - 2025
        </div>
        <div className="relative flex flex-col items-center mr-4 w-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brown-600 border-2 border-white z-10"></span>
          <div className="w-[2px] bg-gray-300 flex-grow min-h-[80px]"></div>
        </div>
        <div className="flex flex-col text-xs text-brown-800 dark:text-white">
          <div className="flex items-start gap-3">
            {/* Added TUP Logo with Circle Border */}
            <div className="flex-shrink-0 rounded-full">
              <img 
                src="/TUP.png" 
                alt="Technological University of the Philippines Logo" 
                className="w-10 h-10 object-cover rounded-full" 
              />
            </div>
            <div>
              <div className="font-semibold mb-1">Technological University of the Philippines</div>
              <div className="text-[10px] text-gray-400">Bachelor of Science in Computer Science</div>
              <div className="text-[10px] text-gray-400">Cum Laude</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Experience Timeline */}
    <div className="flex-1 rounded-lg p-6 flex flex-col">
      <div className="flex items-center mb-4">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <FaBuildingUser className="w-5 h-5" />
          <span className="text-sm">Experience</span>
        </h3>
      </div>

      <div className="flex">
        <div className="text-[10px] text-gray-400 font-mono mr-4 w-20">
          February 2025 - May 2025
        </div>
        
        <div className="relative flex flex-col items-center mr-4 w-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brown-600 border-2 border-white z-10"></span>
          <div className="w-[2px] bg-gray-300 flex-grow min-h-[80px]"></div>
        </div>

        <div className="flex flex-col text-xs text-brown-800 dark:text-white">
          <div className="flex items-start gap-3">
            {/* Enhanced Logo with Circle Border */}
            <div className="flex-shrink-0 rounded-full">
              <img 
                src="/NOAH.png" 
                alt="NOAH Business Applications Logo" 
                className="w-10 h-10 object-cover rounded-full" 
              />
            </div>
            
            <div>
              <div className="font-semibold mb-1">NOAH Business Applications</div>
              <div className="text-[10px] text-gray-400">
                Business Applications Developer Intern
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

    {/* Projects Section */}
<section id="projects" className="min-h-screen flex flex-col justify-center items-center">
  <h2 className="text-3xl md:text-3xl font-bold text-brown-600 mb-8">Projects</h2>
  <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {[
      {
        title: "TUP Corner (IRS Version 1)",
        description:
          "TUP Corner is an Information Retrieval System that allows users to upload, browse, and search undergraduate research papers at TUP Manila through a simple and user-friendly interface.",
        github: "https://github.com/Aquiee/Laravel-React-IRS.git",
        badges: ["React", "Tailwind CSS", "Laravel", "Inertia"],
      },
      {
        title: "TUPScholarly (IRS Version 2)",
        description:
          "TUPScholarly is an Information Retrieval System for managing undergraduate research papers at TUP Manila, featuring automatic tagging, metadata extraction, and an intuitive search interface.",
        github: "https://github.com/L0urdesss/TUPScholarly.git",
        badges: ["React", "Tailwind CSS", "Python", "Laravel", "Inertia"],
      },
      {
        title: "KenKen Puzzle Game & Solver",
        description:
          "A Python-based game implementation of the popular KenKen puzzle. KenKen, also known as KenDoku or MathDoku, is a mathematical puzzle game that requires both arithmetic and logical thinking to solve.",
        github: "https://github.com/L0urdesss/KenKen-Puzzle.git",
        badges: ["Python"],
      },
      {
        title: "Mabaya - Flower Object Detection App",
        description:
          "Mabaya is a mobile application developed in Java (Android Studio) that uses a YOLOv5 model (converted into TensorFlow Lite) to detect and recognize 5 types of flowers.",
        github: "https://github.com/L0urdesss/Mabaya.git",
        badges: ["Java"],
      },
      {
        title: "Votify - Voting System using Plurality Algorithm",
        description:
          "A simple web-based voting system built with HTML/CSS for the frontend and PHP for the backend. The system uses the Plurality Algorithm to count votes.",
        github: "https://github.com/L0urdesss/Votify---Voting-System-using-Plurality-Algorithm.git",
        badges: ["HTML", "CSS", "PHP"],
      },
      {
        title: "Arithmetic Practice Game in C (with Countdown Timer)",
        description:
          "This project is a C-based interactive math quiz game using arrays of structures, enhanced with a countdown timer per question for added challenge and engagement.",
        github: "https://github.com/L0urdesss/Arithmetic-Practice-Game-in-C-with-Countdown-Timer.git",
        badges: ["C"],
      },
      
      // Add up to 9 projects if needed for a full 3x3 grid
    ].map((project) => (
      <div
        key={project.title}
        className={`
          flex flex-col rounded-xl pt-6 pb-2 px-6 w-full min-h-[190px] transition
          ${darkMode ? "text-white hover:bg-[#292929]" : "text-brown-800 hover:bg-[#f2f2f2]"}
          duration-300
          bg-transparent
          cursor-pointer
        `}
        style={{ boxShadow: "none", border: "none" }}
      >
        <div>
          <h3 className="text-xs font-bold mb-2">{project.title}</h3>
          {/* Description area as flex column */}
          <div className="flex flex-col min-h-[120px] relative">
            <p className="text-xs font-light">
              {project.description}
            </p>
            {/* Badges */}
            <div className="flex flex-wrap gap-1 mt-2">
              {project.badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-block px-2 py-0.5 font-semibold rounded-full"
                  style={{
                    fontSize: "7px", // Reduced from 8px to 7px
                    backgroundColor: darkMode ? "#f0f0f0" : "#141414",
                    color: darkMode ? "#18191a" : "#fff",
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
            {/* View Github link at bottom right inside description */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-normal text-brown-600 hover:text-brown-700 transition bg-transparent border-none shadow-none p-0 m-0"
              style={{
                textDecoration: "none",
                boxShadow: "none",
                border: "none",
                background: "none",
                position: "absolute",
                right: 0,
                bottom: 0,
              }}
            >
              <CiLink className="w-3 h-3" />
              View Github
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex flex-col justify-center items-center">
          <h2 className="text-xl md:text-2xl font-bold text-brown-600 mb-6">Technologies I Use</h2>
          <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: "HTML", icon: FaHtml5 },
              { name: "CSS", icon: FaCss3Alt },
              { name: "JavaScript", icon: IoLogoJavascript },
              { name: "TypeScript", icon: SiTypescript },
              { name: "NodeJS", icon: FaNodeJs },
              { name: "React", icon: FaReact },
              { name: "Tailwind", icon: RiTailwindCssFill },
              { name: "Laravel", icon: FaLaravel },
              { name: "Python", icon: FaPython },
              { name: "MySQL", icon: SiMysql },
              { name: "Git", icon: FaGitAlt },
              { name: "GitHub", icon: FaGithub },
              { name: "Vercel", icon: IoLogoVercel },
              { name: "Inertia", icon: SiInertia },
            ].map((skill) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={skill.name}
                  className={`
                    flex flex-row items-center justify-between rounded-lg
                    p-4 min-h-[60px] transition
                    ${darkMode ? "bg-[#242526] text-white" : "bg-white text-brown-800"}
                    hover:scale-105 duration-200
                  `}
                  style={{
                    border: darkMode ? "1px solid #333" : "1px solid #e5e7eb",
                  }}
                >
                  <IconComponent
                    className="w-6 h-6"
                    style={{
                      color: darkMode ? "#f0f0f0" : "#18191a",
                      transition: "color 0.2s"
                    }}
                  />
                  <span className="text-xs font-semibold">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex flex-col justify-center items-center py-8 ">
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Map Image and Text */}
            <div className="w-full md:w-1/2 flex flex-col items-start text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-brown-600">Contact Me</h2>
              <p className="mt-4 text-sm font-light text-brown-400">
                I&apos;m always open to new opportunities, collaborations, or just a friendly chat.  
                Feel free to reach out, and I&apos;ll get back to you as soon as I can!
              </p>
              <div className="mt-4 text-xs font-extralight text-brown-400 flex gap-4">
                <p>villaruzmarialourdes8@gmail.com</p>
                <p>(+63) 935 273 2945</p>
              </div>
              <div className="mt-4 w-full">
                <Image
                  src={darkMode ? "/map2.png" : "/map1.png"}
                  alt="Map"
                  width={600}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
            {/* Contact Form */}
            <div className={`w-full md:w-2/5 ${darkMode ? "bg-[#242526] text-white" : "bg-white text-brown-800"} p-4 md:p-6 rounded-lg shadow-lg`}>
              <form 
  ref={form} 
  onSubmit={sendEmail}
  className="space-y-4 p-2"
>
                <div>
                  <label htmlFor="user_name" className="block text-xs font-light text-brown-800">Name</label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    placeholder="Your Name"
                    className={`mt-1 block w-full px-3 py-1.5 border text-[10px] ${
                      darkMode ? "border-white" : "border-brown-600"
                    } rounded-md ${
                      darkMode ? "bg-[#242526] text-white" : "bg-white text-brown-800"
                    } focus:ring-brown-600 focus:border-brown-600 focus:shadow-none transition`}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="user_email" className="block text-xs font-light text-brown-800">Email</label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    placeholder="your.email@example.com"
                    className={`mt-1 block w-full px-3 py-1.5 border text-[10px] ${
                      darkMode ? "border-white" : "border-brown-600"
                    } rounded-md ${
                      darkMode ? "bg-[#242526] text-white" : "bg-white text-brown-800"
                    } focus:ring-brown-600 focus:border-brown-600 focus:shadow-none transition`}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-light text-brown-800">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Your message..."
                    className={`mt-1 block w-full px-3 py-1.5 border text-[10px] ${
                      darkMode ? "border-white placeholder-brown-400" : "border-brown-600"
                    } rounded-md ${
                      darkMode ? "bg-[#242526] text-white" : "bg-white text-brown-800"
                    } focus:ring-brown-600 focus:border-brown-600 focus:shadow-none transition`}
                    required
                  ></textarea>
                </div>
                 <div className="text-center text-xs">
    <button
      type="submit"
      className={`w-full md:w-3/4 px-4 py-2 mt-2 ${
        darkMode ? "bg-white text-[#18191a]" : "bg-[#18191a] text-white"
      } font-semibold rounded-md hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-600 transition`}
    >
      Send Message
    </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Snackbar for success message */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Message sent successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}