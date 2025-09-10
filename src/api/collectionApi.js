/* eslint-disable no-useless-catch */
import axiosClient from "./axiosClient";

const mainDirection = "/collections";
export class Collection {
	static createCollection = async (data) => {
		try {
			// If data is FormData, let axios set the multipart boundary automatically
			const isFormData =
				typeof FormData !== "undefined" &&
				data instanceof FormData;
			const config = isFormData
				? {}
				: {
						headers: {
							"Content-Type": "application/json",
						},
				  };

			const res = await axiosClient.post(
				mainDirection,
				data,
				config,
			);
			return res;
		} catch (error) {
			throw error;
		}
	};
}
