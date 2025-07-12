
import { useEffect, useRef, useState } from 'react';
import Section from './Section';
import Button from './Button';
import { FileDown, Github, Linkedin, Mail } from 'lucide-react';

const About = () => {
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
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <Section
      id="about"
      className="bg-secondary/30"
      contentClassName="max-w-7xl mx-auto"
    >
      <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-[-20px]'}`}>
          <div className="rounded-2xl overflow-hidden aspect-square max-w-md mx-auto lg:ml-0 shadow-xl">
            <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary/20 flex items-center justify-center text-white text-8xl font-bold">
              JP
            </div>
          </div>
        </div>
        
        <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-[20px]'}`}>
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          
          <p className="text-lg">
            I'm a Full Stack Developer with 5+ years of experience in building web applications. 
            My expertise includes React, Node.js, and modern web technologies. I'm passionate 
            about creating clean, efficient, and user-friendly solutions.
          </p>
          
          <p className="text-lg">
            When I'm not coding, you can find me exploring new technologies, 
            contributing to open source projects, or enjoying outdoor activities.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button icon={<FileDown size={18} />}>
              Download CV
            </Button>
            
            <Button variant="outline" icon={<Github size={18} />}>
              Github
            </Button>
            
            <Button variant="outline" icon={<Linkedin size={18} />}>
              LinkedIn
            </Button>
            
            <Button variant="outline" icon={<Mail size={18} />}>
              Email Me
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
