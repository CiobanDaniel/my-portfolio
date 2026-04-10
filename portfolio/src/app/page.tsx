"use client";

import { useState, useTransition } from "react";
import { motion, Variants } from "framer-motion";
import { Send, Code2, Cpu, Globe } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { sendEmail } from "./actions";

type FormState = {
  success: boolean;
  error?: string;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function Home() {
  const [state, setState] = useState<FormState | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    setState(null);
    startTransition(async () => {
      try {
        await sendEmail(formData);
        setState({ success: true });
      } catch {
        setState({
          success: false,
          error: "Message could not be sent. Please try again in a moment.",
        });
      }
    });
  };

  return (
    <main className="min-h-screen text-slate-200 bg-[#050505] overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:26px_26px]" />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"
        />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-lg uppercase tracking-tight">
            DANIEL<span className="text-blue-500">CIOBAN</span>
          </span>
          <div className="hidden md:flex gap-6 text-sm text-slate-400">
            {["About", "Stack", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="about" className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p variants={fadeUp} className="text-blue-500 text-xs tracking-[0.3em] uppercase mb-4">
            Software Engineer
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Building clean, scalable
            <br />
            digital systems.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-slate-400 text-lg mb-8"
          >
            Focused on web architecture and embedded systems. I build
            performant software with clean structure and low-level control.
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-4">
            <a
              href="https://github.com/CiobanDaniel"
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub profile"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              <SiGithub size={20} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Stack */}
      <section id="stack" className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[{
            icon: Code2,
            title: "Programming",
            text: "C/C++, C#, Python, Java",
          },
          {
            icon: Globe,
            title: "Web",
            text: "ASP.NET Core, scalable systems",
          },
          {
            icon: Cpu,
            title: "Embedded",
            text: "ARM Cortex, drivers, hardware control",
          }].map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ scale: 1.04 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-blue-500/40 transition"
            >
              <Icon className="text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-slate-400 text-sm">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 max-w-xl mx-auto">
        <motion.form
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          action={handleSubmit}
          className="space-y-4"
        >
          {["name", "email"].map((field) => (
            <motion.input
              key={field}
              variants={fadeUp}
              name={field}
              type={field === "email" ? "email" : "text"}
              placeholder={field === "email" ? "Email address" : "Your name"}
              className="w-full p-3 bg-black/40 border border-white/10 rounded-xl focus:border-blue-500 outline-none"
              autoComplete={field === "email" ? "email" : "name"}
              required
            />
          ))}

          <motion.textarea
            variants={fadeUp}
            name="message"
            rows={4}
            placeholder="Tell me about your project..."
            className="w-full p-3 bg-black/40 border border-white/10 rounded-xl focus:border-blue-500 outline-none"
            required
          />

          <motion.button
            variants={fadeUp}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-2"
          >
            {isPending ? "Sending..." : "Send"} <Send size={16} />
          </motion.button>

          {state?.success && (
            <p className="text-emerald-400 text-center text-sm">
              Message sent successfully.
            </p>
          )}
          {state?.success === false && state.error && (
            <p className="text-rose-400 text-center text-sm">{state.error}</p>
          )}
        </motion.form>
      </section>

      <footer className="py-10 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Daniel Cioban
      </footer>
    </main>
  );
}
