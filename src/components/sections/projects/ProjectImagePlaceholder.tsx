import Image from "next/image";

type ProjectImagePlaceholderProps = {
  title: string;
  description: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export default function ProjectImagePlaceholder({
  title,
  description,
  image,
  imageWidth = 1600,
  imageHeight = 700,
}: ProjectImagePlaceholderProps) {
  return (
    <figure className="overflow-hidden rounded-card_inner border border-border bg-panel/30">
      {image ? (
        <div className="w-full border-b border-border">
          <Image
            src={image}
            alt={title}
            width={imageWidth}
            height={imageHeight}
            sizes="(max-width: 768px) 100vw, 896px"
            quality={95}
            className="h-auto w-full object-contain"
          />
        </div>
      ) : (
        <div className="flex aspect-16/7 min-h-32 items-center justify-center border-b border-dashed border-border px-5 text-center">
          <div>
            <p className="text-xs font-semibold uppercase text-primary">
              Image placeholder
            </p>
            <p className="mt-2 font-medium text-text-primary">{title}</p>
          </div>
        </div>
      )}

      <figcaption className="px-4 py-3 text-sm leading-6 text-text-secondary">
        {description}
      </figcaption>
    </figure>
  );
}
