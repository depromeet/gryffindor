export default function StackLayout({ children }: { children: React.ReactNode }) {
  // 헤더는 이제 TransitionLayout에서 처리
  // safe-area padding은 TransitionLayout에서 처리하므로 제거
  return <div className="h-full overflow-x-hidden">{children}</div>;
}
