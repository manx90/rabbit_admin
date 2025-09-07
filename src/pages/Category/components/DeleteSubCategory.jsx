import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Category } from "../../../api/cateogryApi";
import {
  ButtonOne,
  Column,
  Form,
  Label,
  Row,
} from "../constant/tw-styled-components";
const DeleteSubCategory = ({ categories }) => {
  const categoriesData = categories?.data || [];
  const [numCategory, setNumCategory] = useState(null);
  const queryClient = useQueryClient();
  const {
    control: controlDeleteSubCategory,
    handleSubmit: handleSubmitDeleteSubCategory,
    reset: resetDeleteSubCategory,
  } = useForm();
  const { mutate: deleteSubCategory, isPending } = useMutation({
    mutationFn: (id) => Category.deleteOneSubCategory(id),
    onSuccess: () => {
      toast.success("Sub category deleted successfully");
      queryClient.invalidateQueries(["categories"]);
      resetDeleteSubCategory();
    },
    onError: () => {
      toast.error("Sub category deletion failed");
    },
  });
  const onSubmit = (data) => {
    deleteSubCategory(data.SubCategoryId);
    resetDeleteSubCategory();
  };
  return (
    <Form
      border
      onSubmit={handleSubmitDeleteSubCategory(onSubmit)}
      className="w-full"
    >
      <Column className="w-full md:flex-row items-end">
        <Column className="w-full">
          <Label htmlFor="DeleteSubCategory">Delete Sub Category</Label>
          <Controller
            control={controlDeleteSubCategory}
            name="CategoryId"
            className="w-full"
            render={({ field }) => (
              <Select
                id="DeleteSubCategory"
                className="w-full"
                value={field.value || ""}
                onValueChange={(value) => {
                  setNumCategory(value);
                  field.onChange(value);
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
            control={controlDeleteSubCategory}
            name="SubCategoryId"
            render={({ field }) => (
              <Select
                className="w-full"
                value={field.value || ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder="Select Sub Category"
                    className="text-gray-500 h-20 truncate"
                    style={{
                      maxWidth: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  />
                </SelectTrigger>
                <SelectContent>
                  {categoriesData
                    ?.find((category) => String(category.id) === numCategory)
                    ?.subCategories?.map((subCategory) => (
                      <SelectItem
                        key={subCategory.id}
                        value={String(subCategory.id)}
                      >
                        {subCategory.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          />
          <ButtonOne type="submit" variant="cancel" disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </ButtonOne>
        </Row>
      </Column>
    </Form>
  );
};

export default DeleteSubCategory;
