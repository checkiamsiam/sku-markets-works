const MaxPriceColumn = ({ row }) => {
  console.log(row?.getTopBottomPrice?.topPrice?.last30Days);
  return (
    <div>
      <p>{row?.getTopBottomPrice?.topPrice?.last30Days || 0}</p>
    </div>
  );
};

export default MaxPriceColumn;
