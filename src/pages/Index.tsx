
import { useRef, useEffect } from 'react';
import { Activity, Utensils, MapPin, Dumbbell, Brain, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import SubscriptionPlan from '@/components/SubscriptionPlan';
import BMICalculator from '@/components/BMICalculator';
import GymFinder from '@/components/GymFinder';

const Index = () => {
  // Refs for scroll animations
  const servicesRef = useRef<HTMLDivElement>(null);
  const subscriptionRef = useRef<HTMLDivElement>(null);
  const bmiRef = useRef<HTMLDivElement>(null);
  const gymFinderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all refs
    [servicesRef, subscriptionRef, bmiRef, gymFinderRef].forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    return () => {
      [servicesRef, subscriptionRef, bmiRef, gymFinderRef].forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <Hero />
      
      {/* Services Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div ref={servicesRef} className="opacity-0">
            <h2 className="section-heading text-center mx-auto">Our Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <ServiceCard 
                icon={Activity}
                title="Personalized Workouts"
                description="Custom workout plans designed to meet your specific fitness goals, whether you're a beginner or advanced athlete."
              />
              <ServiceCard 
                icon={Utensils}
                title="Diet Plans"
                description="Nutrition guidance tailored to your body type, goals, and preferences to optimize your fitness journey."
              />
              <ServiceCard 
                icon={MapPin}
                title="Partner Gyms"
                description="Access to our network of premium fitness centers across the country with your FD GYM membership."
              />
              <ServiceCard 
                icon={Dumbbell}
                title="Premium Equipment"
                description="State-of-the-art fitness equipment and facilities designed for optimal performance and results."
              />
              <ServiceCard 
                icon={Brain}
                title="AI Diet Assistant"
                description="Advanced AI technology that analyzes your metrics and creates personalized nutrition recommendations."
              />
              <ServiceCard 
                icon={CreditCard}
                title="Flexible Subscriptions"
                description="Choose from various membership options to find the perfect fit for your schedule and budget."
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Subscription Plans Section */}
      <section className="py-16 bg-gradient-to-b from-black to-fdgym-dark-gray/30">
        <div className="container mx-auto px-4">
          <div ref={subscriptionRef} className="opacity-0">
            <h2 className="section-heading text-center mx-auto">Subscription Plans</h2>
            <p className="text-center text-fdgym-light-gray max-w-2xl mx-auto mb-12">
              Choose the perfect membership plan that fits your fitness journey and budget with our flexible subscription options.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              <SubscriptionPlan 
                name="1 Month"
                price={1100}
                duration="month"
                features={[
                  "Full gym access",
                  "Basic workout plans",
                  "Fitness assessment",
                  "Access to partner gyms",
                  "Mobile app access"
                ]}
              />
              <SubscriptionPlan 
                name="3 Months"
                price={3000}
                duration="3 months"
                features={[
                  "Everything in 1 Month plan",
                  "Personal trainer (1 session)",
                  "Nutrition consultation",
                  "Weekly progress tracking",
                  "Discounted supplements"
                ]}
              />
              <SubscriptionPlan 
                name="6 Months"
                price={5000}
                duration="6 months"
                features={[
                  "Everything in 3 Months plan",
                  "Personal trainer (3 sessions)",
                  "Custom diet plans",
                  "Monthly body analysis",
                  "Priority booking"
                ]}
                popular={true}
              />
              <SubscriptionPlan 
                name="12 Months"
                price={9000}
                duration="year"
                features={[
                  "Everything in 6 Months plan",
                  "Personal trainer (6 sessions)",
                  "Premium fitness gear",
                  "Unlimited guest passes",
                  "VIP member events"
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* BMI Calculator Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div ref={bmiRef} className="opacity-0">
            <h2 className="section-heading text-center mx-auto">Calculate Your BMI</h2>
            <p className="text-center text-fdgym-light-gray max-w-2xl mx-auto mb-12">
              Use our BMI calculator to assess your body mass index and get personalized recommendations for your fitness journey.
            </p>
            
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <BMICalculator />
              </div>
              
              <div className="lg:w-1/2 mt-8 lg:mt-0">
                <div className="glassmorphism rounded-xl p-6 h-full">
                  <h3 className="font-orbitron text-xl font-bold mb-4">Get Detailed Analysis</h3>
                  <p className="text-fdgym-light-gray mb-6">
                    Want a more comprehensive health assessment with personalized diet and exercise recommendations based on your BMI?
                  </p>
                  
                  <Link to="/bmi">
                    <Button className="bg-fdgym-red hover:bg-fdgym-neon-red text-white">
                      <span>AI-Powered BMI Analysis</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  
                  <div className="mt-6 border-t border-fdgym-dark-gray pt-6">
                    <h4 className="font-orbitron text-lg font-bold mb-3">What You'll Get:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-fdgym-red flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <span className="text-fdgym-light-gray text-sm">Detailed body composition analysis</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-fdgym-red flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <span className="text-fdgym-light-gray text-sm">AI-generated diet recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-fdgym-red flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                          <span className="text-xs font-bold">3</span>
                        </div>
                        <span className="text-fdgym-light-gray text-sm">Customized workout suggestions</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-fdgym-red flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                          <span className="text-xs font-bold">4</span>
                        </div>
                        <span className="text-fdgym-light-gray text-sm">Health insights and improvement strategies</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partner Gyms Section */}
      <section className="py-16 bg-gradient-to-b from-black to-fdgym-dark-gray/30">
        <div className="container mx-auto px-4">
          <div ref={gymFinderRef} className="opacity-0">
            <h2 className="section-heading text-center mx-auto">Find Nearby Partner Gyms</h2>
            <p className="text-center text-fdgym-light-gray max-w-2xl mx-auto mb-12">
              Locate our partner fitness centers in your area and enjoy premium facilities wherever you go.
            </p>
            
            <GymFinder />
            
            <div className="text-center mt-12">
              <Link to="/partner-gyms">
                <Button variant="outline" className="border-fdgym-red text-fdgym-red hover:bg-fdgym-red hover:text-white">
                  View All Partner Gyms
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-fdgym-red rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-fdgym-neon-red rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
              Ready to Transform Your <span className="text-fdgym-neon-red">Fitness Journey</span>?
            </h2>
            <p className="text-fdgym-light-gray text-lg mb-8">
              Join FD GYM today and experience premium fitness with state-of-the-art facilities, expert guidance, and a supportive community.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-fdgym-red hover:bg-fdgym-neon-red text-white">
                Start Your Membership Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
