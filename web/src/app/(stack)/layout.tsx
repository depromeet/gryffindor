export default function StackLayout({ children }: { children: React.ReactNode }) {
  // 헤더는 이제 TransitionLayout에서 처리
  return <div className="overflow-x-hidden">{children}</div>;
}
