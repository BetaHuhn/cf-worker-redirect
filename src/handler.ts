// eslint-disable-next-line no-undef
declare const REDIRECT_KV: KVNamespace

export async function handleRequest(request: Request): Promise<Response> {
	const url = new URL(request.url)
	const slug = url.pathname

	const target = await REDIRECT_KV.get(slug)

	if (!target) {
		// Optionally redirect to custom page on 404
		const errorRedirect = await REDIRECT_KV.get('404')
		if (errorRedirect) {
			return Response.redirect(errorRedirect, 301)
		}

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

	return Response.redirect(redirectTo, 301)
}