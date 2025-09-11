// services/OrderService.jsx
import { useQuery } from "@tanstack/react-query";
import { Order as OrderApi } from "../../../api/orderApi";

export function useOrders() {
	return useQuery({
		queryKey: ["Order"],
		queryFn: () => OrderApi.getAll(),
		retry: 3,
		retryDelay: 1000,
		staleTime: 5 * 60 * 1000, // 5 minutes
		onError: (error) => {
			console.error(
				"Failed to fetch orders:",
				error,
			);
		},
	});
}
