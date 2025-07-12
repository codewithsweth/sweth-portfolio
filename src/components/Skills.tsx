
import { useEffect, useRef, useState } from 'react';
import Section from './Section';
import SkillItem from './SkillItem';
import { 
  Code2, 
  Database, 
  Layers, 
  LayoutGrid, 
  Server, 
  FileCode2,
  Atom,
  Terminal,
  GitBranch,
  Cpu
} from 'lucide-react';

const Skills = () => {
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
  
  const frontendSkills = [
    { name: "React", icon: <Atom size={20} />, level: 90 },
    { name: "TypeScript", icon: <FileCode2 size={20} />, level: 85 },
    { name: "CSS/SCSS", icon: <LayoutGrid size={20} />, level: 90 },
    { name: "Next.js", icon: <Code2 size={20} />, level: 80 },
  ];
  
  const backendSkills = [
    { name: "Node.js", icon: <Server size={20} />, level: 85 },
    { name: "Express", icon: <Terminal size={20} />, level: 80 },
    { name: "MongoDB", icon: <Database size={20} />, level: 75 },
    { name: "GraphQL", icon: <Layers size={20} />, level: 70 },
  ];
  
  const otherSkills = [
    { name: "Git/GitHub", icon: <GitBranch size={20} />, level: 90 },
    { name: "Docker", icon: <Cpu size={20} />, level: 75 },
    { name: "CI/CD", icon: <Terminal size={20} />, level: 80 },
    { name: "AWS", icon: <Server size={20} />, level: 65 },
  ];
  
  return (
    <Section
      id="skills"
      title="Technical Skills"
      subtitle="Technologies and tools I work with."
    >
      <div ref={sectionRef}>
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Frontend Development</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {frontendSkills.map((skill, index) => (
              <SkillItem
                key={skill.name}
                {...skill}
                isVisible={isVisible}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Backend Development</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {backendSkills.map((skill, index) => (
              <SkillItem
                key={skill.name}
                {...skill}
                isVisible={isVisible}
                delay={400 + index * 100}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-6">Other Skills</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherSkills.map((skill, index) => (
              <SkillItem
                key={skill.name}
                {...skill}
                isVisible={isVisible}
                delay={800 + index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Skills;
