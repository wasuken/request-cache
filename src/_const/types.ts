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

export interface QueueAPIResult {
  id: number;
  exec_datetime: string;
  urlInfoId: number;
  urlInfo: Timing;
}

export interface QueueResultAPIResult extends QueueAPIResult {
  response: String;
  result: Boolean;
}
