type ProjectImagePlaceholderProps = {
  title: string;
  description: string;
};

export default function ProjectImagePlaceholder({
  title,
  description,
}: ProjectImagePlaceholderProps) {
  return (
    <figure className="overflow-hidden rounded-card_inner border border-border bg-panel/30">
      <div className="flex aspect-16/7 min-h-32 items-center justify-center border-b border-dashed border-border px-5 text-center">
        <div>
          <p className="text-xs font-semibold uppercase text-primary">
            Image placeholder
          </p>
          <p className="mt-2 font-medium text-text-primary">{title}</p>
        </div>
      </div>
      <figcaption className="px-4 py-3 text-sm leading-6 text-text-secondary">
        {description}
      </figcaption>
    </figure>
  );
}
