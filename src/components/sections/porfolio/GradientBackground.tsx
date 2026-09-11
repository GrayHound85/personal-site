type GradientVariant = "hero" | "subtle" | "minimal";

type Glow = {
  className: string;
};

const variants: Record<GradientVariant, Glow[]> = {
  hero: [
    {
      className: `
                left-1/2
                -translate-x-1/2
                top-[-45%]

                h-[clamp(900px,75vw,1100px)]
                w-[clamp(900px,75vw,1100px)]

                bg-cyan-400
                opacity-50

                blur-[160px]
                lg:blur-[200px]
            `,
    },

    {
      className: `
                left-[-20%]
                top-[-5%]

                h-[clamp(500px,50vw,750px)]
                w-[clamp(500px,50vw,750px)]

                bg-blue-400
                opacity-40

                blur-[150px]
                lg:blur-[180px]
            `,
    },

    {
      className: `
                right-[-20%]
                top-0

                h-[clamp(500px,50vw,750px)]
                w-[clamp(500px,50vw,750px)]

                bg-teal-400
                opacity-40

                blur-[150px]
                lg:blur-[180px]
            `,
    },
  ],

  subtle: [
    {
      className: `
                left-1/2
                -translate-x-1/2
                top-[-45%]

                h-[clamp(750px,80vw,1200px)]
                w-[clamp(750px,80vw,1200px)]

                bg-cyan-400
                opacity-35

                blur-[180px]
            `,
    },

    {
      className: `
                left-[-30%]
                top-0

                h-[clamp(450px,45vw,700px)]
                w-[clamp(450px,45vw,700px)]

                bg-blue-400
                opacity-20

                blur-[160px]
            `,
    },

    {
      className: `
                right-[-30%]
                top-0

                h-[clamp(450px,45vw,700px)]
                w-[clamp(450px,45vw,700px)]

                bg-teal-400
                opacity-20

                blur-[160px]
            `,
    },
  ],

  minimal: [
    {
      className: `
                right-[-10%]
                top-[-10%]

                h-[clamp(350px,35vw,600px)]
                w-[clamp(350px,35vw,600px)]

                bg-cyan-500

                opacity-20

                blur-[160px]
            `,
    },
  ],
};

type GradientBackgroundProps = {
  variant?: GradientVariant;
};

export default function GradientBackground({
  variant = "hero",
}: GradientBackgroundProps) {
  return (
    <div
      className="
                fixed
                inset-0

                overflow-hidden
                backdrop-blur-[20px]
                pointer-events-none

                z-0
            "
    >
      {variants[variant].map((glow, index) => (
        <div
          key={index}
          className={`
                            absolute
                            rounded-full

                            ${glow.className}
                        `}
        />
      ))}

      <div
        className="
                    absolute
                    inset-x-0
                    bottom-0

                    h-[30vh]
                    md:h-[45vh]

                    bg-linear-to-b
                    from-transparent
                    to-slate-900
                "
      />
    </div>
  );
}
