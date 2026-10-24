import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Vite variables are public browser code. Billing credentials belong only on
// an authenticated server; keep summarization disabled until that proxy exists.
const proxyPath = import.meta.env.VITE_SUMMARIZER_PROXY_PATH;
const proxyQuery = fetchBaseQuery({ baseUrl: '/', credentials: 'same-origin' });

export const articleApi = createApi({
	reducerPath: 'articleApi',
	baseQuery: (args, api, extraOptions) => {
		if (!proxyPath?.startsWith('/api/') || proxyPath.includes('?') || proxyPath.includes('#')) {
			return {
				error: {
					status: 'CUSTOM_ERROR',
					data: { error: 'Summarization is temporarily unavailable while API access is secured.' },
				},
			};
		}
		return proxyQuery(args, api, extraOptions);
	},
	endpoints: (builder) => ({
		getSummary: builder.query({
			query: (params) =>
				`${proxyPath}?url=${encodeURIComponent(params.articleUrl)}&length=3`,
		}),
	}),
});

export const { useLazyGetSummaryQuery } = articleApi;
