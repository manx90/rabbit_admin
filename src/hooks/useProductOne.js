// hooks/useProduct.ts
import { useQuery } from "@tanstack/react-query";
import { Product as productAPI } from "../api/productAPI";

export function useProductOne(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productAPI.getOne(id),
  });
}
