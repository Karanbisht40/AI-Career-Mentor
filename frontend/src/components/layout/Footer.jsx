import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="mt-16 border-t border-slate-200 bg-white">
            <div className="page-shell py-8 text-center">

                <h2 className="text-2xl font-bold text-blue-600">
                    AI Career Mentor
                </h2>

                <p className="mt-3 text-slate-600">
                    Helping you become a Software Engineer and AI Engineer with personalized AI guidance.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-600">
                    <Link to="/">Home</Link>
                    <Link to="/roadmap">Roadmap</Link>
                    <Link to="/chat">AI Chat</Link>
                    <Link to="/resume">Resume</Link>
                    <Link to="/interview">Interview</Link>
                </div>

                <p className="mt-6 text-sm text-slate-500">
                    © 2026 AI Career Mentor. All rights reserved.
                </p>

            </div>
        </footer>
    );
}