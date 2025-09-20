"use client";

import { useState } from "react";
import { axiosInstance } from "@/shared/config";
import { Button } from "@/shared/ui/Button";
import { StackHeader } from "@/shared/ui/StackHeader";
import { Tag } from "@/shared/ui/Tag";

interface Address {
  address: string;
  latitude: number;
  longitude: number;
}

interface StoreImage {
  imageUrl: string;
  isMain: boolean;
}

interface Menu {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
}

interface SeatOption {
  seatType: "FOR_ONE" | "FOR_TWO" | "FOR_FOUR" | "BAR_TABLE" | "CUBICLE";
  imageUrl: string;
}

interface Store {
  name: string;
  address: Address;
  phoneNumber: string;
  description: string;
  mainImageUrl: string;
  honbobLevel: number;
  categories: {
    primaryCategory: string;
  };
  storeImages: StoreImage[];
  menus: Menu[];
  seatOptions: SeatOption[];
}

const CATEGORIES = [
  { value: "한식", label: "한식", icon: "🍚" },
  { value: "일식", label: "일식", icon: "🍣" },
  { value: "중식", label: "중식", icon: "🥟" },
  { value: "양식", label: "양식", icon: "🍝" },
  { value: "패스트푸드", label: "패스트푸드", icon: "🍔" },
  { value: "분식", label: "분식", icon: "🥙" },
  { value: "아시아음식", label: "아시아음식", icon: "🍜" },
  { value: "카페", label: "카페", icon: "☕" },
  { value: "기타", label: "기타", icon: "🍽️" },
] as const;

const SEAT_TYPES = [
  { value: "FOR_ONE", label: "1인용", icon: "1️⃣" },
  { value: "FOR_TWO", label: "2인용", icon: "2️⃣" },
  { value: "FOR_FOUR", label: "4인용", icon: "4️⃣" },
  { value: "BAR_TABLE", label: "바 좌석", icon: "🍷" },
  { value: "CUBICLE", label: "칸막이", icon: "🏢" },
] as const;

const INITIAL_FORM_DATA: Store = {
  name: "",
  address: { address: "", latitude: 0, longitude: 0 },
  phoneNumber: "",
  description: "",
  mainImageUrl: "",
  honbobLevel: 0,
  categories: { primaryCategory: "" },
  storeImages: [{ imageUrl: "", isMain: true }],
  menus: [{ id: crypto.randomUUID(), name: "", price: "", imageUrl: "" }],
  seatOptions: [{ seatType: "FOR_ONE", imageUrl: "" }],
};

