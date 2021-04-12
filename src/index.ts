import { handleRequest } from './handler'

addEventListener('fetch', (event) => {
	const request = event.request

	if (request.method === 'GET') {
		event.respondWith(handleRequest(request)) // Handle target request
	} else {
		event.respondWith(
			new Response(null, {
				status: 405,
				statusText: 'Method Not Allowed'
			})
		)
	}
})