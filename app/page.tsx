import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Link from "next/link";

export default function page() {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          <Link
            href="/signup"
            className="pointer-events-auto h-max w-max p-2 rounded-xl border border-white bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20"
          >
            <button>
              Sign Up
            </button>
          </Link>
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
}
