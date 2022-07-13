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
const handlePost: PagesFunction = async ({ request }) => {
  const body = (await request.json()) as ResultSubmissionBody;
  const results = body?.data?.results;
  if (!results || !validateResults(results)) {
    return new Response(
      JSON.stringify({
        err: "Invalid Request",
      }),
      { status: 400 }
    );
  }
  // request.
  return new Response("OK");
};

export const onRequestGet: PagesFunction = ({ request }) => {
  if (/request_headers/.test(request.url)) {
    let allHeaders: string[] = [];
    request.headers.forEach((header) => allHeaders.push(header));
    return new Response(JSON.stringify({ allHeaders }));
  }
  if (/full_request/.test(request.url)) {
    return new Response(JSON.stringify(request));
  }
  return new Response("teapot", { status: 419 });
};

export const onRequestPost = [handlePost];