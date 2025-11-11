export default function StackLayout({ children }: { children: React.ReactNode }) {
  // 헤더는 이제 TransitionLayout에서 처리
  return (
    <div
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {children}
    </div>
  );
}
