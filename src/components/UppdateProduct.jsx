import React from "react";
import InputSimple from "./ui/inputSimple";
import { useReducer } from "react";
import SelectButton from "./ui/selecting";
import { useProduct } from "../Contexts/Product.Context";
export default function UppdateProduct() {
  const intialValues = {
    name: "",
    description: "",
    categoryId: "",
    subcategoryId: "",
    sizes: [
      {
        sizeName: "",
        price: "",
        quantities: [
          {
            colorName: "",
            quantity: "",
          },
        ],
      },
    ],
    colors: [
      {
        name: "",
      },
    ],
    published: "",
    imgCover: null,
    imgs: [],
    imgMeasurement: null,
    imgSizeChart: null,
    imgColors: [],
  };
  const [state, dispatch] = useReducer(reducer, intialValues);
  const { styleProduct } = useProduct();
  return (
    <div className="overflow-y-auto max-w-full ">
      <div className="flex flex-col gap-6 justify-center border border-gray-200 p-6">
        <div className="w-full flex flex-col gap-6 ">
          <InputSimple
            label="Name"
            name="Enter name"
            type="text"
            className="w-full h-[48px] text-[16px] font-medium"
            cnLabel="text-[16px] font-medium"
            value={state.name}
            placeholder="Enter name"
            onChange={(e) => {
              dispatch({ type: "name", name: e.target.value });
            }}
            required
          />

          <InputSimple
            label="Description"
            name="Enter description"
            type="text"
            className="w-full h-[48px] text-[16px] font-medium"
            cnLabel="text-[16px] font-medium"
            value={state.description}
            placeholder="Enter description"
            onChange={(e) => {
              dispatch({ type: "description", description: e.target.value });
            }}
            required
          />
          <SelectButton
            label="Published"
            name="Enter published"
            className="w-full h-[48px] text-[16px] font-medium"
            cnLabel="text-[16px] font-medium"
            value={state.published}
            placeholder="Enter published"
            onChange={(e) => {
              dispatch({ type: "published", published: e.target.value });
            }}
            required
          />
          <SelectButton
            label="Category"
            name="Enter category"
            className="w-full h-[48px] text-[16px] font-medium"
            cnLabel="text-[16px] font-medium"
            value={state.categoryId}
            placeholder="Enter category"
            onChange={(e) => {
              dispatch({ type: "categoryId", categoryId: e.target.value });
            }}
            required
          />
          <SelectButton
            label="Subcategory"
            name="Enter subcategory"
            className="w-full h-[48px] text-[16px] font-medium"
            cnLabel="text-[16px] font-medium"
            value={state.subcategoryId}
            placeholder="Enter subcategory"
            onChange={(e) => {
              dispatch({
                type: "subcategoryId",
                subcategoryId: e.target.value,
              });
            }}
            required
          />
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border border-gray-200 p-4 rounded mb-4">
          <button className="absolute top-2 right-2 px-2 cursor-pointer bg-red-500 rounded-lg text-white hover:bg-red-600 transition duration-200 ease-in-out">
            remove
          </button>
          {/* Size input */}
          <div className={styleProduct.level4}>
            <label className={styleProduct.label_1}>Size</label>
            <input
              type="text"
              placeholder="Size"
              className={styleProduct.input_1}
            />
          </div>
          <div className={styleProduct.level4}>
            <label className={styleProduct.label_1}>Price</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              className={styleProduct.input_price}
            />
          </div>

          {/* Colors and quantities */}
          <div className="col-span-2">
            <label className={styleProduct.label_1}>Colors & Quantities</label>
            <div className="flex gap-2 mb-2">
              <select className={styleProduct.select} name="colorName">
                <option value="">Select Color</option>
                {state.colors.map((input) => (
                  <option key={input.name} value={input.name}>
                    {input.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                placeholder="Quantity"
                className={styleProduct.input_1}
                // value={item.quantity}
              />

              <button
                type="button"
                className="text-red-600 cursor-pointer hover:text-red-700  transition-all duration-500 ease-in-out bg-red-100 px-2 rounded hover:bg-red-200 "
              >
                Remove
              </button>
            </div>
            <button
              type="button"
              className={`${styleProduct.button} mt-2 hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out  px-4 py-2 rounded-lg cursor-pointer`}
            >
              Add Color & Quantity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function reducer(state, action) {
  switch (action.type) {
    case "name":
      return {
        name: action.name,
      };
    case "description":
      return {
        description: action.description,
      };
    case "categoryId":
      return {
        categoryId: action.categoryId,
      };
    case "subcategoryId":
      return {
        subcategoryId: action.subcategoryId,
      };
    case "published":
      return {
        published: action.published,
      };
    case "sizeName":
      return {
        ...state,
        sizes: state.sizes.map((size, index) =>
          index === action.index ? { ...size, sizeName: action.sizeName } : size
        ),
      };
    case "price":
      return {
        ...state,
        sizes: state.sizes.map((size, index) =>
          index === action.index ? { ...size, price: action.price } : size
        ),
      };
    case "Addquantities":
      return {
        ...state,
        sizes: [...state.sizes, { sizeName: "", price: "", quantities: [] }],
      };
    case "colors":
      return {
        ...state,
        colors: state.colors.map((color, index) =>
          index === action.index ? { ...color, name: action.colors } : color
        ),
      };
    case "colorName":
      return {
        ...state,
        sizes: state.colors.map((size, indexSize) =>
          indexSize === action.indexSize
            ? {
                ...size,
                quantities: size.quantities.map((quantity, indexQuantity) =>
                  indexQuantity === action.indexQuantity
                    ? { ...quantity, colorName: action.colorName }
                    : quantity
                ),
              }
            : size
        ),
      };
    case "quantity":
      return {
        ...state,
        sizes: state.colors.map((size, indexSize) =>
          indexSize === action.indexSize
            ? {
                ...size,
                quantities: size.quantities.map((quantity, indexQuantity) =>
                  indexQuantity === action.indexQuantity
                    ? { ...quantity, quantity: action.quantity }
                    : quantity
                ),
              }
            : size
        ),
      };
    case "imgCover":
      return {
        imgCover: action.imgCover,
      };
    case "imgs":
      return {
        ...state,
        imgs: state.imgs.map((img, index) =>
          index === action.index ? action.imgs : img
        ),
      };
    case "imgMeasurement":
      return {
        imgMeasurement: action.imgMeasurement,
      };
    case "imgSizeChart":
      return {
        imgSizeChart: action.imgSizeChart,
      };
    case "imgColors":
      return {
        ...state,
        imgColors: action.imgColors,
      };
    default:
      throw new Error();
  }
}
