import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Category } from "../../../api/cateogryApi";
import {
  ButtonOne,
  Column,
  Form,
  InputOne,
  Label,
  Row,
} from "../constant/tw-styled-components";

const AddSubCategory = ({ categories }) => {
  const categoriesData = categories?.data || [];
  const queryClient = useQueryClient();
  const {
    register: registerSubCategory,
    control: controlSubCategory,
    handleSubmit: handleSubmitSubCategory,
    reset: resetSubCategory,
  } = useForm();
  const { mutate: createSubCategory, isPending } = useMutation({
    mutationFn: (formData) => Category.createSubCategory(formData),
    onSuccess: () => {
      toast.success("Sub category created successfully");
      resetSubCategory();
      queryClient.invalidateQueries(["categories"]);
    },
    onError: () => {
      toast.error("Sub category creation failed");
    },
  });
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("iconSubCat", data.iconSubCat[0]);
      formData.append("categoryId", data.categoryId);
      createSubCategory(formData);
      resetSubCategory();
    } catch (error) {
      toast.error("Sub category creation failed");
      console.error("Error creating subcategory:", error);
    }
  };
  return (
    <Form border onSubmit={handleSubmitSubCategory(onSubmit)}>
      <Column responsive="md">
        <Column className="w-full">
          <Label>Add Sub Category</Label>
          <Controller
            control={controlSubCategory}
            name="categoryId"
            render={({ field }) => (
              <Select
                className="w-full"
                value={field.value || ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full self-stretch dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue
                    placeholder="Select categories"
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
        {/* <Row className="w-full"> */}
        <Row className="w-full mb-0">
          <InputOne
            type="text"
            id="subCategoryName"
            className="w-full self-end"
            placeholder="Add new sub category..."
            {...registerSubCategory("name")}
          />
        </Row>
        <Column className="self-end">
          <InputOne
            type="file"
            id="subCategoryIcon"
            placeholder="Add category icon"
            className="w-full"
            {...registerSubCategory("iconSubCat")}
          />
        </Column>
        <ButtonOne type="submit" className="self-end" disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </ButtonOne>
        {/* </Row> */}
      </Column>
    </Form>
  );
};

export default AddSubCategory;
