export function RecentSearchHeader({ onDelete }: { onDelete: () => void }) {
  return (
    <div className="flex items-center justify-between px-5">
      <span className="text-body3-semibold text-gray900">최근 검색</span>
      <button type="button" onClick={onDelete} className="text-body3-regular text-gray600">
        전체 삭제
      </button>
    </div>
  );
}
