import { TimelineResult } from './timeline-result.model';

export interface TimelineData {
  status: string;
  data: {
    result: TimelineResult[];
  };
}
