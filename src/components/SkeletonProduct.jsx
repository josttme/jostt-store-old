export function SkeletonProduct() {
	return (
		<section className="mx-auto my-28 grid max-w-6xl grid-cols-2 gap-4 overflow-hidden  rounded-lg  bg-white shadow-lg">
			<div className="h-[570px] w-[570px] animate-pulse-fast bg-gray-300 shadow-lg"></div>
			<div className="flex flex-col gap-5 px-5 py-11">
				<span className="h-8 w-96 animate-pulse-fast rounded-full bg-gray-300 p-2" />
				<div className="flex flex-col  gap-2">
					<span className="h-6 w-full animate-pulse-fast rounded-full bg-gray-300 p-2" />
					<span className="h-6 w-11/12 animate-pulse-fast rounded-full bg-gray-300 p-2" />
				</div>
				<span className="h-7 w-24 animate-pulse-fast rounded-full bg-gray-300 p-2" />
				<span className="h-9 w-32 animate-pulse-fast rounded-full bg-gray-300 p-2" />
				<div className="flex gap-5">
					<span className="h-12 w-60 animate-pulse-fast rounded-lg bg-gray-300 p-2" />
					<span className="h-12 w-12 animate-pulse-fast rounded-full bg-gray-300 p-2" />
				</div>
			</div>
		</section>
	)
}
