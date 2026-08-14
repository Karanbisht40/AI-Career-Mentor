import HeroCard from "../../components/common/HeroCard.jsx";
import SectionHeader from "../../components/common/SectionHeader.jsx";
import { Card } from "../../components/ui/Card.jsx";
import { Badge } from "../../components/ui/Badge.jsx";

const features = [
    {
        title: "Guided career planning",
        text: "Generate a practical roadmap around your target role, current skills, and timeline.",
    },
    {
        title: "Resume intelligence",
        text: "Tune your profile for ATS compatibility and strengthen weak spots before applying.",
    },
    {
        title: "Mock interview practice",
        text: "Rehearse targeted questions, refine answers, and build confidence quickly.",
    },
    {
        title: "Secure user experience",
        text: "JWT auth, protected routes, and persistent sessions designed for production use.",
    },
];

export default function LandingPage() {
    return (
        <>
            <HeroCard />

            <section className="page-shell py-8 sm:py-12">
                <SectionHeader
                    eyebrow="Why it works"
                    title="Everything the job search needs, in one calm interface"
                    description="The experience is structured around the actual mentor workflow: know where you are, see what to do next, and keep momentum without clutter."
                />
                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {features.map((feature) => (
                        <Card key={feature.title} className="p-6">
                            <Badge>{feature.title}</Badge>
                            <p className="mt-4 text-sm leading-6 text-slate-600 text-slate-600">{feature.text}</p>
                        </Card>
                    ))}
                </div>
            </section>
        </>
    );
}
