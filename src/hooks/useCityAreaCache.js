import {
	useState,
	useEffect,
	useRef,
} from "react";
import { Optos as OptosApi } from "../api/optosApi";

// Global cache to store city/area data across all components
const cityAreaCache = new Map();

export const useCityAreaCache = (
	cityId,
	areaId,
) => {
	const [cityName, setCityName] = useState("");
	const [areaName, setAreaName] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const hasFetched = useRef(false);

	useEffect(() => {
		// Validate that cityId and areaId are valid numbers
		if (
			!cityId ||
			!areaId ||
			isNaN(Number(cityId)) ||
			isNaN(Number(areaId))
		) {
			setLoading(false);
			setCityName(`City ${cityId || "N/A"}`);
			setAreaName(`Area ${areaId || "N/A"}`);
			return;
		}

		const cacheKey = `${cityId}-${areaId}`;

		// Check if data is already in cache
		if (cityAreaCache.has(cacheKey)) {
			const cachedData =
				cityAreaCache.get(cacheKey);
			setCityName(cachedData.cityName);
			setAreaName(cachedData.areaName);
			setLoading(false);
			return;
		}

		// Prevent multiple fetches for the same data
		if (hasFetched.current) {
			return;
		}

		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);
				hasFetched.current = true;

				// Fetch areas for the city
				const areasResponse =
					await OptosApi.gitArea(Number(cityId));
				const areas =
					areasResponse?.[0]?.data || [];

				// Find the specific area
				const area = areas.find(
					(a) => a.id === Number(areaId),
				);

				let resultCityName = "";
				let resultAreaName = "";

				if (area) {
					resultAreaName = area.name;
					resultCityName =
						area["city.name"] || "";
				} else {
					// Show IDs as fallback
					resultAreaName = `Area ${areaId}`;
					resultCityName = `City ${cityId}`;
				}

				// Cache the result
				cityAreaCache.set(cacheKey, {
					cityName: resultCityName,
					areaName: resultAreaName,
					timestamp: Date.now(),
				});

				setCityName(resultCityName);
				setAreaName(resultAreaName);
			} catch (error) {
				console.error(
					"Error fetching area data:",
					error,
				);
				setError(error);

				// Cache error result to prevent repeated failed requests
				const fallbackCityName = `City ${cityId}`;
				const fallbackAreaName = `Area ${areaId}`;

				cityAreaCache.set(cacheKey, {
					cityName: fallbackCityName,
					areaName: fallbackAreaName,
					timestamp: Date.now(),
					error: true,
				});

				setCityName(fallbackCityName);
				setAreaName(fallbackAreaName);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [cityId, areaId]);

	// Reset hasFetched when cityId or areaId changes
	useEffect(() => {
		hasFetched.current = false;
	}, [cityId, areaId]);

	return {
		cityName,
		areaName,
		loading,
		error,
	};
};

// Utility function to clear cache if needed
export const clearCityAreaCache = () => {
	cityAreaCache.clear();
};

// Utility function to get cache size for debugging
export const getCityAreaCacheSize = () => {
	return cityAreaCache.size;
};
