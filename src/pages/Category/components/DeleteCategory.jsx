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
  Label,
  Row,
} from "../constant/tw-styled-components";

const DeleteCategory = ({ categories }) => {
  const queryClient = useQueryClient();
  const categoriesData = categories?.data || [];
  const {
    control: controlDeleteCategory,
    handleSubmit: handleSubmitDeleteCategory,
    reset: resetDeleteCategory,
  } = useForm();
  const { mutate: deleteCategory, isPending } = useMutation({
    mutationFn: (id) => Category.deleteOneCategory(id),
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries(["categories"]);
      resetDeleteCategory();
    },
    onError: () => {
      toast.error("Category deletion failed");
    },
  });
  const onSubmit = (data) => {
    deleteCategory(data.CategoryId);
    resetDeleteCategory();
  };
  return (
    <Form
      border
      onSubmit={handleSubmitDeleteCategory(onSubmit)}
      className="w-full"
    >
      <Row className="w-full">
        <Column className="w-full">
          <Label htmlFor="DeleteCategory">Delete Category</Label>
          <Controller
            control={controlDeleteCategory}
            name="CategoryId"
            className="w-full"
            render={({ field }) => (
              <Select
                id="DeleteCategory"
                className="w-full"
                value={field.value || ""}
                onValueChange={field.onChange}
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
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
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
        <ButtonOne type="submit" variant="cancel" disabled={isPending}>
          {isPending ? "Deleting..." : "Delete"}
        </ButtonOne>
      </Row>
    </Form>
  );
};

export default DeleteCategory;
