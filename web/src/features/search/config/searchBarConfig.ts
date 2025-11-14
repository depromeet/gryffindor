export interface SearchBarConfig {
  /** 입력 가능 여부 */
  editable: boolean;
  /** 레이아웃 설정 */
  layout: {
    needsSafeArea: boolean;
  };
  /** UI 요소 표시 여부 */
  elements: {
    backButton: boolean;
    searchIcon: boolean;
  };
}

export const SEARCH_BAR_HEIGHT = 72;

const SEARCH_BAR_CONFIGS: Record<string, SearchBarConfig> = {
  map: {
    editable: false,
    layout: {
      needsSafeArea: true,
    },
    elements: {
      backButton: false,
      searchIcon: true,
    },
  },
  search: {
    editable: true,
    layout: {
      needsSafeArea: true,
    },
    elements: {
      backButton: true,
      searchIcon: false,
    },
  },
};

export function getSearchBarConfig(pathname: string, searchQuery: string | null): SearchBarConfig {
  if (pathname === "/search") {
    return SEARCH_BAR_CONFIGS.search;
  }

  return {
    ...SEARCH_BAR_CONFIGS.map,
    elements: {
      backButton: !!searchQuery,
      searchIcon: !searchQuery,
    },
  };
}
