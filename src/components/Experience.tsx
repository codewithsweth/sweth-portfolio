
import { useEffect, useRef, useState } from 'react';
import Section from './Section';
import TimelineItem from './TimelineItem';

const Experience = () => {
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
  
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      date: "Jan 2021 - Present",
      description: "Lead the development of complex SPA applications using React and TypeScript. Implemented CI/CD pipelines and mentored junior developers."
    },
    {
      title: "Full Stack Developer",
      company: "InnoSoft",
      date: "Mar 2018 - Dec 2020",
      description: "Developed and maintained web applications using React, Node.js, and MongoDB. Collaborated with UX/UI designers to implement responsive designs."
    },
    {
      title: "Junior Web Developer",
      company: "WebSolutions",
      date: "Jun 2016 - Feb 2018",
      description: "Built responsive websites using HTML, CSS, and JavaScript. Worked with PHP and MySQL for backend functionality."
    },
    {
      title: "Freelance Developer",
      company: "Self-employed",
      date: "Jan 2015 - May 2016",
      description: "Designed and developed websites for small businesses and startups. Managed client relationships and project timelines."
    }
  ];
  
  return (
    <Section
      id="experience"
      title="Work Experience"
      subtitle="My professional journey and career highlights."
      className="bg-secondary/30"
    >
      <div ref={sectionRef} className="max-w-3xl mx-auto mt-12">
        {experiences.map((exp, index) => (
          <TimelineItem
            key={index}
            {...exp}
            isLast={index === experiences.length - 1}
            isVisible={isVisible}
            delay={index * 200}
          />
        ))}
      </div>
    </Section>
  );
};

export default Experience;
