import { Entry } from './entry';

export interface EntriesResponse {
  data: {
    entries: {
      items: Entry[];
    };
  };
}
