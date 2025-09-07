import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectNative } from "@/components/ui/select-native";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Product } from "../../../api/productAPI";
import {
  Column,
  InputOne,
  Row,
  Section,
} from "../constant/tw-styled-components";
export function TableOne({
  checkbox = true,
  collectionShow = true,
  categoryId,
  subcategoryId,
  setproductIds,
  productIds,
}) {
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");

  let setValue = null;
  try {
    const formContext = useFormContext();
    setValue = formContext?.setValue;
  } catch (error) {
    setValue = null;
  }

  useEffect(() => {
    refetch();
  }, [query, categoryId, subcategoryId, setQuery, limit, setLimit]);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["products", categoryId, subcategoryId, query, limit],
    queryFn: () =>
      Product.getAll({
        category: categoryId || "",
        subcategory: subcategoryId || "",
        q: query,
        limit: limit,
      }),
  });
  const allProducts = data?.data || [];
  const isAllSelected =
    allProducts.length > 0 && productIds.length === allProducts.length;
  const isSomeSelected =
    productIds.length > 0 && productIds.length < allProducts.length;

  const collectionStats = {
    Sell: 255,
    Visits: 1200,
    Favorites: 75,
  };
  return (
    <Section className="w-full border-2 border-gray-300 rounded-md">
      <Column className="gap-4 p-2">
        {collectionShow && (
          <Row className="flex-row-reverse my-auto flex-wrap gap-2 sm:gap-3">
            {Object.entries(collectionStats).map(([key, value]) => {
              let badgeClass =
                "bg-opacity-20 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full border-0";
              let bgColor = "";
              let textColor = "";
              let dotColor = "";
              switch (key) {
                case "Sell":
                  bgColor = "bg-green-100";
                  textColor = "text-green-700";
                  dotColor = "#22c55e";
                  break;
                case "Visits":
                  bgColor = "bg-blue-100";
                  textColor = "text-blue-700";
                  dotColor = "#3b82f6";
                  break;
                case "Favorites":
                  bgColor = "bg-red-100";
                  textColor = "text-red-700";
                  dotColor = "#ef4444";
                  break;
                case "Reviews":
                  bgColor = "bg-purple-100";
                  textColor = "text-purple-700";
                  dotColor = "#a855f7";
                  break;
                case "Rating":
                  bgColor = "bg-yellow-100";
                  textColor = "text-yellow-700";
                  dotColor = "#eab308";
                  break;
                default:
                  bgColor = "bg-gray-100";
                  textColor = "text-gray-700";
                  dotColor = "#4b5563";
              }
              return (
                <Badge
                  key={key}
                  className={`${badgeClass} ${bgColor} ${textColor} flex items-center gap-1 min-w-[90px] sm:min-w-[110px] justify-center`}
                >
                  <span
                    className="badge-dot badge-dot-lamp"
                    style={{
                      display: "inline-block",
                      width: 6,
                      height: 6,
                      borderRadius: "100%",
                      marginRight: 6,
                      backgroundColor: dotColor,
                      boxShadow: `0 0 2px 0px ${dotColor}`,
                    }}
                  />
                  <span className="truncate max-w-[60px] sm:max-w-[80px]">{`${key} ${value}`}</span>
                </Badge>
              );
            })}
          </Row>
        )}
        <Row className="w-full items-center justify-between mb-1">
          <h1>Collection</h1>

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
              placeholder="Search products..."
              className="w-full max-w-[200px] "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Row>
        </Row>
      </Column>
      <div className="overflow-x-auto overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-md">
        <Table className="mx-auto w-full table-fixed">
          <TableHeader className="mb-0">
            <TableRow className="hover:bg-transparent border-b-0 dark:bg-gray-700">
              {checkbox && (
                <TableHead className="text-center dark:text-gray-300 w-16 mx-auto">
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={isSomeSelected}
                    onCheckedChange={(checked) => {
                      const newSelection = checked
                        ? allProducts.map((item) => item.id)
                        : [];

                      setproductIds(newSelection);
                      if (setValue) {
                        setValue("productIds", newSelection);
                      }
                    }}
                  />
                </TableHead>
              )}
              <TableHead className="text-center dark:text-gray-300">
                Name
              </TableHead>
              <TableHead className="text-center dark:text-gray-300">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="dark:bg-gray-800">
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 dark:text-gray-300"
                >
                  Loading products...
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              data?.data?.map((item) => (
                <TableRow
                  key={item.id}
                  className="odd:bg-muted/50 odd:hover:bg-muted/50 border-none hover:bg-transparent dark:odd:bg-gray-700/50 dark:hover:bg-gray-700/30"
                >
                  {checkbox && (
                    <TableCell className="py-2.5 text-center dark:text-gray-300">
                      <Checkbox
                        checked={productIds.includes(item.id)}
                        onCheckedChange={(checked) => {
                          let newSelection;

                          if (checked) {
                            newSelection = [...productIds, item.id];
                          } else {
                            newSelection = productIds.filter(
                              (id) => id !== item.id,
                            );
                          }

                          setproductIds(newSelection);

                          if (setValue) {
                            setValue("productIds", newSelection);
                          }
                        }}
                      />
                    </TableCell>
                  )}
                  <TableCell className="py-2.5 font-medium text-center dark:text-gray-300">
                    <span className="truncate block">{item.name}</span>
                  </TableCell>
                  <TableCell className="py-2.5 font-medium text-center dark:text-gray-300">
                    {item.publishState === "published" ? (
                      <Badge className="bg-green-100 text-green-700">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700">
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </Section>
  );
}
