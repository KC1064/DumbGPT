import React from "react";
import { AuroraBackground } from "../components/ui/aurora-background";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Search } from 'lucide-react'
export default function page() {
  const exampleQueries = [{
    id: 1,
    query: "What is Quantum Physics?"
  }, {
    id: 2,
    query: "Why sky is blue in color?"
  }, {
    id: 3,
    query: "What is Schrodringer cat experiment?"
  }]
  return (

    <AuroraBackground >
      <div className="h-screen w-full bg-[#111]">
        <Header />
        <Hero />
        <div className="w-full flex flex-col items-center justify-center mt-4">
          <input type="text" placeholder="Ask me anything..." className="border-white border-2 z-10 text-white w-[60%] p-2 rounded-full" />
          <div className="flex w-[65%] text-white justify-evenly mt-3 px-4">
            <p className="text-white/80 text-lg">Examples:</p>
            {
              exampleQueries.map((item) => {
                return (
                  <p className="flex gap-1 items-center text-sm bg-slate-200 text-black hover:bg-slate-300 cursor-pointer backdrop-blur-2xl py-1 px-2 rounded-full">{item.query}<span><Search size={14}/></span></p>
                )
              })
            }

          </div>
        </div>
      </div>
    </AuroraBackground>

  );
}
