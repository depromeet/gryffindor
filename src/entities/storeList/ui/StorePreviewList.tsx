import Link from "next/link";
import { STORE_LIST_MOCK_DATA } from "../model";
import { StoreLevelList } from "./StoreLevelList";
import { StorePreviewCard } from "./StorePreviewCard";

export function StorePreviewList() {
  // TODO: API 연동 후, 목 데이터 제거
  return (
    <section className="flex flex-col bg-gray0 px-5">
      <StoreLevelList />
      <ul className="flex flex-col gap-y-[15px]">
        {STORE_LIST_MOCK_DATA.map((store) => (
          <li key={store.id}>
            <Link href={`#`}>
              <StorePreviewCard {...store} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
