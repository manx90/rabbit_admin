import styled from "tailwind-styled-components";

const colorClasses = {
  red: {
    bg: "bg-red-200",
    text: "text-red-700",
    textBold: "text-red-700",
  },
  green: {
    bg: "bg-green-200",
    text: "text-green-700",
    textBold: "text-green-700",
  },
  yellow: {
    bg: "bg-yellow-200",
    text: "text-yellow-700",
    textBold: "text-yellow-700",
  },
  blue: {
    bg: "bg-blue-200",
    text: "text-blue-700",
    textBold: "text-blue-700",
  },
};

const ChartContainer = styled.div`
  flex flex-col gap-2 rounded-md lg:p-4 p-2 w-full max-w-64 ${({ classes }) =>
    classes.bg} border border-${({ color }) => color}-700 mx-auto
`;

const ChartName = styled.span`
  lg: text-xl text-xs ${({ classes }) => classes.text};
`;
const ChartCount = styled.span`
  lg: text-5xl text-3xl font-semibold tracking-wide
    ${({ classes }) => classes.textBold};
`;
export default function Chart({
  name = "Total Orders",
  counts = 0,
  color = "blue",
}) {
  const classes = colorClasses[color] || colorClasses.blue;

  return (
    <ChartContainer classes={classes} color={color}>
      <ChartName classes={classes}>{name}</ChartName>
      <ChartCount classes={classes}>+{counts}</ChartCount>
    </ChartContainer>
  );
}
