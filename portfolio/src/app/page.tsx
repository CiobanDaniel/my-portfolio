"use client";

import { FormEvent, useState, useTransition } from "react";
import { motion, Variants } from "framer-motion";
import { Send, Code2, Cpu, Globe } from "lucide-react";
import { SiGithub } from "react-icons/si";
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    setState(null);
    startTransition(async () => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok: boolean; error?: string };

      if (result.ok) {
        setState({ success: true });
        form.reset();
      } else {
        setState({
          success: false,
          error: result.error ?? "Message could not be sent right now.",
        });
      }
    });
  };

  return (
    <main className="min-h-screen text-slate-800 bg-slate-50 overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:24px_24px]" />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-400/30 blur-[140px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-400/30 blur-[120px] rounded-full"
        />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-lg uppercase tracking-tight text-slate-900">
            DANIEL<span className="text-cyan-600">CIOBAN</span>
          </span>
          <div className="hidden md:flex gap-6 text-sm text-slate-600">
            {["About", "Stack", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-slate-900 transition-colors"
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
          <motion.p variants={fadeUp} className="text-cyan-700 text-xs tracking-[0.3em] uppercase mb-4">
            Software Engineer
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-slate-900"
          >
            Building clean, scalable
            <br />
            digital systems.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-slate-600 text-lg mb-8"
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
              className="p-3 rounded-full bg-white/70 hover:bg-white border border-slate-200 transition shadow-sm"
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
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white/70 border border-slate-200 hover:border-cyan-300 transition shadow-sm hover:shadow-md"
            >
              <Icon className="text-cyan-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-slate-900">{title}</h3>
              <p className="text-slate-600 text-sm">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 max-w-2xl mx-auto">
        <motion.form
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl bg-white/80 border border-slate-200 p-6 md:p-8 shadow-lg"
        >
          <motion.div variants={fadeUp} className="mb-2">
            <h2 className="text-2xl font-semibold text-slate-900">Contact me</h2>
            <p className="text-slate-600 text-sm">
              Share your project idea and I will get back to you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            <motion.label variants={fadeUp} className="space-y-2 block">
              <span className="text-sm font-medium text-slate-700">Name</span>
              <input
                name="name"
                type="text"
                placeholder="Your full name"
                className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none"
                autoComplete="name"
                required
              />
            </motion.label>

            <motion.label variants={fadeUp} className="space-y-2 block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none"
                autoComplete="email"
                required
              />
            </motion.label>
          </div>

          <motion.label variants={fadeUp} className="space-y-2 block">
            <span className="text-sm font-medium text-slate-700">Subject</span>
            <input
              name="subject"
              type="text"
              placeholder="What is this about?"
              className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none"
            />
          </motion.label>

          <motion.label variants={fadeUp} className="space-y-2 block">
            <span className="text-sm font-medium text-slate-700">Message</span>
            <textarea
              name="message"
              rows={5}
              placeholder="Tell me about your project, timeline, or goals..."
              className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none resize-y"
              required
            />
          </motion.label>

          <motion.button
            variants={fadeUp}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl flex items-center justify-center gap-2 font-medium disabled:opacity-70"
          >
            {isPending ? "Sending..." : "Send message"} <Send size={16} />
          </motion.button>

          {state?.success && (
            <p className="text-emerald-600 text-center text-sm">
              Message sent successfully.
            </p>
          )}
          {state?.success === false && state.error && (
            <p className="text-rose-600 text-center text-sm">{state.error}</p>
          )}
        </motion.form>
      </section>

      <footer className="py-10 text-center text-slate-600 text-sm">
        © {new Date().getFullYear()} Daniel Cioban
      </footer>
    </main>
  );
}
