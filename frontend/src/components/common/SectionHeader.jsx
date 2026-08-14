export default function SectionHeader({ eyebrow, title, description, align = "left" }) {
    return (
        <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
            {eyebrow ? (
                <p className="text-sm font-semibold tracking-[0.25em] text-blue-600 uppercase dark:text-blue-400">{eyebrow}</p>
            ) : null}
            <h2 className="section-title mt-3">{title}</h2>
            {description ? <p className="section-subtitle">{description}</p> : null}
        </div>
    );
}
