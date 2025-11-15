"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TABS = ["혼밥 메뉴", "좌석 정보", "방문 후기", "근처 식당"];

interface TabNavProps {
  sectionRefs: React.RefObject<HTMLElement | null>[];
}

export function TabNav({ sectionRefs }: TabNavProps) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.findIndex((ref) => ref.current === entry.target);
            if (index !== -1) {
              setActiveTab(TABS[index]);
            }
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      },
    );

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);

  const handleTabClick = (tab: string) => {
    const index = TABS.indexOf(tab);
    const target = sectionRefs[index].current;
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="flex w-full border-b border-gray-100 bg-white px-5 pt-4">
      {TABS.map((tab) => (
        <button
          type="button"
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`${
            activeTab === tab ? "text-gray-900" : "text-gray-500"
          } relative flex-1 pb-2 text-body1-semibold transition-colors whitespace-nowrap`}
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-700"
            />
          )}
        </button>
      ))}
    </nav>
  );
}
