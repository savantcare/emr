async function gatherPerformanceTimingMetric(page, metricName) {
  const metric = await page.evaluate(
    (metric) => window.performance.timing[metric],
    metricName
  );
  return metric;
}

async function gatherPerformanceTimingMetrics(page) {
  // The values returned from evaluate() function should be JSON serializable.
  const rawMetrics = await page.evaluate(() =>
    JSON.stringify(window.performance.timing)
  );
  const metrics = JSON.parse(rawMetrics);
  return metrics;
}

function processPerformanceTimingMetrics(metrics) {
  return {
    request: metrics.responseStart - metrics.requestStart,
    response: metrics.responseEnd - metrics.responseStart,
    domLoaded: metrics.domComplete - metrics.domLoading,
    domInteractive: metrics.domInteractive - metrics.navigationStart,
    pageLoad: metrics.loadEventEnd - metrics.loadEventStart,
    fullTime: metrics.loadEventEnd - metrics.navigationStart,
  };
}

module.exports = {
  gatherPerformanceTimingMetric,
  gatherPerformanceTimingMetrics,
  processPerformanceTimingMetrics,
};
