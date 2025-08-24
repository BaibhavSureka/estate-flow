import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard/my-requests");
  };

  return (
    <div className="min-h-screen w-full bg-gray-950 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-800 w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full relative">
              <div className="absolute inset-0 border-2 border-green-500 rounded-full"></div>
              <div className="absolute inset-1 border-2 border-green-500 rounded-full"></div>
            </div>
          </div>
          <span className="text-2xl font-bold">EstateFlow</span>
        </div>
        <div className="flex gap-3">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
            Buy A House
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
            Offer an EstateFlow
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center w-full">
        {/* Intro Banner */}
        <div className="bg-purple-800 text-white px-4 py-2 rounded-lg mb-6">
          Introducing EstateFlow
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          use crypto to buy homes
          <br />
          <span className="text-purple-400">with p2p</span>{" "}
          <span className="text-green-400">estate flows</span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-4xl">
          EstateFlow connects crypto holders with Nominee purchasers to take loans and purchase houses on their behalf via estate flows!
        </p>

        {/* CTA Button */}
        <Button 
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold gap-3"
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </Button>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 p-6 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full relative">
                <div className="absolute inset-0 border border-green-500 rounded-full"></div>
                <div className="absolute inset-0.5 border border-green-500 rounded-full"></div>
              </div>
            </div>
            <span className="text-lg font-semibold">EstateFlow</span>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Q Search..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <img
              src="/users/john.png"
              alt="Arjun Sharma"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-right">
              <div className="font-medium">Arjun Sharma</div>
              <div className="text-sm text-gray-400">Nominee Purchaser</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
