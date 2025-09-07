import {
  ButtonOne,
  Column,
  InputOne,
  Row,
} from "../../Category/constant/tw-styled-components";

export default function ColorImg({
  index,
  register,
  handleRemoveColor,
  handleColorNameChange,
  appendColor,
  setFocus,
}) {
  return (
    <Column className="w-full">
      <Row className="w-full items-end gap-2">
        <InputOne
          type="file"
          accept="image/*"
          className="border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
          {...register(`colors.${index}.imgColor`)}
        />
        <InputOne
          type="Text"
          className="border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
          placeholder="Color name"
          {...register(`colors.${index}.name`)}
          onChange={(e) => {
            handleColorNameChange(index, e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              appendColor();
              setTimeout(() => {
                setFocus(`colors.${index + 1}.name`);
              }, 50);
              e.preventDefault(); // Prevent form submission!
            }
          }}
        />
        <ButtonOne
          type="button"
          variant="outline"
          className="dark:text-red-500 dark:border-red-500  hover:dark:bg-gray-600 hover:dark:text-white"
          onClick={() => handleRemoveColor(index)}
        >
          Remove
        </ButtonOne>
      </Row>
    </Column>
  );
}
