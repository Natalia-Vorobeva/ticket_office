function InfoMessage({
	info,
	infoPast
}) {
	const hasMessages = info || infoPast;
	const infoStyles = {
		container: 'bg-gradient-to-r from-[#1a1a2e]/80 to-[#2d2d4d]/60 border-l-4 border-[#6d28d9]',
		icon: 'text-[#8b5cf6]',
		text: 'text-gray-200',
		iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
	};

	return (
		<div className={`min-h-[80px] transition-all duration-300 ${hasMessages ? 'opacity-100' : 'opacity-0'}`}>
			{hasMessages ? (
				<div className={`${infoStyles.container} rounded-r-lg p-4 mb-4 shadow-lg backdrop-blur-sm`}>
					<div className="flex items-start gap-3">
						<div className="flex-shrink-0 mt-1">
							<svg
								className={`w-5 h-5 ${infoStyles.icon}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d={infoStyles.iconPath}
								/>
							</svg>
						</div>
						<div className="flex-1">
							<div className={`text-sm md:text-base font-medium leading-relaxed ${infoStyles.text}`}>
								{infoPast && (
									<div className="mb-1 text-gray-300">
										{infoPast}
									</div>
								)}
								{info && (
									<div className="text-white">
										{info}
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="mt-3 h-1 w-full bg-[#1a1a2e]/50 rounded-full overflow-hidden">
						<div className="h-full rounded-full bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] w-1/3"></div>
					</div>
				</div>
			) : (
				<div className="min-h-[80px] opacity-0"></div>
			)}
		</div>
	);
}

export default InfoMessage