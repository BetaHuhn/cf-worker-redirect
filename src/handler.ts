// eslint-disable-next-line no-undef
declare const REDIRECT_KV: KVNamespace;

export async function handleRequest(request: Request): Promise<Response> {
	const requestUrl = new URL(request.url);
	const requestPath = requestUrl.pathname;
	const requestRootPath = `${requestUrl.host}/`;

	// Get the matching target URL by first checking against the full url then host and then the path
	const target =
		(await REDIRECT_KV.get(`${requestUrl.host}${requestUrl.pathname}`)) ||
		(await REDIRECT_KV.get(requestRootPath)) ||
		(await REDIRECT_KV.get(requestPath));

	if (!target || target === "404") {
		// Optionally redirect to custom page on 404
		const errorRedirect =
			(await REDIRECT_KV.get(`${requestUrl.host}/404`)) ||
			(await REDIRECT_KV.get("404"));

		if (errorRedirect === "pass") {
			// Pass the original request along
			return fetch(request);
		} else if (errorRedirect) {
			// Redirect to the specified error page
			return Response.redirect(errorRedirect, 301);
		}

		// Return normal 404 error
		return new Response("Sorry, page not found.", {
			status: 404,
			statusText: "page not found",
		});
	}

	// Pass the original request along
	if (target === "pass") {
		return fetch(request);
	}

	/*
		Combine source and target URL search parameters (target params overwrite source params)
		Note: CF worker does not support url.searchParams.forEach
	*/

	// Construct URL class from target (value from KV) so we can easily manipulate it
	const targetUrl = new URL(target);
	// Default to using targetUrl path
	let redirectPath = targetUrl.pathname;
	// Check if the request has a path though
	if (!emptyPath(requestPath) && emptyPath(targetUrl.pathname)) {
		// Since request has a path but target does not, use requestPath
		redirectPath = requestPath;
	}

	// Construct a redirect url using target host and redirect path
	const redirectUrl = new URL(
		`${targetUrl.protocol}//${targetUrl.host}${redirectPath}`
	);
	Array.from(requestUrl.searchParams).forEach(([key, val]) => {
		if (redirectUrl.searchParams.has(key) === false) {
			redirectUrl.searchParams.set(key, val);
		}
	});

	// Redirect to the target URL
	return Response.redirect(redirectUrl, 301);
}

function emptyPath(path: string): boolean {
	return path === "/";
}
