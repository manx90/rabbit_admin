import axiosClient from "./axiosClient";

const mainDirection = "/size-tables";

export class SizeTable {
	static getAll = () =>
		axiosClient.get(mainDirection);

	static getOne = (id) =>
		axiosClient.get(`${mainDirection}/${id}`);

	static create = (data) =>
		axiosClient.post(mainDirection, data);

	static update = (id, data) =>
		axiosClient.put(
			`${mainDirection}/${id}`,
			data,
		);

	static delete = (id) =>
		axiosClient.delete(`${mainDirection}/${id}`);
}
