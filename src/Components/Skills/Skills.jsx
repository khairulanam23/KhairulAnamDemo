import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaPython,
  FaCss3Alt,
  FaCodeBranch,
  FaFire,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const SkillsCarousel = ({ isDarkMode }) => {
  // Added proficiency levels to each skill
  const skills = [
    {
      icon: <FaJs />,
      title: "JavaScript & TypeScript",
      description:
        "Proficient in modern JavaScript and TypeScript, building interactive and dynamic web applications with strong type safety and scalable architecture.",
      proficiency: 90, // Percentage
    },
    {
      icon: <FaReact />,
      title: "React.js",
      description:
        "Experienced in developing responsive and interactive user interfaces using React.js, with expertise in hooks, context API, and state management.",
      proficiency: 85,
    },
    {
      icon: <FaNodeJs />,
      title: "Node.js & Express",
      description:
        "Building robust server-side applications and RESTful APIs using Node.js and Express framework for efficient back-end development.",
      proficiency: 80,
    },
    {
      icon: <FaDatabase />,
      title: "MongoDB & MySQL",
      description:
        "Working with both SQL and NoSQL databases to design efficient data models and implement database operations for web applications.",
      proficiency: 75,
    },
    {
      icon: <FaPython />,
      title: "Python",
      description:
        "Proficient in Python programming for web development with Flask, along with experience in data processing and automation scripts.",
      proficiency: 70,
    },
    {
      icon: <FaCss3Alt />,
      title: "Tailwind CSS",
      description:
        "Creating responsive and modern user interfaces with Tailwind CSS and DaisyUI for efficient and consistent styling across applications.",
      proficiency: 85,
    },
    {
      icon: <FaCodeBranch />,
      title: "Git & Version Control",
      description:
        "Experienced in Git workflow, collaborating with teams using version control best practices for efficient code management.",
      proficiency: 90,
    },
    {
      icon: <FaFire />,
      title: "Firebase",
      description:
        "Implementing authentication, real-time databases, and cloud functions using Firebase for seamless user experiences.",
      proficiency: 75,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef(null);

  // Automatically advance slides every 3.5 seconds
  useEffect(() => {
    const play = () => {
      nextSlide();
    };

    autoPlayRef.current = play;
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoPlayRef.current) {
        autoPlayRef.current();
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + skills.length) % skills.length
    );
  };

  // Get the icon background style
  const getIconStyle = () => {
    return {
      backgroundColor: isDarkMode
        ? "rgba(168, 85, 247, 0.2)"
        : "rgba(34, 197, 94, 0.1)",
      color: isDarkMode ? "var(--primary-color)" : "var(--primary-color)",
    };
  };

  // Navigation button style
  const getNavButtonStyle = () => {
    return {
      backgroundColor: isDarkMode
        ? "var(--primary-dark)"
        : "var(--primary-dark)",
      color: "white",
    };
  };

  // Radial progress bar component
  const RadialProgress = ({ percentage, size = 70, strokeWidth = 6 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const dash = (percentage * circumference) / 100;

    const primaryColor = isDarkMode
      ? "var(--primary-color)"
      : "var(--primary-color)";
    const trackColor = isDarkMode
      ? "rgba(168, 85, 247, 0.2)"
      : "rgba(34, 197, 94, 0.1)";

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="relative rotate-90"
        >
          {/* Background track */}
          <circle
            className="transition-all duration-300"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={trackColor}
            fill="transparent"
          />

          {/* Progress arc */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - dash }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={primaryColor}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
          />
        </svg>

        {/* Percentage text */}
        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center rotate-0"
          style={{ fontSize: size * 0.25 }}
        >
          <span
            className="font-semibold"
            style={{ color: isDarkMode ? "white" : "black" }}
          >
            {percentage}%
          </span>
        </div>
      </div>
    );
  };

  // Get visible indices for the carousel
  const getVisibleIndices = () => {
    return [
      (currentIndex - 2 + skills.length) % skills.length,
      (currentIndex - 1 + skills.length) % skills.length,
      currentIndex,
      (currentIndex + 1) % skills.length,
      (currentIndex + 2) % skills.length,
    ];
  };

  return (
    <section
      style={{
        backgroundColor: isDarkMode ? "var(--bg-color)" : "var(--bg-color)",
        color: isDarkMode ? "var(--text-color)" : "var(--text-color)",
        transition: "background-color 0.5s ease, color 0.5s ease",
      }}
      className="py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            style={{
              color: isDarkMode
                ? "var(--primary-color)"
                : "var(--primary-color)",
            }}
            className="text-4xl font-bold mb-3"
          >
            My Skills
          </h2>
          <p
            style={{
              color: isDarkMode ? "var(--text-color)" : "var(--text-color)",
            }}
            className="text-xl"
          >
            What I bring to the table
          </p>
          <div
            style={{
              backgroundColor: isDarkMode
                ? "var(--primary-color)"
                : "var(--primary-color)",
            }}
            className="w-24 h-1 mx-auto mt-4 rounded"
          ></div>
        </motion.div>

        <div className="relative px-10">
          {/* Carousel container */}
          <div className="overflow-hidden mx-auto" style={{ height: "400px" }}>
            <div className="flex justify-center items-center h-full relative">
              {getVisibleIndices().map((index, positionIndex) => {
                const skill = skills[index];
                // Position from -2 to +2 relative to center
                const position = positionIndex - 2;

                // Calculate styles based on position from center
                const xPos = position * 310; // Card width + gap
                const scale = 1 - 0.1 * Math.abs(position);
                const opacity = 1 - 0.25 * Math.abs(position);
                const zIndex = 10 - Math.abs(position);

                return (
                  <motion.div
                    key={index}
                    className="absolute rounded-lg p-6 shadow-lg border w-full max-w-sm"
                    style={{
                      backgroundColor: isDarkMode ? "var(--bg-color)" : "white",
                      borderColor: isDarkMode
                        ? "rgba(126, 34, 206, 0.3)"
                        : "rgba(21, 128, 61, 0.1)",
                      color: isDarkMode
                        ? "var(--text-color)"
                        : "var(--text-color)",
                      boxShadow:
                        position === 0
                          ? isDarkMode
                            ? "0 10px 25px -5px rgba(126, 34, 206, 0.5)"
                            : "0 10px 25px -5px rgba(21, 128, 61, 0.25)"
                          : "none",
                      zIndex,
                    }}
                    initial={{
                      x: position > 0 ? 1000 : -1000,
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      x: xPos,
                      opacity,
                      scale,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.5,
                    }}
                  >
                    <div className="flex flex-col items-center mb-4">
                      <div
                        className="text-3xl mb-4 inline-flex items-center justify-center p-3 rounded-full"
                        style={getIconStyle()}
                      >
                        {skill.icon}
                      </div>

                      <h3
                        style={{
                          color: isDarkMode
                            ? "var(--primary-light)"
                            : "var(--primary-dark)",
                        }}
                        className="text-xl font-semibold mb-3 text-center"
                      >
                        {skill.title}
                      </h3>
                    </div>

                    {/* Radial progress indicator */}
                    <div className="flex justify-center my-4">
                      <RadialProgress percentage={skill.proficiency} />
                    </div>

                    <p
                      style={{
                        color: isDarkMode
                          ? "var(--font-color)"
                          : "var(--font-color)",
                      }}
                      className="text-justify mt-3"
                    >
                      {skill.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-20 transition-all hover:scale-110"
            style={getNavButtonStyle()}
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-lg" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-20 transition-all hover:scale-110"
            style={getNavButtonStyle()}
            aria-label="Next slide"
          >
            <FaChevronRight className="text-lg" />
          </button>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center mt-8">
          {skills.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
              }}
              style={{
                backgroundColor:
                  currentIndex === index
                    ? isDarkMode
                      ? "var(--primary-color)"
                      : "var(--primary-color)"
                    : isDarkMode
                    ? "rgba(168, 85, 247, 0.3)"
                    : "rgba(34, 197, 94, 0.3)",
              }}
              className="w-3 h-3 rounded-full mx-1 transition-colors duration-300"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsCarousel;
