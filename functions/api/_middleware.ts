// We need this for preflight checks
// Thanks stack overflow
const preflightChecks: PagesFunction = async ({ request }) => {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  let headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    let respHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Versionx
      "Access-Control-Allow-Headers":
        request.headers.get("Access-Control-Request-Headers") || "*",
    };

    return new Response(null, {
      headers: respHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: "GET, HEAD, POST, OPTIONS",
      },
    });
  }
};

const jsonResponses: PagesFunction = async ({ next }) => {
  const response = await next();
  response.headers.set("Content-Type", "application/json");
  return response;
};
const corsOpen: PagesFunction = async ({ next }) => {
  const response = await next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Headers", "*");
  return response;
};

const errorHandler: PagesFunction = async ({ next }) => {
  try {
    return await next();
  } catch (err) {
    const error = err as Error;
    return new Response(
      JSON.stringify({
        err: {
          message: error.message,
          stack: error.stack,
        },
      }),
      { status: 500 }
    );
  }
};

const ipAddress: PagesFunction = ({ request, next, data }) => {
  const callerIp = request.headers.get("cf-connecting-ip");
  if (!callerIp) {
    return new Response("could not determine caller ip", { status: 400 });
  }
  data["connectingIp"] = request.headers.get("cf-connecting-ip");
  return next();
};

export const onRequest = [errorHandler, jsonResponses, corsOpen, ipAddress];
export const onRequestOpeions = [preflightChecks];
