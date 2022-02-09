import { TimelineMetric } from './timeline-metric.model';

export interface TimelineResult {
  metric: TimelineMetric;
  values: [number, string];
}
