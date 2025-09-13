import { FloatingNavButton } from "@/shared/ui";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <FloatingNavButton />
      {children}
    </div>
  );
}
