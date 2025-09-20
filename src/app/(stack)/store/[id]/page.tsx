"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { use, useEffect, useRef, useState } from "react";
import { MenuItem } from "@/entities/store/ui";
import { SeatImageGallery, SeatInfoSection, StoreInfo, SuggestionCard } from "@/features/store/ui";
import { ReviewSection } from "@/features/store/ui/ReviewSection";
import { TextButton, TransitionLayout } from "@/shared/ui";

const MOCK_DATA = [
  {
    storeId: 1,
    thumbnails: [],
    level: 3,
    name: "진짜 맛있는 필앤필버거 역삼본점 두 줄이면 이렇게 보임",
    address: "서울시 마포구 와우산로 94",
    phone: "02-1234-5678",
    menus: [
      {
        name: "대표 메뉴 1",
        price: 12000,
        isRepresentative: true,
        imageUrl: "",
      },
      {
        name: "일반 메뉴 1",
        price: 9000,
        isRepresentative: false,
        imageUrl: "",
      },
      {
        name: "일반 메뉴 2",
        price: 8000,
        isRepresentative: false,
        imageUrl: "",
      },
    ],
    seatInfo: {
      cubicle: true,
      barTable: false,
      forOne: true,
      forTwo: true,
      forFour: false,
    },
    seatImages: [
      {
        imageUrl: "",
        seatType: "cubicle",
      },
      {
        imageUrl: "",
        seatType: "barTable",
      },
      {
        imageUrl: "",
        seatType: "forOne",
      },
      {
        imageUrl: "",
        seatType: "forTwo",
      },
      {
        imageUrl: "",
        seatType: "forFour",
      },
    ],
  },
];

const MOCK_REVIEWS = [
  {
    id: 1,
    content: "대표메뉴로 먹었는데 육즙도 많고 맛있어서 만족합니다 😊",
    reviewer: {
      id: 1,
      nickname: "어딜 빼먹 내 밥그릇",
      profileImageUrl: "",
      level: 5,
    },
    keywords: ["BEST_TASTE", "WIDE_SPACE"],
    createdAt: "2025-09-12T10:30:00.000Z",
    updatedAt: "2025-09-12T10:30:00.000Z",
  },
  {
    id: 2,
    content: "분위기가 조용해서 혼밥하기 딱 좋아요.",
    reviewer: {
      id: 2,
      nickname: "혼밥러",
      profileImageUrl: "",
      level: 2,
    },
    keywords: ["CLEAN", "GOOD_SERVICE"],
    createdAt: "2025-09-15T14:22:00.000Z",
    updatedAt: "2025-09-15T14:22:00.000Z",
  },
  {
    id: 3,
    content: "가성비 최고! 다음에 또 방문할 예정입니다.",
    reviewer: {
      id: 3,
      nickname: "밥도둑",
      profileImageUrl: "",
      level: 1,
    },
    keywords: ["BEST_TASTE"],
    createdAt: "2025-09-18T09:00:00.000Z",
    updatedAt: "2025-09-18T09:00:00.000Z",
  },
  {
    id: 4,
    content: "직원분들이 친절해서 기분 좋게 먹고 왔습니다.",
    reviewer: {
      id: 4,
      nickname: "밥잇",
      profileImageUrl: "",
      level: 4,
    },
    keywords: ["GOOD_SERVICE"],
    createdAt: "2025-09-18T12:15:00.000Z",
    updatedAt: "2025-09-18T12:15:00.000Z",
  },
  {
    id: 5,
    content: "가게가 깨끗하고 쾌적해서 자주 올 것 같아요.",
    reviewer: {
      id: 5,
      nickname: "청소요정",
      profileImageUrl: "",
      level: 3,
    },
    keywords: ["CLEAN"],
    createdAt: "2025-09-19T08:45:00.000Z",
    updatedAt: "2025-09-19T08:45:00.000Z",
  },
];

const fetchReviews = async ({ pageParam = 0, limit = 3 }) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const allReviews = MOCK_REVIEWS;
  const startIndex = pageParam;
  const endIndex = startIndex + limit;
  const page = allReviews.slice(startIndex, endIndex);

  const nextCursor = endIndex < allReviews.length ? endIndex : undefined;

  return { reviews: page, nextCursor };
};

export default function StoreDetailPage(props: PageProps<"/store/[id]">) {
  const { params } = props;
  const resolvedParams = use(params);
  const store = MOCK_DATA.find((s) => s.storeId === Number(resolvedParams.id))!;

  const [isInfiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["reviews", store.storeId],
    queryFn: ({ pageParam }) => fetchReviews({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const handleLoadMoreClick = () => {
    if (hasNextPage) {
      fetchNextPage();
      setInfiniteScrollEnabled(true);
    }
  };

  useEffect(() => {
    if (!isInfiniteScrollEnabled || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    const trigger = loadMoreTriggerRef.current;
    if (trigger) {
      observer.observe(trigger);
    }

    return () => {
      if (trigger) {
        observer.unobserve(trigger);
      }
    };
  }, [isInfiniteScrollEnabled, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const reviews = data?.pages.flatMap((page) => page.reviews) || [];

  return (
    <TransitionLayout dynamicTitle={store.name}>
      <div className="flex flex-col bg-gray0">
        <StoreInfo {...store} />
        <div className="h-1 w-full bg-gray50"></div>
        <article className="mt-5 flex w-full flex-col gap-3 pl-5">
          <span className="text-[#000] text-subtitle1">혼밥 메뉴</span>
          <div className="flex flex-col gap-3">
            {store.menus.map((menu) => (
              <MenuItem key={menu.name} {...menu} />
            ))}
          </div>
        </article>
        <SeatInfoSection seatInfo={store.seatInfo} />
        <SeatImageGallery
          storeName={store.name}
          level={store.level}
          userName="홍길동"
          images={store.seatImages}
        />
        <ReviewSection reviews={reviews} loadMoreRef={loadMoreTriggerRef} />

        <div className="mt-4 flex justify-center px-5">
          {hasNextPage && !isInfiniteScrollEnabled && (
            <TextButton label="더보기" isIcon onClick={handleLoadMoreClick} />
          )}
        </div>
        <div className="px-5 pb-[59px]">
          <SuggestionCard />
        </div>
      </div>
    </TransitionLayout>
  );
}
