/* eslint-disable no-useless-catch */
import axiosClient from "./axiosClient";

const mainDirection = "/product";

export class Product {
  static getAll = async (params = {}) => {
    try {
      const response = await axiosClient.get(mainDirection, {
        params: {
          q: params.q,
          category: params.category,
          subcategory: params.subcategory,
          limit: params.limit,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  static getOne = async (id) => {
    try {
      const response = await axiosClient.get(`${mainDirection}/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  };
  static create = async (formData) => {
    try {
      const response = await axiosClient.post(mainDirection, formData);
      return response;
    } catch (error) {
      throw error;
    }
  };
  static update = async (id, formData) => {
    try {
      const response = await axiosClient.put(
        `${mainDirection}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  static deleteOne = async (id) => {
    try {
      const response = await axiosClient.delete(`${mainDirection}/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  };
  static updateStatus = async (id) => {
    try {
      const response = await axiosClient.get(`${mainDirection}/${id}/publish`);
      return response;
    } catch (error) {
      throw error;
    }
  };
  static ShowSeasonSummer = async () => {
    try {
      const response = await axiosClient.put(
        `${mainDirection}/ShowSeason/summer`,
      );

      return response;
    } catch (error) {
      throw error;
    }
  };
  static ShowSeasonWinter = async () => {
    try {
      const response = await axiosClient.put(
        `${mainDirection}/showseason/winter`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  static ShowSeasonSpring = async () => {
    try {
      const response = await axiosClient.put(
        `${mainDirection}/showseason/spring`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  static HideSeasonSpring = async () => {
    try {
      const response = await axiosClient.put(
        `${mainDirection}/hideseason/spring`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  static HideSeasonWinter = async () => {
    try {
      const response = await axiosClient.put(
        `${mainDirection}/hideseason/winter`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  static HideSeasonSummer = async () => {
    try {
      const response = await axiosClient.put(
        `${mainDirection}/hideseason/summer`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}
