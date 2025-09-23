import { MAIN_HEADER_HEIGHT } from "@/shared/config";
import { FloatingNavButton } from "@/shared/ui";
import MainHeader from "@/shared/ui/MainHeader";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ paddingTop: `${MAIN_HEADER_HEIGHT}px` }}>
      <FloatingNavButton />
      <MainHeader />
      {children}
    </div>
  );
}
