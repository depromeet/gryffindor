import Link from "next/link";
import { STORE_LIST_MOCK_DATA } from "../model";
import { StoreCard } from "./StoreCard";
import { StoreLevelList } from "./StoreLevelList";

export function StoreList() {
  return (
    <div className="flex flex-col bg-gray0 px-[20px]">
      <StoreLevelList />
      <ul className="flex flex-col gap-y-[15px]">
        {STORE_LIST_MOCK_DATA.map((store) => (
          <li key={store.id}>
            <Link href={`#`}>
              {/* fixme: Link 수정 필요 */}
              <StoreCard {...store} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
