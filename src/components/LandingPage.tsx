import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export default function LandingPage({
  onLogin,
  onGetStarted,
}: {
  onLogin: () => void;
  onGetStarted: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 text-white overflow-hidden">

      {/* 🌟 NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex justify-between items-center px-10 py-6"
      >
        <div className="flex items-center gap-2 text-xl font-bold">
          📄 ResumePro
        </div>

        <button
          onClick={onLogin}
          className="px-5 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition backdrop-blur-md"
        >
          Login
        </button>
      </motion.nav>

      {/* 🚀 HERO SECTION */}
      <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-2 gap-16 items-center mt-20">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Build{" "}
            <span className="text-cyan-300">ATS-Friendly</span>
            <br />
            Resumes That Get You Hired 🚀
          </motion.h1>

          <p className="mt-6 text-lg text-white/90 max-w-xl">
            Create professional resumes in minutes using modern templates,
            AI-powered suggestions, and instant PDF export — all in one place.
          </p>

          {/* CTA BUTTONS */}
          <motion.div
            className="flex gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={onGetStarted}
              className="flex items-center gap-2 bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl hover:scale-105 transition"
            >
              Get Started Free <ArrowRight />
            </button>

            <button
              onClick={onLogin}
              className="px-6 py-3 rounded-xl border border-white/40 hover:bg-white/20 transition"
            >
              Login
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT FEATURE CARD */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="text-yellow-300" /> Why ResumePro?
            </h3>

            <ul className="space-y-4 text-white/95">
              {[
                "Multiple modern resume templates",
                "ATS-optimized formatting",
                "Instant PDF download",
                "Smart career & skill guidance",
                "Secure authentication with Supabase",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="text-green-300" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-white/70 mt-24 pb-6"
      >
        © 2026 ResumePro — Build smarter. Apply faster.
      </motion.footer>
    </div>
  );
}
