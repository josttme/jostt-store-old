export function Skeleton() {
	return (
		<>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
				<CardSkeleton key={i} />
			))}
		</>
	)
}

export function CardSkeleton() {
	return (
		<div className=" max-w-sm cursor-pointer overflow-hidden rounded-lg bg-white shadow-xl transition duration-300 hover:shadow-4xl">
			<figure className="relative w-full">
				<div className="absolute right-2  top-2 z-50">
					<button
						type="button"
						className="grid h-8 w-8 place-content-center rounded-full bg-slate-100 stroke-black p-2 transition duration-300 hover:stroke-[red]"
					>
						<svg
							className="h-5 w-5 fill-none"
							strokeWidth="2.1"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22 8.862a5.95 5.95 0 01-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 018.08 0l.266.274.265-.274A5.612 5.612 0 0116.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0122 8.862z"
								strokeWidth="2.1"
								strokeLinejoin="round"
							></path>
						</svg>
					</button>
				</div>
				<div className="relative ">
					<div className=" absolute left-0 top-0 h-full w-full animate-pulse-fast bg-gray-300" />
					<img className="h-full w-full opacity-0" width="200" height="200" />
				</div>
				<span className="absolute bottom-0 left-0 m-2 h-5 w-20 rounded-lg bg-white/60"></span>
			</figure>
			<div className="flex flex-col gap-2 p-5 py-6">
				<span className="inline-block  h-5 w-36 animate-pulse-fast rounded-full bg-gray-300 p-2"></span>
				<span className="inline-block h-5 w-1/3 animate-pulse-fast rounded-full bg-gray-300 px-10 py-3"></span>
			</div>
		</div>
	)
}
