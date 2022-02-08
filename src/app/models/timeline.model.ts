export interface TimelineData {
  data: {
    result: [
      {
        metric: {
          device_status: string;
          iccid: string;
          instance: string;
          job: string;
          serial_number: string;
          site: string;
          __name__: string;
        };
        values: [number, string];
      }
    ];
  };
}
