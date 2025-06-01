export default function FeatureCard({
  title,
  paragraph,
  firstPath,
  secondPath,
}: {
  title: string;
  paragraph: string;
  firstPath: string;
  secondPath: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100">
      <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="sdx24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-800"
        >
          <path d={firstPath} />

          {secondPath && <path d={secondPath} />}
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{paragraph}</p>
    </div>
  );
}

