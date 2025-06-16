import axiosClient from "./axiosClient";

const mainDirection = "/product";

export class Product {
	static getAll = () =>
		axiosClient.get(mainDirection);

	static getOne = (id) =>
		axiosClient.get(`${mainDirection}/${id}`);

	static create = (formData) =>
		axiosClient.post(mainDirection, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

	static update = (id, formData) =>
		axiosClient.put(
			`${mainDirection}/${id}`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);

	static deleteOne = (id) =>
		axiosClient.delete(`${mainDirection}/${id}`);
}
