"use client"; // Required for Next.js client-side rendering

import { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import emailjs from '@emailjs/browser';
import { Snackbar, Alert } from '@mui/material';
import Image from 'next/image';

// Custom hook to observe sections
const useSectionObserver = (setActiveNav: (id: string) => void) => {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // Adjust this value for smoother transitions
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
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full md:w-3/4 z-50 ${
        darkMode ? "bg-[#18191a] text-white" : "bg-white text-brown-800"
      } p-4 flex justify-between items-center`}
    >
      {/* Navigation Links */}
      <nav className="flex-1 flex justify-center">
        <ul className="flex space-x-2 md:space-x-5 items-center">
          {["home", "about", "skills", "projects", "contact"].map((navItem) => (
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
                  e.preventDefault(); // Prevent default anchor behavior
                  handleNavClick(navItem); // Handle smooth scroll
                }}
              >
                {navItem.charAt(0).toUpperCase() + navItem.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Dark Mode Toggle Button */}
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
    </header>
  );
};

export default function Home() {
  const [activeNav, setActiveNav] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [highlight, setHighlight] = useState(false); // State for highlight effect

  // Use the custom hook to observe sections
  useSectionObserver(setActiveNav);

  const handleNavClick = (navItem: string) => {
    document.getElementById(navItem)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Use useInView for the About section animation
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.5, // Trigger when 50% of the section is visible
  });

  // EmailJS Integration
  const form = useRef<HTMLFormElement>(null); // Explicitly type the ref

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm('service_r7zbcmr', 'template_23ckq3d', form.current, {
          publicKey: 'NvoEeWkCOqdCVwrhb',
        })
        .then(
          () => {
            console.log('SUCCESS!');
            setOpenSnackbar(true); // Open Snackbar on success
            form.current?.reset(); // Reset the form fields
          },
          (error) => {
            console.log('FAILED...', error.text);
            alert('Failed to send message. Please try again.'); // Optional: Show error message
          },
        );
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Trigger the highlight effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setHighlight(true);
    }, 500); // Delay before highlighting

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

      {/* Add padding-top to compensate for fixed header */}
      <div className="pt-1 md:pt-5">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center">
          {/* Add the round image here */}
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

          {/* Add the buttons here */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="/RESUME - VILLARUZ.pdf"
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

          {/* Add the GitHub icon below the buttons */}
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

 <section id="about" className="min-h-screen relative overflow-hidden">
  {/* Background Text "About Me" */}
  <h2
  ref={aboutRef}
  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl md:text-[120px] font-bold opacity-10 ${
    aboutInView ? "slide-in" : ""
  }`}
  style={{ color: darkMode ? "#242526" : "#EBEDEF" }} // Change color based on darkMode state
>
  About Me
</h2>
  {/* Content Section */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center justify-center gap-8 z-10">
    {/* Text Section */}
    <div className="text-center md:text-left max-w-lg">
      {/* Paragraph */}
      <p className="mt-4 text-brown-400 font-light text-sm md:text-base">
        &lt; I enjoy exploring new technologies, playing games, and diving into creative projects. Whether it&apos;s coding, discovering new trends, experimenting with tools, or simply learning something new, I love the challenge of{" "}
        <span className={highlight ? "highlight-text" : ""}>continuous growth and innovation</span>. /&gt;
      </p>
    </div>
  </div>
</section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex flex-col justify-center items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brown-600">Skills</h2>
          <p className="mt-4 text-base md:text-lg text-brown-800">This is the skills section.</p>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex flex-col justify-center items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brown-600">Projects</h2>
          <p className="mt-4 text-base md:text-lg text-brown-800">This is the projects section.</p>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex flex-col justify-center items-center py-8 ">
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8">
{/* Map Image and Text */}
<div className="w-full md:w-1/2 flex flex-col items-start text-left"> {/* Updated classes */}
  <h2 className="text-3xl md:text-4xl font-bold text-brown-600">Contact Me</h2>
  {/* Add space between heading and paragraph */}
  <p className="mt-4 text-sm font-light text-brown-400"> {/* Increased margin-top */}
    I&apos;m always open to new opportunities, collaborations, or just a friendly chat.  
    Feel free to reach out, and I&apos;ll get back to you as soon as I can!
  </p>
  {/* Add space between paragraph and email/phone number */}
  <div className="mt-4 text-xs font-extralight text-brown-400 flex gap-4"> {/* Increased margin-top */}
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
  <form ref={form} onSubmit={sendEmail} className="space-y-4 p-2">
    {/* Name Field */}
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

    {/* Email Field */}
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

    {/* Message Field */}
    <div>
      <label htmlFor="message" className="block text-xs font-light text-brown-800">Message</label>
      <textarea
        id="message"
        name="message"
        rows={3}
        placeholder="Your message..."
        className={`mt-1 block w-full px-3 py-1.5 border text-[10px] ${
          darkMode ? "border-white" : "border-brown-600"
        } rounded-md ${
          darkMode ? "bg-[#242526] text-white" : "bg-white text-brown-800"
        } focus:ring-brown-600 focus:border-brown-600 focus:shadow-none transition`}
        required
      ></textarea>
    </div>

    {/* Submit Button */}
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