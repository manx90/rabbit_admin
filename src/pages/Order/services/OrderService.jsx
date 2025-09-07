// services/OrderService.jsx
import { useQuery } from "@tanstack/react-query";
import { Order as OrderApi } from "../../../api/orderApi";

export function useOrders() {
  return useQuery({
    queryKey: ["Order"],
    queryFn: () => OrderApi.getAll(),
  });
}
