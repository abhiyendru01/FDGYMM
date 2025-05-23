
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  return (
    <div className="glassmorphism rounded-xl p-6 transition-all duration-300 hover:translate-y-[-5px] group relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-fdgym-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-fdgym-red to-fdgym-neon-red flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
          <Icon className="h-7 w-7 text-white" />
        </div>
        
        <h3 className="font-orbitron text-xl font-bold mb-3 group-hover:text-fdgym-neon-red transition-colors">{title}</h3>
        
        <p className="text-fdgym-light-gray text-sm lg:text-base">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
