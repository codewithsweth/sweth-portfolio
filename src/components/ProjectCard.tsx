
import { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubLink?: string;
  liveLink?: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  githubLink,
  liveLink,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg group",
        isHovered ? "scale-[1.02]" : "scale-100",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video overflow-hidden relative">
        <div 
          className="w-full h-full bg-gradient-to-br from-primary/80 to-primary/20 absolute z-0 opacity-60"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 flex items-end p-6">
          <h3 className="text-white text-xl font-bold">{title}</h3>
        </div>
        
        <div className={`absolute inset-0 bg-primary/80 backdrop-blur-sm z-20 flex items-center justify-center gap-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {githubLink && (
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
              aria-label="View GitHub Repository"
            >
              <Github className="text-white" size={20} />
            </a>
          )}
          
          {liveLink && (
            <a 
              href={liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
              aria-label="View Live Project"
            >
              <ExternalLink className="text-white" size={20} />
            </a>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 text-xs bg-secondary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
