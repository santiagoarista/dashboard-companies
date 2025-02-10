import { Logo } from "@/components/Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Logo />
      <h1 className="text-2xl font-bold mb-5 p-4"> Welcome to my Dashboard!</h1>
      {children}
    </div>
  );
}

