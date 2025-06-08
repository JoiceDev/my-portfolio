"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
// import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Efood",
    description: "Development of a TSX application with React and TypeScript, dynamic styling with Styled Components, state management with Redux Toolkit and RTK Query, code maintenance with ESLint and Prettier, and a focus on responsive design and user experience, including modal integration and real-time cart updates.",
    image: "/images/projects/efood.png",
    gitUrl: "https://github.com/JoiceDev/proj-efood",
    previewUrl: "https://proj-efood.vercel.app/",
  },
  {
    id: 2,
    title: "Tasty Bistrô Website",
    description: "Responsive website developed with Bootstrap, featuring navigation, an image carousel, tabs, a contact form, and social media integration. This project leverages Bootstrap's grid system, jQuery, and its classes and plugins.",
    image: "/images/projects/tasty-bistro.png",
    gitUrl: "https://github.com/JoiceDev/tasty-bistro-bs",
    previewUrl: "https://tasty-bistro-bs.vercel.app/",
    // OU se não tiver os links ainda:
    // gitUrl: null,
    // previewUrl: null,
  },
  {
    id: 3,
    title: "Harry Potter Landing Page",
    description: "Harry Potter Landing Page, an immersive web application for fans of the series, featuring functionalities such as the Sorting Hat, an image carousel, and API integration. It utilizes JavaScript for interactivity and SASS for style optimization.",
    image: "/images/projects/harry-landing.png",
    gitUrl: "https://github.com/JoiceDev/HarryPotterPage",
    previewUrl: "https://joices-harry-potter-page.vercel.app/", 
  },
  {
    id: 4,
    title: "Disney+ Clone",
    description: "A Disney+ inspired web page, featuring SASS for styling and JavaScript for interactivity. Task automation was performed using Gulp, incorporating packages such as gulp-sass, gulp-imagemin, and gulp-uglify, thus optimizing the build process, including the processing of styles, scripts, and images.",
    image: "/images/projects/clone-disney.png",
    gitUrl: "https://github.com/JoiceDev/clone_disneyplus",
    previewUrl: "https://clone-disneyplus-byjoicedev-qqj9sp2c2-joices-projects-fd57fa26.vercel.app/",
  },
  {
    id: 5,
    title: "React Contact List",
    description: "App developed with React and Redux Toolkit to manage a contact list, allowing users to add, edit, and remove information such as name, email, and phone number. The project features reusable components and global state management with Redux, providing an interactive and efficient user experience.",
    image: "/images/projects/contact-list.png",
    gitUrl: "https://github.com/JoiceDev/TaskListReact", 
    previewUrl: "https://task-list-react-rho.vercel.app/", 
  },
  {
    id: 6,
    title: "Java Swing Client Registry",
    description: "Customer registration system with graphical user interface, developed in Java using Java Swing in the NetBeans Apache IDE. The application allows users to save, edit, and delete customer records, applying object-oriented programming concepts, event handling, and data manipulation for desktop application development.",
    image: "/images/projects/6.png",
    gitUrl: "https://github.com/JoiceDev/cadastro-cliente-java",
    previewUrl: "null",
  },
];

const ProjectsSection = () => {
  // const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // const handleTagChange = (newTag) => {
  //   setTag(newTag);
  // };

  // const filteredProjects = projectsData.filter((project) =>
  //   project.tag.includes(tag)
  // );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      {/* 
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div> 
      */}
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {projectsData.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
