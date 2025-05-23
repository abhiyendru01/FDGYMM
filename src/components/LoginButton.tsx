
import { Link } from 'react-router-dom';
import { UserCircle, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LoginButtonProps {
  variant: 'admin' | 'user';
  className?: string;
}

const LoginButton = ({ variant, className }: LoginButtonProps) => {
  const isAdmin = variant === 'admin';
  
  return (
    <Link to={isAdmin ? "/admin/login" : "/login"}>
      <Button
        className={cn(
          "relative group overflow-hidden",
          isAdmin 
            ? "bg-fdgym-dark-gray text-white hover:bg-fdgym-dark-gray/80" 
            : "bg-fdgym-red text-white hover:bg-fdgym-neon-red",
          className
        )}
        size="lg"
      >
        <span className="flex items-center space-x-2">
          {isAdmin ? (
            <ShieldAlert className="h-5 w-5" />
          ) : (
            <UserCircle className="h-5 w-5" />
          )}
          <span>{isAdmin ? 'Admin Login' : 'User Login/Signup'}</span>
        </span>
        
        {/* Glow effect */}
        <span className="absolute inset-0 flex justify-center items-center bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform translate-x-full group-hover:translate-x-0 transition-all duration-700" />
      </Button>
    </Link>
  );
};

export default LoginButton;
