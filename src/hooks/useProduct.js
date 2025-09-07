// hooks/useProduct.ts
import { useQuery } from "@tanstack/react-query";
import { Product as productAPI } from "../api/productAPI";

export function useProduct(search) {
	return useQuery({
		queryKey: ["product", search],
		queryFn: () =>
			productAPI.getAll({ q: search }), // هنا نغلفها في object
		enabled: true,
		cacheTime: 10 * 60 * 1000,
		keepPreviousData: false, // 👈 مهم هنا
		staleTime: 0,
	});
}
