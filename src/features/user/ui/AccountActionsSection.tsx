export function AccountActionsSection() {
  //todo: 모달띄우는는 로직 필요.

  return (
    <div className="m-auto mb-[40px] flex w-fit items-center gap-x-[16px]">
      <button type="button" className="text-body2-medium text-gray600">
        로그아웃
      </button>
      <div className="h-full w-[1px] bg-gray100 py-[4px]" />
      <button type="button">
        <span className="text-body2-medium text-gray600">회원탈퇴</span>
      </button>
    </div>
  );
}
