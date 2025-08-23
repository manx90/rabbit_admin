import axiosClient from "./axiosClient";

const mainDirection = "/category";
export class Category {
	static getAll = () =>
		axiosClient.get(mainDirection);
	static getOne = (id) =>
		axiosClient.get(`${mainDirection}/${id}`);
	static getSubCategory = () =>
		axiosClient.get(
			`${mainDirection}/subCategory`,
		);
	static createCategory = (formData) =>
		axiosClient.post(mainDirection, formData);
	static createSubCategory = (formData) =>
		axiosClient.post(
			`${mainDirection}/subCategory`,
			formData,
		);
	static updateCategory = (id, formData) =>
		axiosClient.put(
			`${mainDirection}/${id}`,
			formData,
		);
	static updateSubCategory = (
		SubCategoryId,
		CategoryId,
		formData,
	) =>
		axiosClient.put(
			`${mainDirection}/${CategoryId}/subCategory/${SubCategoryId}`,
			formData,
		);
	static deleteOneCategory = (id) =>
		axiosClient.delete(`${mainDirection}/${id}`);

	static deleteOneSubCategory = (id) =>
		axiosClient.delete(
			`${mainDirection}/subcategory/${id}`,
		);
}
