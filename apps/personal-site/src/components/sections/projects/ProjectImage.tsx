import Image from "next/image";

type ProjectImageProps = {
  title: string;
  description: string;
  // Path under public/, e.g. "/projects/homelab_finished_server.jpg".
  // Leave it out to show a placeholder while the image doesn't exist yet.
  src?: string;
  // The image's real size, only used for its aspect ratio
  width?: number;
  height?: number;
};

export default function ProjectImage({
  title,
  description,
  src,
  width = 1600,
  height = 900,
}: ProjectImageProps) {
  return (
    <figure className="overflow-hidden rounded-card_inner border border-white/10 bg-panel/50">
      <p className="border-b border-white/10 px-4 py-2 font-mono text-xs text-text-secondary">
        {title}
      </p>

      {src ? (
        <Image
          src={src}
          alt={title}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 896px"
          quality={95}
          className="h-auto w-full"
        />
      ) : (
        <div className="flex aspect-16/7 items-center justify-center border-b border-dashed border-white/20 px-5 text-center">
          <p className="font-mono text-xs uppercase text-primary">
            Image placeholder
          </p>
        </div>
      )}

      <figcaption className="px-4 py-3 text-sm leading-6 text-text-secondary">
        {description}
      </figcaption>
    </figure>
  );
}
