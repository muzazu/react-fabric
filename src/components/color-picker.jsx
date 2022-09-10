import { css } from '@emotion/css'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { CheckCircle, ChevronDown } from 'react-feather'
import tw from 'twin.macro'
import { Colors } from '../constants/colors'

export const ColorPicker = ({ selected, setSelected, ...props }) => {
	return (
		<Listbox {...props} value={selected} onChange={setSelected}>
			<div css={tw`relative mt-1`}>
				<Listbox.Button
					css={tw`relative w-full cursor-default rounded bg-white py-2 px-2 text-left border border-gray-400 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-500 sm:text-sm`}
				>
					{selected ? (
						<span
							css={[
								tw`block h-4 w-12`,
								{ backgroundColor: selected },
							]}
						></span>
					) : (
						<span css={tw`text-gray-400`}>Choose a color</span>
					)}
					<span
						css={tw`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2`}
					>
						<ChevronDown
							css={tw`h-5 w-5 text-gray-400`}
							aria-hidden="true"
						/>
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave={css(tw`transition ease-in duration-100`)}
					leaveFrom={css(tw`opacity-100`)}
					leaveTo={css(tw`opacity-0`)}
				>
					<Listbox.Options
						css={tw`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
					>
						{Colors.map((color, colorIdx) => (
							<Listbox.Option
								key={colorIdx}
								css={tw`relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-blue-100`}
								value={color}
							>
								{({ selected }) => (
									<>
										<span
											css={[
												tw`block h-4 w-full`,
												{ backgroundColor: color },
											]}
										></span>
										{selected ? (
											<span
												css={tw`absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400`}
											>
												<CheckCircle
													css={tw`h-5 w-5`}
													aria-hidden="true"
												/>
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	)
}
