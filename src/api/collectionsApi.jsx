/* eslint-disable no-useless-catch */
import axiosClient from "./axiosClient";

const mainDirection = "/collections";

export class Collections {
	static getAll = async () => {
		try {
			const response = await axiosClient.get(
				mainDirection,
			);
			return response;
		} catch (error) {
			throw error;
		}
	};
	static DeleteOne = async (id) => {
		try {
			const response = await axiosClient.delete(
				`${mainDirection}/${id}`,
			);
			return response;
		} catch (error) {
			throw error;
		}
	};
}
