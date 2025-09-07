import axiosClient from "./axiosClient";

const mainDirection = "/order";

export class Order {
	static getAll = () =>
		axiosClient.get(mainDirection);
	static getOne = (id) =>
		axiosClient.get(`${mainDirection}/${id}`);
	static create = (formData) =>
		axiosClient.post(
			`${mainDirection}/create`,
			formData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	static readyBy = (id) =>
		axiosClient.put(
			`${mainDirection}/readyBy/${id}`,
		);
	static readied = (id) =>
		axiosClient.put(
			`${mainDirection}/readied/${id}`,
		);
	static cancelled = (id) =>
		axiosClient.put(
			`${mainDirection}/cancelled/${id}`,
		);
	static shipped = (id) =>
		axiosClient.put(
			`${mainDirection}/shipped/${id}`,
		);
	static update = (id, formData) =>
		axiosClient.put(
			`${mainDirection}/update/${id}`,
			formData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	static deleteOne = (id) =>
		axiosClient.delete(`${mainDirection}/${id}`);
	static countPending = async () =>
		await axiosClient.get(
			`${mainDirection}/count/pending`,
		);
	static countCancelled = () =>
		axiosClient.get(
			`${mainDirection}/count/cancelled`,
		);
	static countShipped = () =>
		axiosClient.get(
			`${mainDirection}/count/shipped`,
		);
	static countReadied = () =>
		axiosClient.get(
			`${mainDirection}/count/readied`,
		);
}
