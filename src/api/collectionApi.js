import axiosClient from "./axiosClient";

const mainDirection = "/collections";
export class Collection {
  static createCollection = async (data) => {
    try {
      const res = await axiosClient.post(mainDirection, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
}
