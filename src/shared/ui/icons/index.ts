import CheckIcon from "./check.svg";
import CloseIcon from "./close.svg";
import CrownIcon from "./crown.svg";
import DownArrowIcon from "./down-arrow.svg";
import FilterIcon from "./filter.svg";
import HomeIcon from "./home.svg";
import LeftArrowIcon from "./left-arrow.svg";
import MapIcon from "./map.svg";
import MapBubbleIcon from "./map-bubble.svg";
import RefreshIcon from "./refresh.svg";
import SearchIcon from "./search.svg";
import SpeakerIcon from "./speaker.svg";
import TargetIcon from "./target.svg";
import TriangleDownIcon from "./triangle-down.svg";
import UserIcon from "./user.svg";

// 아이콘 매핑 객체
export const iconMap = {
  home: HomeIcon,
  map: MapIcon,
  leftArrow: LeftArrowIcon,
  downArrow: DownArrowIcon,
  crown: CrownIcon,
  speaker: SpeakerIcon,
  user: UserIcon,
  check: CheckIcon,
  search: SearchIcon,
  close: CloseIcon,
  mapBubble: MapBubbleIcon,
  triangleDown: TriangleDownIcon,
  target: TargetIcon,
  refresh: RefreshIcon,
  filter: FilterIcon,
} as const;
