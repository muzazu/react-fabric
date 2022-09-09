import { css } from '@emotion/css'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
	AlignCenter,
	Copy,
	CornerDownRight,
	CornerLeftUp,
	Download,
	Upload,
	XSquare,
} from 'react-feather'
import tw from 'twin.macro'
import { useCanvas } from '../context/canvas'
import {
	bringForward,
	centerHorizontal,
	centerVertical,
	clearAll,
	clone,
	flipHorizontal,
	flipVertical,
	sendBackwards,
} from '../utils/canvas-events'

export const CanvasContextMenu = (props) => {
	const {
		state: { contextMenu, canvas },
		dispatch,
	} = useCanvas()

	const activeObject = canvas?.getActiveObject() || null

	const hideContextMenu = () =>
		dispatch({
			contextMenu: {
				x: null,
				y: null,
				active: false,
			},
		})

	return (
		<Menu as="div" {...props}>
			{({ open }) =>
				(open || contextMenu.active) && activeObject ? (
					<Transition
						as={Fragment}
						enter={css(tw`transition duration-100 ease-out`)}
						enterFrom={css(tw`transform scale-95 opacity-0`)}
						enterTo={css(tw`transform scale-100 opacity-100`)}
						leave={css(tw`transition duration-75 ease-out`)}
						leaveFrom={css(tw`transform scale-100 opacity-100`)}
						leaveTo={css(tw`transform scale-95 opacity-0`)}
						show={contextMenu.active}
					>
						<Menu.Items
							css={[
								tw`absolute w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10`,
								{ top: contextMenu.y, left: contextMenu.x },
							]}
						>
							<Menu.Item>
								<div css={tw`text-sm font-bold px-2 py-3`}>
									Quick Actions
								</div>
							</Menu.Item>
							<Menu.Item>
								<button
									css={tw`text-gray-900 hover:bg-blue-50 flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
									onClick={() => {
										flipHorizontal(canvas)
										hideContextMenu()
									}}
								>
									<CornerDownRight
										css={tw`text-gray-400 h-4 w-4 mr-2`}
									/>{' '}
									Horizontal Flip
								</button>
							</Menu.Item>
							<Menu.Item>
								<button
									css={tw`text-gray-900 hover:bg-blue-50 flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
									onClick={() => {
										flipVertical(canvas)
										hideContextMenu()
									}}
								>
									<CornerLeftUp
										css={tw`text-gray-400 h-4 w-4 mr-2`}
									/>{' '}
									Vertical Flip
								</button>
							</Menu.Item>
							<Menu.Item>
								<button
									css={tw`text-gray-900 hover:bg-blue-50 flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
									onClick={() => {
										clone(canvas)
										hideContextMenu()
									}}
								>
									<Copy
										css={tw`text-gray-400 h-4 w-4 mr-2`}
									/>{' '}
									Clone
								</button>
							</Menu.Item>
							<Menu.Item>
								<button
									css={tw`text-gray-900 hover:bg-blue-50 flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
									onClick={() => {
										centerHorizontal(canvas)
										hideContextMenu()
									}}
								>
									<AlignCenter
										css={tw`text-gray-400 h-4 w-4 mr-2`}
									/>{' '}
									Horizontal Center
								</button>
							</Menu.Item>
							<Menu.Item>
								<button
									css={tw`text-gray-900 hover:bg-blue-50 flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
									onClick={() => {
										centerVertical(canvas)
										hideContextMenu()
									}}
								>
									<AlignCenter
										css={tw`text-gray-400 h-4 w-4 mr-2`}
									/>{' '}
									Vertical Center
								</button>
							</Menu.Item>
							<Menu.Item>
								<button
									css={tw`text-gray-900 hover:bg-blue-50 flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
									onClick={() => {
										sendBackwards(canvas)
										hideContextMenu()
									}}
								>
									<Download
										css={tw`text-gray-400 h-4 w-4 mr-2`}
									/>{' '}
									Send Backwards
								</button>
							</Menu.Item>
							<Menu.Item>
								<button
									css={tw`text-gray-900 hover:bg-blue-50 flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
									onClick={() => {
										bringForward(canvas)
										hideContextMenu()
									}}
								>
									<Upload
										css={tw`text-gray-400 h-4 w-4 mr-2`}
									/>{' '}
									Bring Forward
								</button>
							</Menu.Item>
						</Menu.Items>
					</Transition>
				) : (open || contextMenu.active) && !activeObject ? (
					<Transition
						as={Fragment}
						enter={css(tw`transition duration-100 ease-out`)}
						enterFrom={css(tw`transform scale-95 opacity-0`)}
						enterTo={css(tw`transform scale-100 opacity-100`)}
						leave={css(tw`transition duration-75 ease-out`)}
						leaveFrom={css(tw`transform scale-100 opacity-100`)}
						leaveTo={css(tw`transform scale-95 opacity-0`)}
						show={contextMenu.active}
					>
						<Menu.Items
							css={[
								tw`absolute w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10`,
								{ top: contextMenu.y, left: contextMenu.x },
							]}
						>
							<Menu.Item>
								<div css={tw`text-sm font-bold px-2 py-3`}>
									Quick Actions
								</div>
							</Menu.Item>
							<Menu.Item>
								<button
									css={tw`text-gray-900 hover:bg-blue-50 flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
									onClick={() => {
										clearAll(canvas)
										hideContextMenu()
									}}
								>
									<XSquare
										css={tw`text-gray-400 h-4 w-4 mr-2`}
									/>{' '}
									Clear All
								</button>
							</Menu.Item>
						</Menu.Items>
					</Transition>
				) : (
					''
				)
			}
		</Menu>
	)
}
