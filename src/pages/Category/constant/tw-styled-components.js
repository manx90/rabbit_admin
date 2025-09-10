import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import tw from "tailwind-styled-components";

export const Container = tw.div`
  ContentPage
  mx-auto
  w-fit
  rounded-md
  p-4
  mt-4
  gap-4
  dark:bg-gray-900
`;
export const Section = tw.section`
  flex
  dark:border-gray-700
  w-full
  bg-white
  dark:bg-gray-800
  rounded-lg
  p-4
  flex-col
  gap-2
`;
export const Label = tw.label`
  text-gray-700 dark:text-gray-300 text-sm
`;
export const Form = tw.form`
${(p) =>
  p.border && `border-1 dark:border-gray-500 border-gray-300 rounded-md p-2`}
`;
export const InputOne = tw(Input)`
  px-3
  py-2
  rounded-md
  border
  border-gray-300
  dark:border-gray-600
  focus:outline-none
  focus:ring-2
  focus:ring-blue-400
  transition
  cursor-pointer
  dark:bg-gray-700
  dark:text-white
`;
export const ButtonOne = tw(Button)`
${({ variant }) =>
  variant === "cancel"
    ? "bg-red-600 hover:bg-red-800 text-white"
    : variant === "edit"
    ? "bg-yellow-600 hover:bg-yellow-800 text-white"
    : "bg-blue-600 hover:bg-blue-800 text-white"
  }
  w-24
  rounded-md
  transition
  cursor-pointer
  outline-none
  p-2
`;
export const Row = tw.div`
  flex
  gap-3
  mb-2
  items-end
`;
export const Column = tw.div`
  ${(p) =>
    p.border && `border-2 dark:border-gray-500 border-gray-300 rounded-md p-2`}
  ${(p) => p.responsive === "md" && `md:flex-row`}
  w-full
  flex
  flex-col
  gap-1
`;
export const Title = tw.h1`
  text-3xl
  font-semibold
  tracking-tight
  pb-3
  dark:text-white
  mb-4
`;
