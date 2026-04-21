import { useQuery } from "@tanstack/react-query";

// TODO: Fetch the same posts, but using React Query (@tanstack/react-query).
//
// Requirements:
// 1. Write a `fetchPosts` function (outside the component) that:
//    - await fetch(API_URL)
//    - if !res.ok, throws new Error(`HTTP ${status}`)
//    - returns res.json() typed as Post[]
//    (React Query expects the fetcher to THROW on failure — that's how it
//    routes the error into the `error` field and into QueryCache.onError.)
//
// 2. Use useQuery with:
//    - queryKey: ['posts']
//    - queryFn: fetchPosts
//    - retry: false  (so your error UI appears instantly during testing,
//      instead of React Query retrying 3 times first)
//
// 3. Destructure { data, error, isError, isLoading, refetch } from useQuery.
//
// 4. Render:
//    - If isError: show a red fallback box with {error.message} AND a
//      "Try again" button that calls refetch().
//    - If isLoading or !data: show "Loading...".
//    - Otherwise: map posts and render each <h3>{title}</h3><p>{body}</p>.
//
// You should NOT need to call logger.error in this file — the global
// QueryCache.onError you wired in App.tsx will handle that for you.

const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=5";

type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

const fetchPosts = async (): Promise<Post[]> => {
	const res = await fetch(API_URL);
	if (!res.ok) {
		throw new Error(`HTTP ${res.status}`);
	}
	return res.json();
};

export function PostsReactQuery() {
	const { data, error, isError, isLoading, refetch } = useQuery({
		queryKey: ["posts"],
		queryFn: fetchPosts,
		retry: false,
	});

	if (isError) {
		return (
			<div className="p-4 border border-red-500 bg-red-50 rounded text-center">
				<p className="text-red-600 font-bold">
					{error instanceof Error ? error.message : "Failed to load"}
				</p>
				<button
					onClick={() => refetch()}
					className="mt-2 rounded bg-red-600 px-4 py-1 text-white hover:bg-red-700"
				>
					Try again
				</button>
			</div>
		);
	}

	if (isLoading || !data) {
		return <div className="p-8 text-center text-gray-500">Loading...</div>;
	}

	return (
		<div className="p-5">
			<h2 className="text-2xl font-bold mb-5">Posts</h2>

			<div className="flex flex-col gap-8">
				{data?.map((item) => (
					<div key={item.id}>
						<h3 className="font-semibold text-lg">{item.title}</h3>
						<p className="text-slate-600">{item.body}</p>
					</div>
				))}
			</div>

			<div className="mt-10 text-xs text-gray-400">Total: {data?.length}</div>
		</div>
	);
}
