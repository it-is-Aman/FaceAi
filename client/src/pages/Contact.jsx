import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-24 pb-12 bg-gradient-to-b from-[#F5F5F5] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[#283E4A] mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-[#4A4A4A] mb-8">
              Have questions about our skin analysis technology? We're here to help!
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-semibold text-[#283E4A] mb-4">Support</h2>
                <p className="text-lg text-[#4A4A4A] mb-4">
                  For technical support or questions about your analysis results:
                </p>
                <p className="text-lg text-[#4A4A4A]">
                  Email: support@skinfaceai.com<br />
                  Hours: Monday-Friday, 9am-5pm PST
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#283E4A] mb-4">General Inquiries</h2>
                <p className="text-lg text-[#4A4A4A] mb-4">
                  For partnerships, press, or general questions:
                </p>
                <p className="text-lg text-[#4A4A4A]">
                  Email: info@skinfaceai.com<br />
                  Phone: (555) 123-4567
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xl text-[#4A4A4A] mb-6">
                Ready to try our AI skin analysis?
              </p>
              <Button 
                className="bg-[#FF6F61] text-white hover:bg-[#FF6F61]/90 text-lg px-8 py-6"
                onClick={() => navigate('/upload')}
              >
                Start Analysis
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
