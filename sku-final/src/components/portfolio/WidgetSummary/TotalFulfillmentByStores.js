import AppWidgetSummary from 'components/common/AppWidgetSummary';

const TotalFulfillmentByStores = () => {
  return (
    <AppWidgetSummary
      title="Fulfillment by Stores"
      percent={3.6}
      total={678}
      chart={{
        colors: ['#8BE78B'],
        series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
      }}
    />
  );
};

export default TotalFulfillmentByStores;
