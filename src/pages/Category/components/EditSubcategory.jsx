import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Category } from "../../../api/cateogryApi";
import {
  ButtonOne,
  Column,
  Form,
  InputOne,
  Label,
  Row,
} from "../constant/tw-styled-components";
const EditSubCategory = ({ categories }) => {
  const {
    register,
    control: controlEditSubCategory,
    handleSubmit: handleSubmitEditSubCategory,
    reset: resetEditSubCategory,
  } = useForm();
  const categoriesData = categories?.data || [];
  const [numCategory, setNumCategory] = useState(null);
  const [numSubCategory, setNumSubCategory] = useState(null);
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("iconSubCat", data.iconSubCat[0]);
    await Category.updateSubCategory(
      data.subCategoryId,
      data.categoryId,
      formData,
    )
      .then(toast.success("subCategory updated successfully!"))
      .catch(
        (err) => {
          if (err?.response?.data?.message) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Failed to update subcategory.");
          }
          console.error("Update subcategory error:", err);
        },
      );
    resetEditSubCategory();
  };
  return (
    <Form
      border
      onSubmit={handleSubmitEditSubCategory(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <Column className="w-full md:flex-row items-end">
        <Column className="w-full">
          <Label htmlFor="EditSubCategory">Edit Sub Category</Label>
          <Controller
            control={controlEditSubCategory}
            name="categoryId"
            className="w-full"
            render={({ field }) => (
              <Select
                id="CategoryId"
                name="CategoryId"
                className="w-full"
                value={field.value || ""}
                onValueChange={(value) => {
                  field.onChange(value);
                  setNumCategory(value);
                }}
              >
                <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue
                    placeholder="Select Category"
                    className="text-gray-500 dark:text-gray-400 h-20 truncate"
                    style={{
                      maxWidth: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setNumCategory(value);
                    }}
                  />
                </SelectTrigger>
                <SelectContent>
                  {categoriesData?.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Column>
        <Row className="w-full mb-0">
          <Controller
            control={controlEditSubCategory}
            name="subCategoryId"
            render={({ field }) => (
              <Select
                className="w-full"
                value={field.value || ""}
                onValueChange={(value) => {
                  field.onChange(value);
                  setNumSubCategory(value);
                }}
              >
                <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue
                    placeholder="Select Sub Category"
                    className="text-gray-500 dark:text-gray-400 h-20 truncate"
                    style={{
                      maxWidth: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    value={field.value || ""}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setNumSubCategory(value);
                    }}
                  />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {numCategory &&
                    categoriesData
                      ?.find((cat) => String(cat.id) === numCategory)
                      ?.subCategories?.map((subCategory) => {
                        return (
                          <SelectItem
                            key={subCategory.id}
                            value={String(subCategory.id)}
                          >
                            {subCategory.name}
                          </SelectItem>
                        );
                      })}
                </SelectContent>
              </Select>
            )}
          />
        </Row>
      </Column>
      {numCategory && numSubCategory && (
        <Row className="w-full gap-1">
          <InputOne
            type="text"
            placeholder="Name"
            className="w-full"
            control={controlEditSubCategory}
            {...register("name")}
          />
          <InputOne
            type="file"
            className="w-full"
            control={controlEditSubCategory}
            {...register("iconSubCat")}
            placeholder="File"
          />
          <ButtonOne
            type="button"
            variant="cancel"
            onClick={() => {
              resetEditSubCategory();
              setNumCategory(null);
              setNumSubCategory(null);
            }}
          >
            Cancel
          </ButtonOne>
          <ButtonOne type="submit" variant="edit">
            Save
          </ButtonOne>
        </Row>
      )}
    </Form>
  );
};

export default EditSubCategory;
