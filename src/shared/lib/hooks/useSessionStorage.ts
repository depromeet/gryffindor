"use client";

interface StorageData<T> {
  value: T;
  expireAt?: number;
}

export function useSessionStorage<T = boolean>(target: string) {
  // SSR 대응
  if (typeof window === "undefined") {
    return {
      getSession: () => null as T | null,
      setSession: () => {},
      deleteSession: () => {},
      isExpired: () => false,
    };
  }

  const getSession = (): T | null => {
    try {
      const raw = sessionStorage.getItem(target);
      if (!raw) return null;

      const data: StorageData<T> = JSON.parse(raw);

      console.log("data", data);

      // 만료 시간 체크
      if (data.expireAt && Date.now() > data.expireAt) {
        sessionStorage.removeItem(target);
        return null;
      }

      return data.value;
    } catch (error) {
      console.warn(`Failed to parse sessionStorage item "${target}":`, error);
      sessionStorage.removeItem(target); // 손상된 데이터 제거
      return null;
    }
  };

  const setSession = (value: T, expireAt?: number) => {
    try {
      const data: StorageData<T> = {
        value,
        expireAt: expireAt ? expireAt : undefined,
      };

      sessionStorage.setItem(target, JSON.stringify(data));
    } catch (error) {
      console.warn(`Failed to set sessionStorage item "${target}":`, error);
    }
  };

  const deleteSession = () => {
    try {
      sessionStorage.removeItem(target);
    } catch (error) {
      console.warn(`Failed to remove sessionStorage item "${target}":`, error);
    }
  };

  const isExpired = (): boolean => {
    try {
      const raw = sessionStorage.getItem(target);
      if (!raw) return false;

      const data: StorageData<T> = JSON.parse(raw);
      return !!(data.expireAt && Date.now() > data.expireAt);
    } catch {
      return false;
    }
  };

  return { getSession, setSession, deleteSession, isExpired };
}
