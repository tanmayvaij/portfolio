import Image from "next/image";

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-24 px-6 bg-background border-t border-border"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
        {/* Image Layout */}
        <div className="sticky top-24 space-y-8">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-secondary/50 grayscale hover:grayscale-0 transition-all duration-700">
            <Image
              src="/happy-coder.png"
              fill
              alt="Happy Coder"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
              My Journey
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Combining creativity with technical excellence to build products
              that solve real problems.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-16 pt-8 md:pt-0">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground tracking-tight border-b border-border pb-6">
              Experience
            </h2>

            {/* Experience Item 1 */}
            <div className="group">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-2xl font-bold text-foreground">
                  Software Developer
                </h3>
                <span className="text-xs font-mono text-muted-foreground">
                  July 2025 — Present
                </span>
              </div>
              <p className="text-lg font-medium text-primary mb-4">
                IntellAxis AI
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                Leading the development of the landing website and Gen AI
                products, contributing across UI/UX, backend, and DevOps.
                Integrating GenAI capabilities and optimizing CI/CD pipelines.
              </p>
            </div>

            {/* Experience Item 2 */}
            <div className="group">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-2xl font-bold text-foreground">
                  Full Stack Developer
                </h3>
                <span className="text-xs font-mono text-muted-foreground">
                  June 2023 — May 2025
                </span>
              </div>
              <p className="text-lg font-medium text-primary mb-4">
                MyLegacyBox
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                Led end-to-end development for MyLegacyBox App – a personal
                finance succession management platform. Conducted technical
                research for technology stack optimization.
              </p>
            </div>

            {/* Experience Item 3 */}
            <div className="group">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-2xl font-bold text-foreground">
                  Full Stack Developer
                </h3>
                <span className="text-xs font-mono text-muted-foreground">
                  Jan 2023 — June 2023
                </span>
              </div>
              <p className="text-lg font-medium text-primary mb-4">
                SystemOnSilicon Corp.
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                Developed UI/UX designs and full-stack features for AgriTech and
                HealthTech applications. Collaborated with cross-functional
                teams to enhance user experience.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground tracking-tight border-b border-border pb-6">
              Education
            </h2>

            <div className="group">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-2xl font-bold text-foreground">MCA</h3>
                <span className="text-xs font-mono text-muted-foreground">
                  2024 — 2026
                </span>
              </div>
              <p className="text-lg font-medium text-primary">
                D. Y. Patil Institute of MCA
              </p>
            </div>

            <div className="group">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-2xl font-bold text-foreground">BCA</h3>
                <span className="text-xs font-mono text-muted-foreground">
                  2021 — 2024
                </span>
              </div>
              <p className="text-lg font-medium text-primary">
                D. Y. Patil International University
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
