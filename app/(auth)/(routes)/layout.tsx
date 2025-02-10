export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p>Santiago's Dashboard</p>
      <h1 className="text-2xl font-bold mb-5"> Welcome to my Dashboard!</h1>
      {children}
    </div>
  );
}
