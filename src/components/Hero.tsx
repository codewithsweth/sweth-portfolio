
import { useState, useEffect } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import Button from './Button';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-16"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80)'
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      
      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <p className="text-white/90 inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm font-medium mb-4">
                Hello, I'm a
              </p>
            </div>
            
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              Full Stack Developer
            </h1>
            
            <p className={`text-xl md:text-2xl text-white/80 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              I build exceptional digital experiences that bring your ideas to life
            </p>
            
            <div className={`pt-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <Button size="lg" className="mr-4 bg-white text-black hover:bg-white/90">
                View My Work
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <a href="#about" className="text-white/70 hover:text-white transition-colors">
          <ArrowDownCircle size={36} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
