import Link from "next/link";

interface SampleAuthStateInfoProps {
  isAuthenticated: boolean;
  userName: string;
}

export function SampleAuthStateInfo({ isAuthenticated, userName }: SampleAuthStateInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <span>로그인 상태: {isAuthenticated ? "로그인" : "미로그인"}</span>
      {!isAuthenticated && <Link href="/login">로그인 페이지로 이동</Link>}
      {isAuthenticated && <Link href="/auth">마이페이지로 이동</Link>}
      {<span>{userName}님, 반가워요!</span>}
    </div>
  );
}
