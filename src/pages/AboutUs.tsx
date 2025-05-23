
import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';

const AboutUs = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">About <span className="text-fdgym-red">FD GYM</span></h1>
          <div className="w-24 h-1 bg-fdgym-red mx-auto mb-8"></div>
          <p className="text-fdgym-light-gray text-lg max-w-3xl mx-auto">
            Dedicated to transforming lives through fitness since 2010. We provide a premium fitness experience with cutting-edge equipment and expert guidance.
          </p>
        </div>

        {/* Our Story Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-orbitron font-bold mb-6">Our Story</h2>
              <div className="w-16 h-1 bg-fdgym-red mb-6"></div>
              <p className="text-fdgym-light-gray mb-4">
                Founded in 2010, FD GYM began with a simple mission: to create a fitness environment where everyone feels empowered to achieve their health goals. What started as a small local gym has grown into a network of premium fitness centers across India.
              </p>
              <p className="text-fdgym-light-gray mb-4">
                Our founder, Rahul Kumar, a former national-level athlete, envisioned a space that combines state-of-the-art equipment with personalized training programs. Today, that vision has evolved into an inclusive community where fitness enthusiasts of all levels find their path to better health.
              </p>
              <p className="text-fdgym-light-gray">
                Over the years, we've helped thousands of members transform their lives through tailored fitness journeys, nutritional guidance, and unwavering support.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-fdgym-red rounded-lg"></div>
              <div className="relative bg-fdgym-dark-gray/50 rounded-lg overflow-hidden aspect-video">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="FD GYM Facility" 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold mb-6">Our Mission</h2>
            <div className="w-16 h-1 bg-fdgym-red mx-auto mb-6"></div>
            <p className="text-fdgym-light-gray max-w-3xl mx-auto">
              At FD GYM, our mission is to inspire and empower individuals to lead healthier, more active lives. We believe fitness is not just about physical strength, but about building mental resilience and overall well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-fdgym-dark-gray/50 border-fdgym-dark-gray hover:border-fdgym-red transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 flex items-center justify-center mx-auto bg-fdgym-red/10 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fdgym-red">
                    <path d="M18 8h1a4 4 0 1 1 0 8h-1"></path>
                    <path d="M6 8H5a4 4 0 1 0 0 8h1"></path>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Premium Equipment</h3>
                <p className="text-fdgym-light-gray">
                  We invest in the latest, high-quality fitness equipment to ensure our members have access to the best tools for their workouts.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-fdgym-dark-gray/50 border-fdgym-dark-gray hover:border-fdgym-red transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 flex items-center justify-center mx-auto bg-fdgym-red/10 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fdgym-red">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Trainers</h3>
                <p className="text-fdgym-light-gray">
                  Our certified personal trainers provide expert guidance and motivation to help you reach your fitness goals safely and effectively.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-fdgym-dark-gray/50 border-fdgym-dark-gray hover:border-fdgym-red transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 flex items-center justify-center mx-auto bg-fdgym-red/10 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fdgym-red">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Diverse Programs</h3>
                <p className="text-fdgym-light-gray">
                  From strength training to cardio, yoga to HIIT, we offer diverse programs tailored to different fitness levels and goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

       
        {/* Contact Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold mb-6">Get In Touch</h2>
            <div className="w-16 h-1 bg-fdgym-red mx-auto mb-6"></div>
            <p className="text-fdgym-light-gray max-w-3xl mx-auto">
              Have questions or want to learn more about our programs? Our team is here to help you on your fitness journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-fdgym-dark-gray/50 border-fdgym-dark-gray hover:border-fdgym-red transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Phone className="h-5 w-5 text-fdgym-red mr-2" />
                  <h3 className="text-xl font-bold">Call Us</h3>
                </div>
                <p className="text-fdgym-light-gray">Customer Support: +91 98765 43210</p>
                <p className="text-fdgym-light-gray">Memberships: +91 98765 43211</p>
              </CardContent>
            </Card>

            <Card className="bg-fdgym-dark-gray/50 border-fdgym-dark-gray hover:border-fdgym-red transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Mail className="h-5 w-5 text-fdgym-red mr-2" />
                  <h3 className="text-xl font-bold">Email Us</h3>
                </div>
                <p className="text-fdgym-light-gray">General Inquiries: info@fdgym.com</p>
                <p className="text-fdgym-light-gray">Support: support@fdgym.com</p>
              </CardContent>
            </Card>

            <Card className="bg-fdgym-dark-gray/50 border-fdgym-dark-gray hover:border-fdgym-red transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-fdgym-red mr-2" />
                  <h3 className="text-xl font-bold">Visit Us</h3>
                </div>
                <p className="text-fdgym-light-gray">123 Fitness Street</p>
                <p className="text-fdgym-light-gray">New Delhi, India 110001</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Social Media Section */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-orbitron font-bold mb-6">Connect With Us</h2>
            <div className="w-16 h-1 bg-fdgym-red mx-auto mb-6"></div>
            <p className="text-fdgym-light-gray max-w-3xl mx-auto mb-8">
              Follow us on social media to stay updated with the latest news, events, and fitness tips.
            </p>

            <div className="flex justify-center space-x-6">
              <a href="#" className="bg-fdgym-dark-gray/50 hover:bg-fdgym-red transition-colors p-4 rounded-full">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="bg-fdgym-dark-gray/50 hover:bg-fdgym-red transition-colors p-4 rounded-full">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="bg-fdgym-dark-gray/50 hover:bg-fdgym-red transition-colors p-4 rounded-full">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="bg-fdgym-dark-gray/50 hover:bg-fdgym-red transition-colors p-4 rounded-full">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
