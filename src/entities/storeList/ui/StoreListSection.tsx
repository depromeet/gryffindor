import { STORE_LIST_MOCK_DATA } from "../model";
import { StoreLevelList } from "./StoreLevelList";
import { StorePreviewList } from "./StorePreviewList";

export function StoreListSection() {
  // TODO: API 연동 후, 목 데이터 제거
  return (
    <section className="flex flex-col bg-gray0 px-5">
      <StoreLevelList />
      <StorePreviewList storeList={STORE_LIST_MOCK_DATA} />
    </section>
  );
}
