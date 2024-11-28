import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">FaceCare AI</div>
          <div className="flex space-x-4">
            <a href="#about" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="#skin-health" className="text-gray-600 hover:text-blue-600">Skin Health A-Z</a>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Sign in</button>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Identify your skin condition with artificial intelligence
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Snap a photo to instantly learn what your condition is and how to treat it.
          </p>
          <Link 
            to="/upload" 
            className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors inline-block"
          >
            Get Started
          </Link>
        </div>
        <div className="md:w-1/2">
          <img 
            src="/placeholder.svg" 
            alt="AI Skin Analysis" 
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
        </div>
      </main>

      <footer className="bg-white py-6">
        <div className="container mx-auto px-6 text-center text-gray-600">
          © 2023 FaceCare AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
