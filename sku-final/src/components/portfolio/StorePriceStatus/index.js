import AppAreaInstalled from 'components/common/AppAreaInstalled';

const StorePriceStatus = () => {
  return (
    <AppAreaInstalled
      title="Store Price Status"
      subheader="(+43%) than last year"
      chart={{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        series: [
          {
            year: '2023',
            data: [
              { name: 'BuyBox Price', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
              { name: 'Not BuyBox Price', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
            ],
          },
          {
            year: '2022',
            data: [
              { name: 'BuyBox Price', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
              { name: 'Not BuyBox Price', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
            ],
          },
        ],
        colors: ['#8BE78B', '#F76F72'],
      }}
    />
  );
};

export default StorePriceStatus;
