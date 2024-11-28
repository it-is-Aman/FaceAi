import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Upload, MessageSquare, Zap } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-[#F5F5F5] to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#283E4A] mb-4">
                AI-Powered Skin Analysis
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
            <div className="relative">
              <img
                src="/skin-analysis.jpg"
                alt="AI Skin Analysis"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#283E4A] mb-12">
            How SkinFace AI Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Upload className="h-12 w-12 text-[#4A90E2] mb-4" />
                <CardTitle>Upload Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4A4A4A]">
                  Take a clear photo of your skin concern and upload it securely.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Brain className="h-12 w-12 text-[#28A745] mb-4" />
                <CardTitle>AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4A4A4A]">
                  Our advanced AI model analyzes your skin condition with high accuracy.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-[#FF6F61] mb-4" />
                <CardTitle>Get Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4A4A4A]">
                  Receive detailed analysis and condition identification instantly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-[#FFD700] mb-4" />
                <CardTitle>Expert Advice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4A4A4A]">
                  Get personalized treatment recommendations and skincare tips.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
