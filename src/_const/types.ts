export interface Timing {
  id: number;
  title: string;
  description: string;
  url: string;
  get_timing_sec: number;
}

export interface Queue {
  id: number;
  exec_datetime: Date;
  urlInfoId: number;
  urlInfo: Timing;
}

export interface QueueResult extends Queue {
  response: String;
  result: Boolean;
}
