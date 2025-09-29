import type { Review } from "../model";

const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    content: "대표메뉴로 먹었는데 육즙도 많고 맛있어서 만족합니다 😊",
    reviewer: {
      id: 1,
      nickname: "어딜 빼먹 내 밥그릇",
      profileImageUrl: "",
      level: 5,
    },
    keywords: ["BEST_TASTE", "OPEN_ATMOSPHERE"],
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
    keywords: ["OPEN_ATMOSPHERE", "GOOD_FOR_SOLO"],
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
    keywords: ["GOOD_FOR_SOLO", "BEST_TASTE"],
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

export const fetchReviews = async ({ pageParam = 0, limit = 3 }) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const allReviews = MOCK_REVIEWS;
  const startIndex = pageParam;
  const endIndex = startIndex + limit;
  const page = allReviews.slice(startIndex, endIndex);

  const nextCursor = endIndex < allReviews.length ? endIndex : undefined;

  return { reviews: page, nextCursor };
};
