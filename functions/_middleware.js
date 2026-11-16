export async function onRequest(context) {
  const requestUrl = new URL(context.request.url);

  if (requestUrl.hostname === "startups.pratikbajoria.com" && requestUrl.pathname === "/") {
    requestUrl.pathname = "/startup-operations.html";
    return context.next({ request: new Request(requestUrl, context.request) });
  }

  const response = await context.next();
  if (requestUrl.hostname !== "pratikbajoria.com" || !requestUrl.pathname.endsWith(".md")) {
    return response;
  }

  const headers = new Headers(response.headers);
  const canonicalPath = requestUrl.pathname.slice(0, -3);
  const canonicalUrl = `https://pratikbajoria.com${canonicalPath === "/index" || canonicalPath === "" ? "/" : canonicalPath}`;
  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Robots-Tag", "noindex, follow");
  headers.append("Link", `<${canonicalUrl}>; rel="canonical"`);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
