// src/api/statsApi.ts
import axiosClient from "./axiosClient";

// Product stats
export class StatsApi {
	constructor() {
		this.client = axiosClient;
	}

	// Product stats
	getProductStatsOverview() {
		return this.client.get(
			"/product/stats/overview",
		);
	}

	getSalesStatistics() {
		return this.client.get(
			"/product/stats/sales",
		);
	}

	getAverageSalesPerProduct() {
		return this.client.get(
			"/product/stats/avg-sales",
		);
	}

	getTotalProductsCount() {
		return this.client.get(
			"/product/stats/total",
		);
	}

	getProductsCountByPublishState() {
		return this.client.get(
			"/product/stats/publish-state",
		);
	}

	getProductsCountBySeason() {
		return this.client.get(
			"/product/stats/season",
		);
	}

	getProductsCountByFlags() {
		return this.client.get(
			"/product/stats/flags",
		);
	}

	getProductsCreatedInLastDays(days) {
		return this.client.get(
			`/product/stats/recent/${Number(days)}`,
		);
	}

	getProductsCountByCategory() {
		return this.client.get(
			"/product/stats/category",
		);
	}

	getProductsCountBySubCategory() {
		return this.client.get(
			"/product/stats/subcategory",
		);
	}

	getTopSellingProducts(limit) {
		return limit != null
			? this.client.get(
					`/product/stats/top-selling/${Number(
						limit,
					)}`,
			  )
			: this.client.get(
					"/product/stats/top-selling",
			  );
	}

	getLowStockProducts(threshold) {
		return threshold != null
			? this.client.get(
					`/product/stats/low-stock/${Number(
						threshold,
					)}`,
			  )
			: this.client.get(
					"/product/stats/low-stock",
			  );
	}

	getProductsWithoutImages() {
		return this.client.get(
			"/product/stats/missing-images",
		);
	}

	getProductsCountByCreator() {
		return this.client.get(
			"/product/stats/creators",
		);
	}

	getScheduledProducts() {
		return this.client.get(
			"/product/stats/scheduled",
		);
	}

	getProductsCreatedInDateRange(
		startDate,
		endDate,
	) {
		return this.client.get(
			"/product/stats/date-range",
			{
				params: { startDate, endDate },
			},
		);
	}

	// Order stats
	getRevenue(opts) {
		return this.client.get(
			"/order/stats/revenue",
			{
				params: {
					startDate: opts?.startDate,
					endDate: opts?.endDate,
				},
			},
		);
	}

	getGrowth(days = 30) {
		return this.client.get(
			"/order/stats/growth",
			{
				params: { days },
			},
		);
	}
}

export default new StatsApi();
