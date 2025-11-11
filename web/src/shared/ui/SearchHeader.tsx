import { Icon } from "./Icon";

export function SearchHeader() {
  return (
    <header
      className="fixed top-0 z-40 w-full bg-gray0 px-5 py-4"
      style={{
        paddingTop: "calc(14px + env(safe-area-inset-top))",
      }}
    >
      <div className="flex h-10 w-full items-center gap-1.5 rounded-lg bg-gray50 pl-3 pr-3.5 py-2">
        <Icon name="search" size={20} color="gray600" />
        <input
          type="text"
          placeholder="메뉴를 검색해주세요"
          readOnly
          className="w-full outline-none text-body2-regular text-gray900 placeholder:text-gray600"
        />
      </div>
    </header>
  );
}
