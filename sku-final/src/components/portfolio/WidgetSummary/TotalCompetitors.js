import AppWidgetSummary from 'components/common/AppWidgetSummary';

const TotalCompetitors = () => {
  return (
    <AppWidgetSummary
      title="Total Competitors"
      percent={2.6}
      total={18765}
      chart={{
        colors: ['#8BE78B'],
        series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
      }}
    />
  );
};

export default TotalCompetitors;
