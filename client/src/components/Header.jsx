import { Button } from "@/components/ui/button"
import { Brain } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-[#4A90E2]" />
            <span className="text-xl font-bold text-[#283E4A]">SkinFace AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-[#4A4A4A] hover:text-[#4A90E2]">
              Home
            </Link>
            <Link to="/about" className="text-[#4A4A4A] hover:text-[#4A90E2]">
              About
            </Link>
            <Link to="/contact" className="text-[#4A4A4A] hover:text-[#4A90E2]">
              Contact
            </Link>
          </nav>
          <Button 
            className="bg-[#4A90E2] text-white hover:bg-[#4A90E2]/90"
            onClick={() => navigate('/upload')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
