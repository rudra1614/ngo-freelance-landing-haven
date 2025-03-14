
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    quote: "Working with NGO Freelancing transformed my career. I found meaningful projects that aligned with my passion for social work.",
    author: "Sarah Johnson",
    role: "Community Organizer",
    avatar: "SJ"
  },
  {
    id: 2,
    quote: "As a small NGO, we struggled to find qualified social workers. This platform connected us with amazing talent that helped our programs thrive.",
    author: "Michael Thompson",
    role: "NGO Director",
    avatar: "MT"
  },
  {
    id: 3,
    quote: "The opportunities I found through this platform allowed me to make a real difference while working remotely. It's been life-changing.",
    author: "Elena Rodriguez",
    role: "Education Specialist",
    avatar: "ER"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white shadow-md border-none">
              <CardContent className="pt-6">
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex items-center space-x-4 pt-4">
                <Avatar>
                  <AvatarFallback className="bg-ngo-blue text-white">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
