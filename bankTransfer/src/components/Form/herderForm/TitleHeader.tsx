export function TitleHeader({ children }: { children: React.ReactNode }) {
    return (
      <h2 className="mt-1 text-center text-3xl font-bold tracking-tight text-gray-900">
        {children}
      </h2>
    );
  }