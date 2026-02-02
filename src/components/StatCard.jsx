import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const isNumber = typeof value === "number";
    if (!isNumber) return;

    let start = 0;
    const duration = 600;
    const step = Math.max(1, Math.floor(value / 30));
    const interval = setInterval(() => {
      start += step;
      if (start >= value) {
        start = value;
        clearInterval(interval);
      }
      setDisplay(start);
    }, duration / 30);

    return () => clearInterval(interval);
  }, [value]);

  return <>{typeof value === "number" ? display.toLocaleString() : value}</>;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  dark = false,
  loading = false,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`
        rounded-2xl p-5 border backdrop-blur-xl
        ${dark
          ? "bg-white/10 border-white/20 text-white"
          : "bg-white border-gray-200 text-black"}
      `}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide opacity-60">
          {title}
        </p>

        {Icon && (
          <div
            className={`p-2 rounded-xl
            ${dark ? "bg-white/10" : "bg-gray-100"}`}
          >
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="space-y-2">
            <div className="h-8 w-32 rounded bg-gray-200/60 animate-pulse" />
            <div className="h-4 w-20 rounded bg-gray-200/40 animate-pulse" />
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-semibold tracking-tight">
              <AnimatedNumber value={value} />
            </h2>

            {trend && trendValue && (
              <p
                className={`mt-1 text-sm font-medium
                ${trend === "up" ? "text-green-500" : "text-red-500"}`}
              >
                {trendValue}
              </p>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
