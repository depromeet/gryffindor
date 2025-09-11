/**
 * 태그 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.label - 태그의 레이블
 * @param {string} props.size - 태그의 크기 (small | large)
 * @returns {JSX.Element}
 *
 *
 * @example
 * return (
 *   <>
 *     <Tag label="대표" size="small" />
 *   </>
 * );
 */

interface TagProps {
  label: string;
  size: "small" | "large";
}

export function Tag({ label, size }: TagProps) {
  return (
    <article
      className={`flex shrink-0 ${
        size === "large" ? "min-w-[2.875rem] h-[1.625rem]" : "h-[1.1875rem]"
      } items-center justify-center px-1 py-[1px] rounded-[3px] bg-primary100`}
    >
      <p
        className={`whitespace-nowrap ${
          size === "large" ? "text-body3-semibold" : "text-caption2-semibold"
        } text-tag-text-color`}
      >
        {label}
      </p>
    </article>
  );
}
