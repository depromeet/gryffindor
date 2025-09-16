import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/entities/user";
import { queryKeys } from "@/shared/api";

export function SampleUser() {
  const { data } = useQuery({
    queryKey: queryKeys.USER_PROFILE(),
    queryFn: () => userApi.getUserProfile(),
  });

  return <div>{data?.response?.nickname}</div>;
}
