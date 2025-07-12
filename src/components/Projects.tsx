
import { useEffect, useRef, useState } from 'react';
import Section from './Section';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce platform with React, Node.js, and Stripe integration.",
      image: "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=3271&auto=format&fit=crop",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      githubLink: "#",
      liveLink: "#",
    },
    {
      title: "Task Management App",
      description: "A comprehensive task management app with drag-and-drop functionality.",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=3271&auto=format&fit=crop",
      tags: ["TypeScript", "React", "Firebase", "Tailwind CSS"],
      githubLink: "#",
      liveLink: "#",
    },
    {
      title: "Weather Dashboard",
      description: "A real-time weather dashboard with interactive maps and forecasts.",
      image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=3270&auto=format&fit=crop",
      tags: ["JavaScript", "APIs", "Chart.js", "Geolocation"],
      githubLink: "#",
      liveLink: "#",
    },
    {
      title: "Social Network App",
      description: "A full-featured social network with real-time chat and notifications.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=3270&auto=format&fit=crop",
      tags: ["React", "GraphQL", "Socket.io", "AWS"],
      githubLink: "#",
      liveLink: "#",
    },
  ];
  
  return (
    <Section
      id="projects"
      title="My Projects"
      subtitle="A collection of projects I've worked on, showcasing my skills and experience."
    >
      <div 
        ref={sectionRef} 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-6 lg:gap-8"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className={`transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
