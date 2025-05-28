import { useState, useEffect } from "react";
import Description from "./textarea";
import InputSimple from "./ui/inputSimple";
import SelectButton from "./ui/selecting";
import GroupRadio from "./ui/GroupRadio";
import InputPrice from "./ui/comp-13";
export function InfoProduct({
  styleProduct,
  MainCategoryProduct,
  dispatchProductInfo,
  ProductInfo,
}) {
  const [Mainindex, setMainIndex] = useState();

  // Removed automatic default value selection

  const handleMainIndex = (index) => {
    setMainIndex(index);
  };
  return (
    <div className={styleProduct.level2_1}>
      <div className={styleProduct.level3_1}>
        <div className={styleProduct.level4}>
          <InputSimple
            label="Product Name"
            name="Enter product name"
            type="text"
            className={`${styleProduct.input_1} h-[48px]`}
            cnLabel={styleProduct.label}
            placeholder="Enter product name"
            onChange={(e) => {
              dispatchProductInfo({
                type: "SET_PRODUCT_NAME",
                payload: e.target.value,
              });
              console.log(ProductInfo);
            }}
            required
          />
        </div>
        {/* <div className={styleProduct.level4}>
          <InputPrice
            label="Price Cover"
            name="Enter price cover"
            placeholder="Enter price cover"
            type="number"
            className={`${styleProduct.input_1} h-[48px] pl-6`}
            cnLabel={styleProduct.label}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^\d+$/.test(value)) {
                dispatchProductInfo({
                  type: "SET_PRICE_COVER",
                  payload: value,
                });
              }
            }}
            required
          />
        </div> */}
        {MainCategoryProduct && MainCategoryProduct.length > 0 && (
          <>
            <div className={styleProduct.level4}>
              <SelectButton
                className="w-full h-[48px] text-[16px] font-medium"
                cnOption="text-[16px] font-medium"
                label="Category"
                placeholder="Select Category"
                options={MainCategoryProduct || []}
                value={ProductInfo?.categoryId || ""}
                onChange={(e) => {
                  const selectedValue = e.target.value
                    ? Number(e.target.value)
                    : null;
                  // Find the actual category index in MainCategoryProduct
                  const categoryIndex = MainCategoryProduct.findIndex(
                    (category) => category.id === selectedValue
                  );
                  // Update category
                  dispatchProductInfo({
                    type: "SET_CATEGORY_ID",
                    payload: selectedValue,
                  });
                  // Reset subcategory when category changes
                  dispatchProductInfo({
                    type: "SET_SUBCATEGORY_ID",
                    payload: null,
                  });
                  // Update main index for subcategory options
                  handleMainIndex(categoryIndex);

                  // Removed automatic subcategory selection
                }}
                required
              />
              <SelectButton
                className="w-full h-[48px] text-[16px] font-medium"
                cnOption="text-[16px] font-medium"
                label="Sub Category"
                placeholder="Select Sub Category"
                options={MainCategoryProduct[Mainindex]?.subCategories || []}
                value={ProductInfo?.subcategoryId || ""}
                onChange={(e) => {
                  dispatchProductInfo({
                    type: "SET_SUBCATEGORY_ID",
                    payload: Number(e.target.value),
                  });
                }}
                required
              />
            </div>
          </>
        )}
      </div>
      <div className={styleProduct.Description}>
        <Description onChange={(e) => {
          dispatchProductInfo({
            type: "SET_DESCRIPTION",
            payload: e.target.value,
          });
        }}/>
        <GroupRadio
          className="w-full h-[48px] text-[16px] font-medium flex-row cursor-pointer"
          label="Product Status"
          options={[
            { label: "Active", value: true },
            { label: "Inactive", value: false },
          ]}
          cnRadio="w-6 h-6 border-2 border-gray-300 checked:bg-[#0095FF] checked:border-[#0095FF]"
          cnLabel="text-[16px] font-medium"
          onChange={(value) => {
            dispatchProductInfo({
              type: "SET_ACTIVE",
              payload: value,
            });
          }}
        />
      </div>
    </div>
  );
}
