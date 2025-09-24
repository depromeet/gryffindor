import { STORE_LIST_MOCK_DATA } from "../model/mocks";
import { StoreLevelList } from "./StoreLevelList";
import { StoreList } from "./StoreList";

export function StoreListSection() {
  // TODO: API 연동 후, 목 데이터 제거
  return (
    <section className="flex flex-col bg-gray0 px-[20px]">
      <StoreLevelList />
      <StoreList storeList={STORE_LIST_MOCK_DATA} />
    </section>
  );
}
