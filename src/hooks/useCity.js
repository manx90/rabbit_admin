import { useQuery } from "@tanstack/react-query";
import { Optos as optosApi } from "../api/optosApi";

export function useCity() {
  return useQuery({
    queryKey: ["City"],
    queryFn: () => optosApi.getCity(),
  });
}
