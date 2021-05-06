// eslint-disable-next-line no-undef
declare const REDIRECT_KV: KVNamespace

export async function handleRequest(request: Request): Promise<Response> {
	const url = new URL(request.url)
	const path = url.pathname
	const fullUrl = url.host + url.pathname

	// Get the matching target URL by first checking against the full url and then the path
	const target = await REDIRECT_KV.get(fullUrl) || await REDIRECT_KV.get(path)

	if (!target || target === '404') {
		// Optionally redirect to custom page on 404
		const errorRedirect = await REDIRECT_KV.get(`${ url.host }/404`) || await REDIRECT_KV.get('404')

		if (errorRedirect === 'pass') {

			// Pass the original request along
			return fetch(request)

		} else if (errorRedirect) {

			// Redirect to the specified error page
			return Response.redirect(errorRedirect, 301)

		}

		// Return normal 404 error
		return new Response('Sorry, page not found.', {
			status: 404,
			statusText: 'page not found'
		})
	}

	/*
		Combine source and target URL search parameters (target params overwrite source params)
		Note: CF worker does not support url.searchParams.forEach
	*/
	const targetUrl = new URL(target)
	Array.from(url.searchParams).forEach(([ key, val ]) => {
		if (targetUrl.searchParams.has(key) === false) {
			targetUrl.searchParams.set(key, val)
		}
	})

	const redirectTo = targetUrl.toString()

	// Redirect to the target URL
	return Response.redirect(redirectTo, 301)
}