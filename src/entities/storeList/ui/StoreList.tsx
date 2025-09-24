import Link from "next/link";
import type { StoreListResponse } from "../api";
import { StoreCard } from "./StoreCard";

export function StoreList({ storeList }: { storeList: StoreListResponse[] }) {
  return (
    <ul className="flex flex-col gap-y-[15px]">
      {storeList.map((store) => (
        <li key={store.id}>
          <Link href={`#`}>
            <StoreCard {...store} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
