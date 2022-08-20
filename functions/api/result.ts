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
  if (/return_body/.test(request.url)) {
    return new Response(JSON.stringify(body), { status: 421 });
  }
  await server.storeResults(data.connectingIp, body.data.results);
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

export const handleGet: PagesFunction<{
  RESULT_STORE: KVNamespace;
}> = async ({ request, env }) => {
  if (/request_headers/.test(request.url)) {
    let allHeaders: { value: string; key: string }[] = [];
    request.headers.forEach((value, key) => allHeaders.push({ value, key }));
    return new Response(JSON.stringify({ allHeaders }));
  }
  if (/full_request/.test(request.url)) {
    return new Response(JSON.stringify(request));
  }
  if (/all_results/.test(request.url)) {
    const server = initialise(env.RESULT_STORE);
    const results = await server.retrieveResults();
    return new Response(JSON.stringify(results));
  }
  if (/\?env/.test(request.url)) {
    return new Response(
      JSON.stringify({
        envKeys: Object.keys(env),
        globalKeys: Object.keys(globalThis),
      })
    );
  }
  return new Response("teapot", { status: 421 });
};

export const onRequestGet = [handleGet];
export const onRequestPost = [handlePost];
