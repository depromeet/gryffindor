import { Icon } from "./Icon";

interface MainHeaderProps {
  isShowUserIcon?: boolean;
}

export const MAIN_HEADER_HEIGHT = 60;

function MainHeader({ isShowUserIcon = true }: MainHeaderProps) {
  return (
    <header
      className={
        "fixed top-0 z-40 flex w-full items-center justify-between bg-gray50 px-[20px] py-[14px]"
      }
    >
      {/* todo: 홈과 지도에서 색상이 다름 */}
      <section className="flex items-center gap-[2px]">
        {/* todo: 드롭다운 컴포넌트로 분리하기 */}
        <div className="font-semibold text-Gray-gray900 text-xl leading-relaxed">강남역</div>
        <Icon name="downArrow" />
      </section>
      <div className="flex items-center gap-[16px]">
        <Icon name="search" />
        {isShowUserIcon && <Icon name="user" />}
      </div>
    </header>
  );
}

export default MainHeader;
