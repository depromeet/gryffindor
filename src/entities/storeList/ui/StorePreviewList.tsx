import Link from "next/link";
import type { StoreSearchResponse } from "../api";
import { StorePreviewCard } from "./StorePreviewCard";

export function StorePreviewList({ storeList }: { storeList: StoreSearchResponse[] }) {
  return (
    <ul className="flex flex-col gap-y-[15px]">
      {storeList.map((store) => (
        <li key={store.id}>
          <Link href={`#`}>
            <StorePreviewCard {...store} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
