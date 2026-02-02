import { useEffect, useRef, useState } from "react";

export default function Navbar({ setIsOpen }) {
  const btnRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const move = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    };

    const reset = () => {
      btn.style.transform = "translate(0,0)";
    };

    btn.addEventListener("mousemove", move);
    btn.addEventListener("mouseleave", reset);

    return () => {
      btn.removeEventListener("mousemove", move);
      btn.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-2xl animate-pulse pointer-events-none" />

      <div className="relative bg-white/80 backdrop-blur-xl border-b border-gray-200/60
        shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)]
        px-5 py-4 flex items-center justify-between">

        <button
          ref={btnRef}
          onClick={() => {
            setActive(!active);
            setIsOpen(prev => !prev);
          }}
          className="relative w-12 h-12 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 transition-all"
        >
          <div className="flex flex-col items-center justify-center gap-[6px]">
            <span
              className={`w-6 h-[2px] bg-gray-900 rounded-full transition ${
                active ? "rotate-45 translate-y-[8px]" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-gray-900 rounded-full transition ${
                active ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-gray-900 rounded-full transition ${
                active ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
            />
          </div>
        </button>

        <h1 className="font-extrabold tracking-tight text-lg bg-gradient-to-r
          from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
          Admin Nexus
        </h1>

        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[2px]">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-sm">
            AD
          </div>
        </div>
      </div>
    </header>
  );
}
  