import Link from "next/link";
import { STORE_LIST_MOCK_DATA } from "../model";
import { StoreCard } from "./StoreCard";
import { StoreLevelList } from "./StoreLevelList";

export function StoreList() {
  // TODO: API 연동 후, 목 데이터 제거
  return (
    <section className="flex flex-col bg-gray0 px-5">
      <StoreLevelList />
      <ul className="flex flex-col gap-y-[15px]">
        {STORE_LIST_MOCK_DATA.map((store) => (
          <li key={store.id}>
            <Link href={`#`}>
              <StoreCard {...store} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
