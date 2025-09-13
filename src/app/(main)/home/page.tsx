import { auth } from "@/auth";
import { SampleAuthStateInfo } from "@/features/auth/ui";
import { TransitionLayout } from "@/shared/ui";

export default async function HomePage() {
  const session = await auth();

  const isAuthenticated = !!session;
  const userName = session?.user?.name || "새로운 이잉";

  return (
    <TransitionLayout>
      <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
        <h1>웹컴투 그린핀도르</h1>
        <SampleAuthStateInfo isAuthenticated={isAuthenticated} userName={userName} />
      </div>
    </TransitionLayout>
  );
}
