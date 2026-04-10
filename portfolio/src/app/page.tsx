"use client";
import { motion } from "framer-motion";
import { SquareCode, Mail, Send } from "lucide-react";
import { sendEmail } from "./actions";
import { useActionState } from "react";

const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
	await sendEmail(formData);
	return { success: true };
}, null);

export default function Home() {
	return (
		<main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
			{/* Hero Section */}
			<section className="h-screen flex flex-col items-center justify-center px-6">
				<motion.h1
					initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
					className="text-6xl md:text-8xl font-bold tracking-tighter"
				>
					CIOBAN<span className="text-blue-500">.DEV</span>
				</motion.h1>
				<motion.p
					initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
					className="mt-4 text-gray-400 text-lg md:text-xl text-center max-w-lg"
				>
					Fullstack Developer & Bachelor's Candidate. Building secure, high-performance systems.
				</motion.p>
				<div className="mt-8 flex gap-6">
					<a href="https://github.com" className="hover:text-blue-500 transition-colors"><SquareCode /></a>
					<a href="#contact" className="hover:text-blue-500 transition-colors"><Mail /></a>
				</div>
			</section>

			{/* Projects Section */}
			<section className="max-w-5xl mx-auto py-24 px-6">
				<h2 className="text-3xl font-bold mb-12">Projects</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{[1, 2].map((i) => (
						<div key={i} className="group p-8 border border-white/10 rounded-2xl bg-white/5 hover:border-blue-500/50 transition-all">
							<h3 className="text-xl font-bold mb-2">Bachelor Project #{i}</h3>
							<p className="text-gray-400 mb-4">A fullstack application optimized for Cloudflare Edge networks.</p>
							<div className="flex gap-2">
								<span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">Next.js</span>
								<span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">Cloudflare</span>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="max-w-2xl mx-auto py-24 px-6 text-center">
				<h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
				<form action={formAction} className="space-y-4">
					<input name="name" placeholder="Your Name" required className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 outline-none" />
					<input name="email" type="email" placeholder="Email" required className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 outline-none" />
					<button type="submit" disabled={isPending}>
						{isPending ? "Sending..." : "Send Message"}
					</button>
					{state?.success && <p className="text-green-500">Message sent successfully!</p>}
				</form>
			</section>
		</main>
	);
}