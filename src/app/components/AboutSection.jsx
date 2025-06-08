"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="pl-2">
        <li>Node.js</li>
        <li>Express</li>
        <li>Sequelize</li>
        <li>React</li>
        <li>JavaScript/TypeScript</li>
        <li>Java</li>
        <li>Spring Boot</li>
        <li>Hibernate</li>
        <li>SQL and NoSQL</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="pl-2">
        <li>Fullstack Development EBAC</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="pl-2">
        <li>Advanced Node.js</li>
        <li>Fundamentals of Next.js</li>
        <li>Advanced Mobile Programming</li>
        <li>Computational Thinking</li>
        <li>Advanced JavaScript</li>
        <li>Artificial Intelligence from A to Z</li>
        <li>IT from Zero to Pro </li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white flex justify-center items-center min-h-screen py-8 px-4" id="about">
      <div className="max-w-4xl w-full">
        <div className="mt-4 md:mt-0 text-center flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg text-center">
            I am a Full Stack Developer committed to building modern, responsive applications that 
            prioritize an exceptional user experience. My goal is to deliver scalable, secure solutions 
            aligned with client needs, always combining technology with a strong focus on the user.

            On the frontend, I work with modern frameworks like Vue.js and React to ensure intuitive, 
            responsive, and high-performance interfaces.

            For the backend, I develop well-structured APIs and microservices using Node.js and Java, 
            integrating both relational and NoSQL databases. I have experience with JPA and ORMs, which 
            help maintain data consistency and security, in addition to applying good practices in event-driven architecture.
          </p>
          <div className="flex flex-row justify-center mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;