type FormHeadingProps = {
  title: string;
  // Where the new thing will go, e.g. "In Programming"
  context?: string;
};

// The heading at the top of the create forms in the resources modal
export default function FormHeading({ title, context }: FormHeadingProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary">{title}</h2>
      {context && (
        <p className="mt-1 font-mono text-xs text-text-secondary">{context}</p>
      )}
    </div>
  );
}
