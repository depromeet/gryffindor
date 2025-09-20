import CallIcon from "./call.svg";
import CharacterIcon from "./character.svg";
import CheckIcon from "./check.svg";
import CloseIcon from "./close.svg";
import CrownIcon from "./crown.svg";
import DownArrowIcon from "./down-arrow.svg";
import HomeIcon from "./home.svg";
import KeBabIcon from "./kebab.svg";
import LeftArrowIcon from "./left-arrow.svg";
import LocationIcon from "./location.svg";
import MapIcon from "./map.svg";
import SearchIcon from "./search.svg";
import SpeakerIcon from "./speaker.svg";
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
} as const;
