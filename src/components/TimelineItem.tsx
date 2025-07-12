
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  title: string;
  company: string;
  date: string;
  description: string;
  isLast?: boolean;
  isVisible?: boolean;
  delay?: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  company,
  date,
  description,
  isLast = false,
  isVisible = false,
  delay = 0,
}) => {
  return (
    <div className={`relative pl-8 pb-8 ${!isLast ? 'border-l border-border' : ''}`}>
      <div 
        className={`absolute left-0 top-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 mt-1.5 transition-all duration-500 delay-${delay} ${
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      />
      
      <div 
        className={`transition-all duration-500 ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-10'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="text-sm text-muted-foreground md:ml-4">{date}</span>
        </div>
        
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {company}
          </span>
        </div>
        
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
