import { initialise } from "../../server";

const validateResults = (results: Partial<Result>[]): boolean => {
  const valid = results.reduce((p, c) => {
    if (!p) {
      return p;
    }
    return !!(
      c.question?.text &&
      c.question.options &&
      c.selectedOption?.score &&
      c.selectedOption.text
    );
  }, true);

  return valid;
};
const handlePost: PagesFunction<
  { RESULT_STORE: KVNamespace },
  "",
  { connectingIp: string }
> = async ({ request, env, data }) => {
  const server = initialise(env.RESULT_STORE);
  const body = (await request.json()) as ResultSubmissionBody;

  server.storeResults(data.connectingIp, body.data.results);
  const results = body?.data?.results;
  if (!results || !validateResults(results)) {
    return new Response(
      JSON.stringify({
        err: "Invalid Request",
      }),
      { status: 400 }
    );
  }
  return new Response("OK");
};

export const onRequestGet: PagesFunction = ({ request }) => {
  if (/request_headers/.test(request.url)) {
    let allHeaders: { value: string; key: string }[] = [];
    request.headers.forEach((value, key) => allHeaders.push({ value, key }));
    return new Response(JSON.stringify({ allHeaders }));
  }
  if (/full_request/.test(request.url)) {
    return new Response(JSON.stringify(request));
  }
  return new Response("teapot", { status: 419 });
};

export const onRequestPost = [handlePost];
