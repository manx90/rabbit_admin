export default function OrderList() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <HeaderProduct title={"Order List"} AddNew={false} />
      <Table />
    </div>
  );
}
