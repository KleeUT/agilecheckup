import format from "date-fns/format";
import { TimeProvider } from "./resultsRepository";

export function timeProvider(): TimeProvider {
  return {
    utcDateTimeStringNow: () => format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
  };
}
