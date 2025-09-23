import CallIcon from "./call.svg";
import CharacterIcon from "./character.svg";
import CheckIcon from "./check.svg";
import CloseIcon from "./close.svg";
import ColorNoteIcon from "./color-note.svg";
import ColorSpeakerIcon from "./color-speaker.svg";
import ColorTestIcon from "./color-test.svg";
import CrownIcon from "./crown.svg";
import DownArrowIcon from "./down-arrow.svg";
import DownTriangleIcon from "./down-triangle.svg";
import FilterIcon from "./filter.svg";
import HomeIcon from "./home.svg";
import KeBabIcon from "./kebab.svg";
import LeftArrowIcon from "./left-arrow.svg";
import LocationIcon from "./location.svg";
import MapIcon from "./map.svg";
import MapBubbleIcon from "./map-bubble.svg";
import RefreshIcon from "./refresh.svg";
import SearchIcon from "./search.svg";
import SpeakerIcon from "./speaker.svg";
import TargetIcon from "./target.svg";
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
  call: CallIcon,
  location: LocationIcon,
  kebab: KeBabIcon,
  character: CharacterIcon,
  mapBubble: MapBubbleIcon,
  downTriangle: DownTriangleIcon,
  target: TargetIcon,
  refresh: RefreshIcon,
  filter: FilterIcon,
  colorNote: ColorNoteIcon,
  colorSpeaker: ColorSpeakerIcon,
  colorTest: ColorTestIcon,
} as const;
