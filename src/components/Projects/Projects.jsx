import React from "react";
import "./Projects.scss";

const PROJECTS = [
  {
  title: "GSAP Portfolio — React + GSAP",
  desc: "Designed and built a high-performance animated portfolio using React and GSAP. Implemented ScrollTrigger-based section pinning, scrubbed timelines, parallax/zoom effects, and smooth anchor navigation. Built reusable motion patterns, responsive layouts, and optimized rendering with will-change, transform-based animations, and cleanup-safe GSAP hooks for consistent behavior across refresh/resize.",
  image: "src/assets/images/common/portfolio-image.png",
  tags: ["React", "GSAP", "ScrollTrigger", "SCSS", "Vite"],
  links: [
    { label: "Live Demo", href: "https://sisvanth-gsap-portfolio.vercel.app/", icon: "↗" },
    { label: "Source Code", href: "https://github.com/SisvanthkumarS/GSAP-Portfolio", icon: "⌂" },
  ]
}
,
  {
    title: "Real-Time Chat Application",
    desc: "Developed a real-time chat application using the MERN stack, Socket.io, and Redux Toolkit. Implemented instant messaging, JWT authentication, group chats, online user tracking, and responsive design. Integrated secure backend APIs and MongoDB to deliver seamless communication and an engaging user experience.",
    image: "src/assets/images/common/chatbot-cover.png",
   tags: ["MERN", "Socket.io", "Redux Toolkit", "Socket.io", "JWT"],
    links: [
      { label: "Live Demo", href: "https://github.com/MrSAGARSINGH/realtime-chat-app", icon: "↗" },
      { label: "Source Code", href: "https://github.com/MrSAGARSINGH/realtime-chat-app", icon: "⌂" },
    ],
  },

   {
    title: "JWT Authentication System",
    desc: "Built Developed a secure full-stack authentication system using JWT (JSON Web Tokens). Implemented user registration, login, protected routes, password hashing, and token-based authorization. Built responsive frontend interfaces and integrated REST APIs to ensure secure user access and session management.a pipeline that captures bypass payloads, logs attack metadata to DynamoDB, archives raw payloads in S3, and visualizes attack trends through a Streamlit dashboard deployed on EC2. Collaborated with a team to design detection layers, scoring heuristics.",
    image: "src/assets/images/common/LLM-senti.png",
    tags: ["JWT", "React", "S3", "EC2", "Express", "MongoDB", "Node.js"],
    links: [
      { label: "Source Code", href: "https://github.com/MrSAGARSINGH/jwt-auth-assignment", icon: "⌂" }
    ]
  },
  {
    title: "MERN E-Commerce Platform",
    desc: "Engineered a full-stack MERN e-commerce platform with secure JWT authentication, dynamic product management, shopping cart functionality, and streamlined order processing. Designed responsive and intuitive user interfaces, integrated RESTful APIs, and optimized MongoDB database performance. Implemented scalable architecture and efficient data handling to ensure a seamless shopping experience, enhanced security, and reliable application performance across multiple user interactions.",
    image: "src/assets/images/common/mern-ecommerce.jpg",
    tags: [ "React.js", "Node.js", "Express.js", "MongoDB", "MERN"],
    links: [
      { label: "Source Code", href: "https://github.com/MrSAGARSINGH/-MERN-E-Commerce-App", icon: "⌂" }
    ]
  },

];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      {/* Header like your Certifications screenshot */}
      <div className="sectionHeader">
        <p className="sectionKicker">04. PROJECTS</p>
        <h2 className="sectionTitle">PROJECTS </h2>
        <p className="sectionSub">
          A selection of builds that showcase frontend motion craft and cloud-first architecture.
        </p>
      </div>

      {/* Cards like your first screenshot */}
      <div className="projectsGrid">
        {PROJECTS.map((p) => (
          <article className="projectCard" key={p.title}>
            <div className="projectMedia">
              <img src={p.image} alt={p.title} loading="lazy" />
              <div className="projectMediaOverlay" />
            </div>

            <div className="projectBody">
              <h3 className="projectTitle">{p.title}</h3>
              <p className="projectDesc">{p.desc}</p>

              <div className="projectTags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="projectFooter">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    className="projectLink"
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="icon">{l.icon}</span>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}