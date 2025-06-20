"use client";
import { Search } from 'lucide-react'
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

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
    <div className="h-screen w-full md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight gradientFirst="radial-gradient(50% 50% at 50% 50%, hsla(200, 100%, 65%, 0.25) 0%, hsla(200, 100%, 50%, 0.15) 50%, transparent 100%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(315, 100%, 60%, 0.25) 0%, hsla(315, 100%, 45%, 0.15) 50%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(330, 100%, 70%, 0.3) 0%, hsla(330, 100%, 55%, 0.15) 50%, transparent 100%)"
        translateY={-100}
        duration={10}
      />
      <div>
        <Header />
        <Hero />
        <div className="w-full flex flex-col items-center justify-center mt-4">
          <input type="text" placeholder="Ask me anything..." className="border-white border-2 z-10 text-white w-[60%] p-2 rounded-full" />
          <div className="flex w-[65%] text-white justify-evenly mt-3 px-4">
            <p className="text-white/80 text-lg mt-2">Examples:</p>
            {
              exampleQueries.map((item) => {
                return (
                  <p key={item.id} className="flex gap-1 items-center text-sm bg-slate-200 text-black hover:bg-slate-300 cursor-pointer backdrop-blur-2xl py-1.5 px-3 rounded-full">{item.query}<span><Search size={14} /></span></p>
                )
              })
            }

          </div>
        </div>
      </div>
    </div>
  );
}
