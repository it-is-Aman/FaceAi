import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Upload, Brain, MessageSquare, Sparkles } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-[#F5F5F5] to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#283E4A] mb-4">
                FaceCare AI: Disease Analyzer & Advisor
              </h1>
              <p className="text-xl text-[#4A4A4A] mb-8">
                Upload a photo of your skin concern and get instant AI analysis, personalized recommendations, and expert advice.
              </p>
              <Button
                className="bg-[#FF6F61] text-white hover:bg-[#FF6F61]/90 text-lg px-8 py-6"
                onClick={() => navigate('/upload')}
              >
                Analyze Your Skin
              </Button>
            </div>
            <div className="relative flex items-center justify-center">
              <img
                src="../images/hero.avif"
                alt="AI Skin Analysis"
                className="w-full h-auto max-w-md mx-auto object-contain mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#283E4A] mb-12">
            How FaceCare AI Works
          </h2>
          
          {/* Features Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <Upload className="h-12 w-12 text-[#4A90E2] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-[#283E4A] mb-2">Easy Upload</h3>
              <p className="text-[#4A4A4A] mb-6">
                Simply upload a photo of your skin concern using your device's camera or gallery.
              </p>
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="../images/click.png"
                  alt="Upload Photo"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="text-center">
              <Brain className="h-12 w-12 text-[#4A90E2] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-[#283E4A] mb-2">AI Analysis</h3>
              <p className="text-[#4A4A4A] mb-6">
                Our AI analyzes your image for accurate condition detection.
              </p>
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="../images/research.png"
                  alt="AI Analysis"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="text-center">
              <Sparkles className="h-12 w-12 text-[#4A90E2] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-[#283E4A] mb-2">Get Insights</h3>
              <p className="text-[#4A4A4A] mb-6">
                Receive detailed analysis and treatment suggestions.
              </p>
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="../images/doctor.png"
                  alt="Get Insights"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-[#4A90E2] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-[#283E4A] mb-2">Chat Support</h3>
              <p className="text-[#4A4A4A] mb-6">
                Ask questions and get personalized advice.
              </p>
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="../images/chat.jpeg"
                  alt="Chat Support"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#283E4A] mb-12">
            Why Choose FaceCare AI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#283E4A] mb-3">Instant Results</h3>
              <p className="text-[#4A4A4A]">
                Get immediate analysis of your skin condition with our advanced AI technology. No waiting for appointments or long consultations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#283E4A] mb-3">High Accuracy</h3>
              <p className="text-[#4A4A4A]">
                Our AI model is trained on a vast database of skin conditions, ensuring reliable and accurate analysis of your skin concerns.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#283E4A] mb-3">Privacy First</h3>
              <p className="text-[#4A4A4A]">
                Your privacy is our priority. All uploads are securely processed and your data is protected with industry-standard encryption.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#283E4A] mb-3">24/7 Availability</h3>
              <p className="text-[#4A4A4A]">
                Access our service anytime, anywhere. Get instant skin analysis and recommendations whenever you need them.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#283E4A] mb-3">Interactive Support</h3>
              <p className="text-[#4A4A4A]">
                Get personalized advice through our AI-powered chat system. Ask questions and receive detailed explanations about your condition.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#283E4A] mb-3">Research-Backed</h3>
              <p className="text-[#4A4A4A]">
                Our AI models are developed using extensive medical research and validated by healthcare professionals for reliable results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
