import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Category as CategoryApi } from "../../api/cateogryApi";
import { Product as ProductApi } from "../../api/productAPI";
import { Collection as CollectionApi } from "../../api/collectionApi";
import AddCategory from "./components/AddCategory";
import AddSubCategory from "./components/AddSubCategory";
import DeleteCategory from "./components/DeleteCategory";
import DeleteSubCategory from "./components/DeleteSubCategory";
import EditCategory from "./components/EditCategory";
import EditSubCategory from "./components/EditSubCategory";
import DropDown from "@/components/dropDown";
import { TableOne } from "./components/TableOne";
import {
  ButtonOne,
  Column,
  Container,
  Form,
  InputOne,
  Label,
  Row,
  Section,
  Title,
} from "./constant/tw-styled-components";
const Category = ({ categories, refetch }) => {
  const handleCategoryUpdateState = async (id) => {
    await CategoryApi.updateState(id);
    await refetch();
  };
  const handleSubCategoryUpdateState = async (id) => {
    await CategoryApi.updateStateSub(id);
    await refetch();
  };
  return (
    <Container className="flex flex-col gap-4">
      <Row className="grid lg:grid-cols-2 gap-4 sm:grid-cols-1">
        <Section className="self-stretch min-w-96 w-full">
          <Title>Category and Sub Category</Title>
          <AddCategory categories={categories} />
          <AddSubCategory categories={categories} />
          <EditCategory categories={categories} />
          <EditSubCategory categories={categories} />
          <DeleteCategory categories={categories} />
          <DeleteSubCategory categories={categories} />
          <table className="flex flex-col min-w-full mt-4 border border-gray-300 rounded-lg">
            <thead className="w-full">
              <tr className="flex ">
                <th className="px-4 py-2 border-b w-full">Categry</th>
                <th className="px-4 py-2 border-b w-full">state</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {categories?.data?.map((category) => (
                <React.Fragment key={category.id}>
                  <tr className="flex items-center last:border-b-0 border-b  group  transition">
                    <td className="px-4 py-2  w-full  justify-center text-center flex items-center gap-2">
                      <span>{category.name}</span>
                    </td>
                    <td className="px-4 py-2  w-full text-center">
                      {category.isActive === true ? (
                        <span
                          className="text-green-600 hover:bg-green-200 bg-green-100 rounded-sm  px-3 py-[0.5px] text-sm cursor-pointer"
                          onClick={() => handleCategoryUpdateState(category.id)}
                        >
                          Active
                        </span>
                      ) : (
                        <span
                          className="text-red-600  hover:text-red-600 bg-red-100 hover:bg-red-200  rounded-sm px-3 py-[0.5px] text-sm  cursor-pointer"
                          onClick={() => handleCategoryUpdateState(category.id)}
                        >
                          Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <table className="flex flex-col min-w-full mt-4 border border-gray-300 rounded-lg">
            <thead className="w-full">
              <tr className="flex ">
                <th className="px-4 py-2 border-b w-full">SubCategory</th>
                <th className="px-4 py-2 border-b w-full">state</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {categories?.data?.map((category) => (
                <React.Fragment key={category.id}>
                  <tr className="flex mx-auto items-center justify-center border-b-2">
                    <span className="text-center mx-auto">{category.name}</span>
                  </tr>
                  {category?.subCategories.map((subCategories) => (
                    <tr className="flex items-center last:border-b-0 border-b  group  transition">
                      <td className="px-4 py-2  w-full  justify-center text-center flex items-center gap-2">
                        <span>{subCategories.name}</span>
                      </td>
                      <td className="px-4 py-2  w-full text-center">
                        {subCategories.isActive === true ? (
                          <span
                            className="text-green-600 hover:bg-green-200 bg-green-100 rounded-sm  px-3 py-[0.5px] text-sm cursor-pointer"
                            onClick={() =>
                              handleSubCategoryUpdateState(subCategories.id)
                            }
                          >
                            Active
                          </span>
                        ) : (
                          <span
                            className="text-red-600  hover:text-red-600 bg-red-100 hover:bg-red-200  rounded-sm px-3 py-[0.5px] text-sm  cursor-pointer"
                            onClick={() =>
                              handleSubCategoryUpdateState(subCategories.id)
                            }
                          >
                            Inactive
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <table className="flex flex-col min-w-full mt-4 border border-gray-300 rounded-lg">
            <thead className="w-full">
              <tr className="flex">
                <th className="px-4 py-2 border-b w-full">Season</th>
                <th className="px-4 py-2 border-b w-full">State</th>
              </tr>
            </thead>
            <tbody className="w-full">
              <tr className="flex p-2 mx-auto items-center justify-center border-b ">
                <td className="text-center mx-auto">Winter</td>
                <td className="text-center mx-auto">
                  <DropDown
                    option1={"Active"}
                    option2={"inActive"}
                    handle1={ProductApi.ShowSeasonWinter}
                    handle2={ProductApi.HideSeasonWinter}
                  />
                </td>
              </tr>
              <tr className="flex p-2 mx-auto items-center justify-center border-b ">
                <td className="text-center mx-auto">Summer</td>
                <td className="text-center mx-auto">
                  {" "}
                  <DropDown
                    option1={"Active"}
                    option2={"inActive"}
                    handle1={ProductApi.ShowSeasonSummer}
                    handle2={ProductApi.HideSeasonSummer}
                  />
                </td>
              </tr>
              <tr className="flex p-2 mx-auto items-center justify-center ">
                <td className="text-center mx-auto">Spring</td>
                <td className="text-center mx-auto">
                  {" "}
                  <DropDown
                    option1={"Active"}
                    option2={"inActive"}
                    handle1={ProductApi.ShowSeasonSpring}
                    handle2={ProductApi.HideSeasonSpring}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Section>
        <Section className="min-w-96 h-full self-start">
          <Title>Collection</Title>
          <Collection categories={categories} />
        </Section>
      </Row>
    </Container>
  );
};

const Collection = ({ categories }) => {
  const [productIds, setproductIds] = useState([]);

  const categoriesData = categories?.data || [];
  const initialValues = {
    productIds: [],
  };
  const methods = useForm({
    defaultValues: initialValues,
    mode: "all",
  });
  const {
    register: registerCollection,
    control: controlCollection,
    handleSubmit: handleSubmitCollection,
    reset: resetCollection,
    setValue: setValueCollection,
  } = methods;
  const [numCategory, setNumCategory] = useState(0);
  const [numSubCategory, setNumSubCategory] = useState(0);
  const onSubmit = async (data) => {
    console.log(data);
    const formData = { ...data };

    if (formData.categoryIds && !Array.isArray(formData.categoryIds)) {
      formData.categoryIds = [formData.categoryIds];
    } else if (!formData.categoryIds) {
      formData.categoryIds = [];
    }
    if (formData.subCategoryIds && !Array.isArray(formData.subCategoryIds)) {
      formData.subCategoryIds = [formData.subCategoryIds];
    } else if (!formData.subCategoryIds) {
      formData.subCategoryIds = [];
    }

    if (
      !formData.iconCollection ||
      (formData.iconCollection instanceof FileList &&
        formData.iconCollection.length === 0)
    ) {
      delete formData.iconCollection;
    }
    const Response = await CollectionApi.createCollection(formData);

    // Reset both state and form values
    setproductIds([]);
    resetCollection();
    setValueCollection("productIds", []);
  };
  return (
    <FormProvider {...methods}>
      <Form border onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        <Column>
          <Row className="w-full">
            <Column className="gap-1">
              <Label htmlFor="name">Collection Name</Label>
              <InputOne
                id="name"
                type="text"
                placeholder="Add a collection name..."
                className="w-full"
                {...registerCollection("name")}
              />
            </Column>
            <InputOne
              type="file"
              placeholder="Add a collection image..."
              className="w-full"
              {...registerCollection("iconCollection")}
            />
          </Row>

          <Row className="w-full">
            <Column className="gap-1 w-full">
              <Controller
                control={controlCollection}
                name="categoryIds"
                render={({ field }) => (
                  <Select
                    id="AddCategory"
                    className="w-full"
                    value={field.value || ""}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setNumCategory(value);
                    }}
                  >
                    <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600">
                      <SelectValue
                        placeholder="Select a category"
                        className="text-gray-500 dark:text-gray-400 h-20 truncate"
                      />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      {categoriesData?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                          className="dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Column>
            <Column className="gap-1 w-full">
              <Controller
                control={controlCollection}
                name="subCategoryIds"
                render={({ field }) => (
                  <Select
                    id="subCategoryName"
                    disabled={!numCategory}
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
                        className="dark:text-gray-400"
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
            </Column>
          </Row>
        </Column>
        <Column className="w-full">
          <TableOne
            key={`table-${productIds.length}-${numCategory}-${numSubCategory}`}
            setproductIds={setproductIds}
            productIds={productIds}
            checkbox={true}
            collectionShow={false}
            categoryId={numCategory}
            subcategoryId={numSubCategory}
          />
          <Row className="gap-2 justify-between">
            <ButtonOne
              variant="cancel"
              onClick={() => {
                console.log("Before cancel - productIds:", productIds);
                setproductIds([]);
                setNumCategory(0);
                setNumSubCategory(0);
                resetCollection();
                setValueCollection("productIds", []);
                setValueCollection("categoryIds", "");
                setValueCollection("subCategoryIds", "");
                console.log("After cancel - productIds should be empty");
              }}
            >
              Cancel
            </ButtonOne>
            <ButtonOne type="submit">Add</ButtonOne>
          </Row>
        </Column>
      </Form>
    </FormProvider>
  );
};

export default Category;