export default function AdminPage() {
  const [formData, setFormData] = useState<Store>(INITIAL_FORM_DATA);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/api/admin/stores", [formData]);
      alert("가게 정보가 성공적으로 추가되었습니다!");
      console.log("Response:", response);

      // 폼 초기화
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      console.error("Error:", error);
      alert("가게 정보 추가 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const addStoreImage = () => {
    setFormData((prev) => ({
      ...prev,
      storeImages: [...prev.storeImages, { imageUrl: "", isMain: false }],
    }));
  };

  const removeStoreImage = (index: number) => {
    if (formData.storeImages.length > 1) {
      setFormData((prev) => ({
        ...prev,
        storeImages: prev.storeImages.filter((_, i) => i !== index),
      }));
    }
  };

  const addMenu = () => {
    setFormData((prev) => ({
      ...prev,
      menus: [...prev.menus, { id: crypto.randomUUID(), name: "", price: "", imageUrl: "" }],
    }));
  };

  const removeMenu = (index: number) => {
    if (formData.menus.length > 1) {
      setFormData((prev) => ({
        ...prev,
        menus: prev.menus.filter((_, i) => i !== index),
      }));
    }
  };

  const addSeatOption = () => {
    setFormData((prev) => ({
      ...prev,
      seatOptions: [...prev.seatOptions, { seatType: "FOR_ONE", imageUrl: "" }],
    }));
  };

  const removeSeatOption = (index: number) => {
    if (formData.seatOptions.length > 1) {
      setFormData((prev) => ({
        ...prev,
        seatOptions: prev.seatOptions.filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <StackHeader
        config={{
          title: "가게 정보 등록",
          backButton: {
            action: "/",
          },
        }}
      />

      <div className="mx-auto max-w-4xl space-y-6 p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. 기본 정보 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-2xl">🏪</span>
              <h2 className="font-bold text-gray-900 text-lg">1. 기본 정보</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="storeName"
                    className="mb-1 block font-medium text-gray-700 text-sm"
                  >
                    가게명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="storeName"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="가게 이름을 입력하세요"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="mb-1 block font-medium text-gray-700 text-sm"
                  >
                    전화번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="010-1234-5678"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-1 block font-medium text-gray-700 text-sm"
                >
                  가게 설명
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="h-24 w-full resize-none rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="가게에 대한 설명을 입력하세요"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="honbobLevel"
                    className="mb-1 block font-medium text-gray-700 text-sm"
                  >
                    혼밥 레벨 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="honbobLevel"
                    value={formData.honbobLevel}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        honbobLevel: parseInt(e.target.value, 10),
                      }))
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">레벨을 선택하세요</option>
                    {[0, 1, 2, 3, 4, 5].map((level) => (
                      <option key={level} value={level}>
                        레벨 {level} {"★".repeat(level)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="mainImageUrl"
                    className="mb-1 block font-medium text-gray-700 text-sm"
                  >
                    메인 이미지 URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="mainImageUrl"
                    type="url"
                    value={formData.mainImageUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, mainImageUrl: e.target.value }))
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="mb-2 block font-medium text-gray-700 text-sm">
                  카테고리 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          categories: { primaryCategory: category.value },
                        }))
                      }
                      className={`rounded-lg border-2 p-2 text-center transition-all hover:shadow-sm ${
                        formData.categories.primaryCategory === category.value
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="mb-1 text-lg">{category.icon}</div>
                      <div className="font-medium text-xs">{category.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. 주소 정보 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-2xl">📍</span>
              <h2 className="font-bold text-gray-900 text-lg">2. 주소 정보</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-1">
                <label htmlFor="address" className="mb-1 block font-medium text-gray-700 text-sm">
                  주소 <span className="text-red-500">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  value={formData.address.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: { ...prev.address, address: e.target.value },
                    }))
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="서울시 강남구..."
                  required
                />
              </div>

              <div>
                <label htmlFor="latitude" className="mb-1 block font-medium text-gray-700 text-sm">
                  위도 <span className="text-red-500">*</span>
                </label>
                <input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.address.latitude}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: { ...prev.address, latitude: parseFloat(e.target.value) },
                    }))
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="37.5665"
                  required
                />
              </div>

              <div>
                <label htmlFor="longitude" className="mb-1 block font-medium text-gray-700 text-sm">
                  경도 <span className="text-red-500">*</span>
                </label>
                <input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.address.longitude}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: { ...prev.address, longitude: parseFloat(e.target.value) },
                    }))
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="126.9780"
                  required
                />
              </div>
            </div>
          </div>

          {/* 3. 가게 이미지 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📸</span>
                <h2 className="font-bold text-gray-900 text-lg">3. 가게 이미지</h2>
              </div>
              <button
                type="button"
                onClick={addStoreImage}
                className="rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-700 text-sm transition-colors hover:bg-gray-200"
              >
                + 이미지 추가
              </button>
            </div>

            <div className="space-y-4">
              {formData.storeImages.map((image, index) => (
                <div
                  key={`storeImage-${image.imageUrl}-${index}`}
                  className="rounded-md border border-gray-200 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700 text-sm">이미지 {index + 1}</span>
                      {image.isMain && <Tag label="메인" color="red" size="small" />}
                    </div>
                    {formData.storeImages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStoreImage(index)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        삭제
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor={`storeImage-${index}`}
                        className="mb-1 block font-medium text-gray-700 text-sm"
                      >
                        이미지 URL <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={`storeImage-${index}`}
                        type="url"
                        value={image.imageUrl}
                        onChange={(e) => {
                          const newImages = [...formData.storeImages];
                          newImages[index].imageUrl = e.target.value;
                          setFormData((prev) => ({ ...prev, storeImages: newImages }));
                        }}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>

                    <div className="flex items-end">
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          checked={image.isMain}
                          onChange={(e) => {
                            const newImages = [...formData.storeImages];
                            newImages.forEach((img, i) => {
                              img.isMain = i === index && e.target.checked;
                            });
                            setFormData((prev) => ({ ...prev, storeImages: newImages }));
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 text-sm">메인 이미지로 설정</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. 메뉴 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍽️</span>
                <h2 className="font-bold text-gray-900 text-lg">4. 메뉴</h2>
              </div>
              <button
                type="button"
                onClick={addMenu}
                className="rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-700 text-sm transition-colors hover:bg-gray-200"
              >
                + 메뉴 추가
              </button>
            </div>

            <div className="space-y-4">
              {formData.menus.map((menu, index) => (
                <div key={menu.id} className="rounded-md border border-gray-200 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-medium text-gray-700 text-sm">메뉴 {index + 1}</span>
                    {formData.menus.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMenu(index)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        삭제
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <label
                        htmlFor={`menuName-${index}`}
                        className="mb-1 block font-medium text-gray-700 text-sm"
                      >
                        메뉴명 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={`menuName-${index}`}
                        type="text"
                        value={menu.name}
                        onChange={(e) => {
                          const newMenus = [...formData.menus];
                          newMenus[index].name = e.target.value;
                          setFormData((prev) => ({ ...prev, menus: newMenus }));
                        }}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="김치찌개"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="price"
                        className="mb-1 block font-medium text-gray-700 text-sm"
                      >
                        가격 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="price"
                        type="number"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="서울시 강남구..."
                        required
                        value={menu.price}
                        onChange={(e) => {
                          const newMenus = [...formData.menus];
                          newMenus[index].price = e.target.value;
                          setFormData((prev) => ({ ...prev, menus: newMenus }));
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`menuImage-${index}`}
                        className="mb-1 block font-medium text-gray-700 text-sm"
                      >
                        이미지 URL <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={`menuImage-${index}`}
                        type="url"
                        value={menu.imageUrl}
                        onChange={(e) => {
                          const newMenus = [...formData.menus];
                          newMenus[index].imageUrl = e.target.value;
                          setFormData((prev) => ({ ...prev, menus: newMenus }));
                        }}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/menu.jpg"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. 좌석 옵션 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🪑</span>
                <h2 className="font-bold text-gray-900 text-lg">5. 좌석 옵션</h2>
              </div>
              <button
                type="button"
                onClick={addSeatOption}
                className="rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-700 text-sm transition-colors hover:bg-gray-200"
              >
                + 좌석 추가
              </button>
            </div>

            <div className="space-y-4">
              {formData.seatOptions.map((seat, index) => (
                <div
                  key={`seat-${seat.seatType}-${seat.imageUrl}-${index}`}
                  className="rounded-md border border-gray-200 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-medium text-gray-700 text-sm">좌석 {index + 1}</span>
                    {formData.seatOptions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSeatOption(index)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        삭제
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <fieldset>
                        <legend className="mb-2 block font-medium text-gray-700 text-sm">
                          좌석 타입 <span className="text-red-500">*</span>
                        </legend>
                        <div className="grid grid-cols-2 gap-2">
                          {SEAT_TYPES.map((seatType) => (
                            <button
                              key={seatType.value}
                              type="button"
                              onClick={() => {
                                const newSeats = [...formData.seatOptions];
                                newSeats[index].seatType = seatType.value;
                                setFormData((prev) => ({ ...prev, seatOptions: newSeats }));
                              }}
                              className={`rounded-lg border-2 p-2 text-center transition-all hover:shadow-sm ${
                                seat.seatType === seatType.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="mb-1 text-lg">{seatType.icon}</div>
                              <div className="font-medium text-xs">{seatType.label}</div>
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    </div>

                    <div>
                      <label
                        htmlFor={`seatImage-${index}`}
                        className="mb-1 block font-medium text-gray-700 text-sm"
                      >
                        이미지 URL <span className="text-red-500">*</span>
                      </label>
                      <input
                        id={`seatImage-${index}`}
                        type="url"
                        value={seat.imageUrl}
                        onChange={(e) => {
                          const newSeats = [...formData.seatOptions];
                          newSeats[index].imageUrl = e.target.value;
                          setFormData((prev) => ({ ...prev, seatOptions: newSeats }));
                        }}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/seat.jpg"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="pt-4">
            <Button
              label={isLoading ? "등록 중..." : "가게 정보 등록하기"}
              type="submit"
              disabled={isLoading}
              variant="primary"
              size="large"
              fullWidth
            />
          </div>
        </form>
      </div>
    </div>
  );
}
