import { useQuery } from "@tanstack/react-query";
import { Collections as CollectionsApi } from "../api/collectionsApi";
export default function useCollections() {
	return useQuery({
		queryKey: ["collections"],
		queryFn: async () => {
			return await CollectionsApi.getAll();
		},
	});
}
