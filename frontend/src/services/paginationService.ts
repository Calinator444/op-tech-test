export default function getPaginationBreadcrumbs({
  currentIndex,
  totalPages,
  windowSize,
}: {
  currentIndex: number;
  totalPages: number;
  windowSize: number;
}) {
  const start = Math.min(    
    Math.max(currentIndex - Math.floor(windowSize / 2), 0),
    Math.max(totalPages - windowSize, 0),
  );

  return Array.from(
    { length: Math.min(windowSize, totalPages) },
    (_, i) => start + i + 1,
  );
}
