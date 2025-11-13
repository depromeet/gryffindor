"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useRef } from "react";
import { getSearchBarConfig, SEARCH_BAR_HEIGHT } from "@/features/search";
import { Icon } from "@/shared/ui";

/**
 * 검색바 컴포넌트
 *
 * - 지도 페이지: 읽기 전용 검색바
 * - 검색 페이지: 입력 가능한 검색바
 */
export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");

  const config = getSearchBarConfig(pathname, searchQuery);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (config.editable) {
      inputRef.current?.focus();
    }
  }, [config.editable]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const keyword = inputRef.current?.value;
    if (keyword) {
      router.push(`/map?query=${encodeURIComponent(keyword)}`);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className="fixed top-0 right-0 left-0 z-40 flex items-center gap-2 px-5 py-4 w-full bg-gray0 border-b border-gray100"
      {...(config.layout.needsSafeArea && {
        style: { paddingTop: "calc(env(safe-area-inset-top) + 16px)" },
      })}
    >
      {config.elements.backButton && (
        <button type="button" onClick={handleBack} aria-label="뒤로가기">
          <Icon name="leftArrow" size={20} color="gray900" />
        </button>
      )}
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <div className="flex items-center gap-1.5 pl-3 pr-3.5 py-2 w-full h-10 rounded-lg bg-gray50">
          {config.elements.searchIcon && <Icon name="search" size={20} color="gray600" />}
          <input
            ref={inputRef}
            type="text"
            placeholder="메뉴를 검색해주세요"
            defaultValue={searchQuery || ""}
            readOnly={!config.editable}
            className="w-full outline-none bg-transparent text-body2-regular text-gray900 placeholder:text-gray600"
          />
        </div>
      </form>
    </div>
  );
}
