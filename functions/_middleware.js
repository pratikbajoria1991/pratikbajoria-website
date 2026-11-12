export async function onRequest(context) {
  const requestUrl = new URL(context.request.url);

  if (requestUrl.hostname === "startups.pratikbajoria.com" && requestUrl.pathname === "/") {
    requestUrl.pathname = "/startup-operations.html";
    return context.next({ request: new Request(requestUrl, context.request) });
  }

  return context.next();
}
