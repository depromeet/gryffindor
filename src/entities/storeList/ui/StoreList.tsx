import Link from "next/link";
import { type SeatingType, StoreCard } from "./StoreCard";
import { StoreLevelList } from "./StoreLevelList";

export function StoreList() {
  const SampleStoreList = [
    {
      id: 1,
      // thumbnailUrls: ,
      level: "1",
      name: "필앤필버거 역삼본점",
      distance: "100m",
      seatingTypes: ["FOR_ONE", "BAR"] as SeatingType[],
      signatureMenu: "시그니처필&필 버거",
    },
    {
      id: 2,
      // thumbnailUrls: "",
      level: "1",
      name: "필앤필버거 역삼본점",
      distance: "100m",
      seatingTypes: ["FOR_ONE", "BAR"] as SeatingType[],
      signatureMenu: "시그니처필&필 버거",
    },
    {
      id: 3,
      // thumbnailUrls: ,
      level: "1",
      name: "필앤필버거 역삼본점",
      distance: "100m",
      seatingTypes: ["FOR_ONE", "BAR"] as SeatingType[],
      signatureMenu: "시그니처필&필 버거",
    },
    {
      id: 4,
      // thumbnailUrls: ,
      level: "1",
      name: "필앤필버거 역삼본점",
      distance: "100m",
      seatingTypes: ["FOR_ONE", "BAR"] as SeatingType[],
      signatureMenu: "시그니처필&필 버거",
    },
    {
      id: 5,
      // thumbnailUrls: ,
      level: "1",
      name: "필앤필버거 역삼본점",
      distance: "100m",
      seatingTypes: ["FOR_ONE", "BAR"] as SeatingType[],
      signatureMenu: "시그니처필&필 버거",
    },
  ];

  return (
    <div className="flex flex-col bg-gray0 px-[20px]">
      <StoreLevelList />
      <ul className="flex flex-col gap-y-[15px]">
        {SampleStoreList.map((store) => (
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
