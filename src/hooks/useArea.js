import { useQuery } from "@tanstack/react-query";
import { Optos as optosApi } from "../api/optosApi";

export function useArea(cityId) {
  return useQuery({
    queryKey: ["Area", cityId],
    queryFn: () => optosApi.gitArea(cityId),
  });
}
