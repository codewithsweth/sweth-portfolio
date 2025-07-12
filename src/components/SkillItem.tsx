
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface SkillItemProps {
  name: string;
  icon?: React.ReactNode;
  level?: number;
  isVisible?: boolean;
  delay?: number;
}

const SkillItem: React.FC<SkillItemProps> = ({
  name,
  icon,
  level = 80,
  isVisible = false,
  delay = 0,
}) => {
  const [displayLevel, setDisplayLevel] = useState(0);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isVisible) {
      timeout = setTimeout(() => {
        setDisplayLevel(level);
      }, delay);
    }
    
    return () => {
      clearTimeout(timeout);
    };
  }, [isVisible, level, delay]);
  
  return (
    <div 
      className={`transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="glass-card p-4 h-full rounded-xl">
        <div className="flex items-center mb-3">
          {icon && <div className="mr-3 text-primary">{icon}</div>}
          <h3 className="font-medium">{name}</h3>
        </div>
        
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${displayLevel}%`, transitionDelay: `${delay + 300}ms` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillItem;
