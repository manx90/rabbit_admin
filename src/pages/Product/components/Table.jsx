import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";

import {
  ButtonOne,
  Column,
  InputOne,
  Row,
  Section,
} from "../../Category/constant/tw-styled-components";

import { Badge } from "@/components/ui/badge";
import { SelectNative } from "@/components/ui/select-native";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as TableUI,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Product } from "../../../api/productAPI";
export function TableProduct({
  checkbox = true,
  data,
  query,
  setQuery,
  limit,
  setLimit,
  refetch,
  isLoading,
  onEditProduct,
}) {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [idConfirmDelete, setIdConfirmDelete] = useState(null);

  const handleDelete = (id) => {
    Product.deleteOne(id);
    setOpenConfirmDelete(false);
    setIdConfirmDelete(null);
  };
  const handleUpdateStatus = async (id) => {
    Product.updateStatus(id).then(() => refetch());
  };
  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 1000);
  }, [query, setQuery, limit, setLimit, handleDelete]);

  return (
    <Section className="w-full border-2 border-gray-300 rounded-md h-full flex flex-col ">
      <ConfirmDelete
        open={openConfirmDelete}
        setOpen={setOpenConfirmDelete}
        id={idConfirmDelete}
        handleDelete={handleDelete}
      />
      <Column className="gap-4 p-2 flex-shrink-0">
        <Row className="w-full items-center justify-between mb-1">
          <Row className="gap-2 justify-between my-auto">
            <SelectNative
              className="w-full max-w-[200px] "
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            >
              <option className="text-white bg-gray-700" value="" disabled>
                select limit
              </option>
              <option className="text-white dark:bg-gray-700  " value="10">
                10
              </option>
              <option
                className="text-white dark:bg-gray-700  bg-gray-300"
                value="20"
              >
                20
              </option>
              <option
                className="text-white dark:bg-gray-700  bg-gray-300"
                value="50"
              >
                50
              </option>
            </SelectNative>
            <InputOne
              type="text"
              placeholder="id , name , category , subcategory , poster , status , quantity ..."
              className="w-full max-w-[200px] "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Row>
        </Row>
      </Column>
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-md">
          <TableUI className="mx-auto w-full min-w-[800px]">
            <TableHeader className="bg-white dark:bg-gray-700">
              <TableRow className="hover:bg-transparent border-b-0 dark:bg-gray-700">
                {checkbox && (
                  <TableHead className="text-center dark:text-gray-300 w-28">
                    #
                  </TableHead>
                )}
                <TableHead className="text-center dark:text-gray-300 w-28">
                  Name
                </TableHead>
                <TableHead className="text-center dark:text-gray-300 w-28">
                  Status
                </TableHead>
                <TableHead className="text-center dark:text-gray-300 w-28">
                  Quantity
                </TableHead>
                <TableHead className="text-center dark:text-gray-300 w-32">
                  Posted By
                </TableHead>
                <TableHead className="text-center dark:text-gray-300 w-28">
                  Category
                </TableHead>
                <TableHead className="text-center dark:text-gray-300 w-28">
                  Subcategory
                </TableHead>
                <TableHead className="text-center dark:text-gray-300 w-28">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="dark:bg-gray-800  overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 dark:text-gray-300"
                  >
                    Loading products...
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {data?.data?.map((item) => (
                    <TableRow
                      key={item.id}
                      className="odd:bg-muted/50 odd:hover:bg-muted/50 border-none hover:bg-transparent dark:odd:bg-gray-700/50 dark:hover:bg-gray-700/30"
                    >
                      {checkbox && (
                        <TableCell className="py-2.5 text-center dark:text-gray-300">
                          {/* {item.id} */}
                          <img
                            src={`${
                              import.meta.env.VITE_RABBIT_PI_BASE_URL
                            }/uploads/${item.imgCover}`}
                            alt=""
                            className="w-10 h-10 mx-auto rounded-sm"
                          />
                        </TableCell>
                      )}
                      <TableCell className="py-2.5 font-medium text-center dark:text-gray-300">
                        <span className="truncate block">{item.name}</span>
                      </TableCell>
                      <TableCell className="py-2.5 font-medium text-center dark:text-gray-300">
                        {item.publishState === "published" ? (
                          <Badge
                            onClick={() => {
                              handleUpdateStatus(item.id);
                            }}
                            variant="outline"
                            className="bg-green-100 text-green-700 cursor-pointer hover:bg-green-200 hover:text-green-800"
                          >
                            Active
                          </Badge>
                        ) : (
                          <Badge
                            onClick={() => {
                              handleUpdateStatus(item.id);
                            }}
                            variant="outline"
                            className="bg-red-100 text-red-700 cursor-pointer hover:bg-red-200 hover:text-red-800"
                          >
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="py-2.5 font-medium text-center dark:text-gray-300">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="py-2.5 font-medium text-center dark:text-gray-300">
                        {item.poster.username}
                      </TableCell>
                      <TableCell className="py-2.5 font-medium text-center dark:text-gray-300">
                        {item.category.name}
                      </TableCell>
                      <TableCell className="py-2.5 font-medium text-center dark:text-gray-300">
                        {item.subCategory.name}
                      </TableCell>
                      <TableCell className="py-2.5  font-medium text-center dark:text-gray-300">
                        <span className="my-auto justify-center flex items-center">
                          <FaEdit
                            onClick={() => {
                              if (onEditProduct) {
                                onEditProduct(item);
                              }
                            }}
                            className="text-blue-500  text-center  my-auto cursor-pointer hover:text-blue-700 mx-auto h-5 w-5"
                          />
                          <MdDelete
                            onClick={() => {
                              setOpenConfirmDelete(true);
                              setIdConfirmDelete(item.id);
                            }}
                            className="text-red-500 text-center  my-auto cursor-pointer hover:text-red-700 mx-auto h-5 w-5"
                          />
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </TableUI>
        </div>
      </div>
    </Section>
  );
}

const ConfirmDelete = ({ open, setOpen, id, handleDelete }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);
  return (
    <div
      className={`fixed inset-0 bg-black/50 h-screen w-screen flex justify-center items-center transition-all duration-300 ${
        open
          ? "opacity-100 z-50 pointer-events-auto"
          : "opacity-0 -z-50 pointer-events-none"
      }`}
      onClick={() => {
        setOpen(false);
      }}
    >
      <div
        className="relative bg-gray-100 w-3/4 lg:w-fit dark:bg-gray-700 p-4 rounded-md justify-center flex flex-col gap-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className="absolute cursor-pointer top-2 right-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          onClick={() => {
            setOpen(false);
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <MdDelete className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="font-Noto text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            حذف المنتج
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            هل أنت متأكد من أنك تريد حذف هذا المنتج؟ لا يمكن التراجع عن هذا
            الإجراء.
          </p>
        </div>
        <ButtonOne
          className="bg-red-600 text-lg text-white mx-auto hover:bg-red-700 dark:hover:bg-red-700 dark:text-white"
          onClick={() => {
            handleDelete(id);
          }}
        >
          حذف
        </ButtonOne>
      </div>
    </div>
  );
};
