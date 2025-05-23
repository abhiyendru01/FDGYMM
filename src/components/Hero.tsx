
import { useState, useEffect } from 'react';
import { ArrowRight, Dumbbell, Clock, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background and parallax effect */}
      <div 
        className="absolute inset-0 bg-gradient-gym"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1547919307-1ecb10702e6f?auto=format&fit=crop&q=80&w=1920&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.2)',
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      
      {/* Animated neon line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-fdgym-neon-red blur-sm opacity-50 transform -translate-y-1/2" />
      
      {/* Content */}
      <div className="container mx-auto px-4 pt-20 pb-24 relative z-10">
        <div className="flex flex-col items-center">
          {/* Centered Bodybuilder Image */}
          <div className="relative mb-8 w-full max-w-md mx-auto">
            <div className="aspect-square rounded-full bg-fdgym-red/20 blur-3xl absolute inset-0" />
            <img 
              src="https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/05/10-Best-Arms-Olympia-Arnold-Schwarzenegar.jpg?quality=86&strip=all"
              alt="Bodybuilder"
              className="rounded-2xl shadow-2xl relative z-10 animate-float object-cover mx-auto"
              style={{ maxHeight: "400px", objectPosition: "center top" }}
            />
            {/* Enhanced Neon border effect */}
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-fdgym-red to-fdgym-neon-red opacity-70 blur-sm animate-pulse-glow -z-10" />
            
            {/* Add additional visual effects */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-10 bg-fdgym-neon-red/30 blur-xl"></div>
          </div>

          <div className="w-full max-w-3xl space-y-6 text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-black text-white leading-tight">
              TRANSFORM YOUR <span className="text-fdgym-neon-red">BODY</span>
              <br />
              ELEVATE YOUR <span className="text-fdgym-neon-red">LIFE</span>
            </h1>
            
            <p className="text-lg md:text-xl text-fdgym-light-gray max-w-2xl mx-auto">
              FD GYM offers premium fitness experiences with cutting-edge equipment, expert trainers, and personalized programs to help you achieve your fitness goals.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <LoginButton variant="admin" />
              <LoginButton variant="user" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <div className="flex items-center space-x-2">
                <Dumbbell className="h-6 w-6 text-fdgym-red" />
                <span className="text-white">Premium Equipment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-fdgym-red" />
                <span className="text-white">24/7 Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-fdgym-red" />
                <span className="text-white">Expert Trainers</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="h-6 w-6 text-fdgym-neon-red transform rotate-90" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
