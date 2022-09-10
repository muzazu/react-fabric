import {
	AlignCenter,
	Copy,
	CornerDownRight,
	CornerLeftUp,
	Download,
	Trash,
	Upload,
} from 'react-feather'
import tw from 'twin.macro'
import { useCanvas } from '../context/canvas'
import {
	bringForward,
	centerHorizontal,
	centerVertical,
	clone,
	flipHorizontal,
	flipVertical,
	remove,
	sendBackwards,
} from '../utils/canvas-events'

export const CanvasActions = (props) => {
	const {
		state: { canvas },
	} = useCanvas()

	const activeObject = canvas?.getActiveObject() || null

	if (!activeObject) return
	return (
		<div css={tw`flex justify-center space-x-4 absolute inset-x-0 top-4`}>
			<button
				css={tw`text-gray-900 bg-gray-100 hover:bg-blue-50 border border-gray-600 flex px-2 py-2 items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
				onClick={() => flipHorizontal(canvas)}
			>
				<CornerDownRight css={tw`text-gray-900 h-4 w-4 mr-2`} />{' '}
				Horizontal Flip
			</button>
			<button
				css={tw`text-gray-900 bg-gray-100 hover:bg-blue-50 border border-gray-600 flex px-2 py-2 items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
				onClick={() => flipVertical(canvas)}
			>
				<CornerLeftUp css={tw`text-gray-900 h-4 w-4 mr-2`} />
				Vertical Flip
			</button>
			<button
				css={tw`text-gray-900 bg-gray-100 hover:bg-blue-50 border border-gray-600 flex px-2 py-2 items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
				onClick={() => clone(canvas)}
			>
				<Copy css={tw`text-gray-900 h-4 w-4 mr-2`} /> Clone
			</button>
			<button
				css={tw`text-gray-900 bg-gray-100 hover:bg-blue-50 border border-gray-600 flex px-2 py-2 items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
				onClick={() => centerHorizontal(canvas)}
			>
				<AlignCenter css={tw`text-gray-900 h-4 w-4 mr-2`} /> Horizontal
				Center
			</button>
			<button
				css={tw`text-gray-900 bg-gray-100 hover:bg-blue-50 border border-gray-600 flex px-2 py-2 items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
				onClick={() => centerVertical(canvas)}
			>
				<AlignCenter css={tw`text-gray-900 h-4 w-4 mr-2`} /> Vertical
				Center
			</button>
			<button
				css={tw`text-gray-900 bg-gray-100 hover:bg-blue-50 border border-gray-600 flex px-2 py-2 items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
				onClick={() => sendBackwards(canvas)}
			>
				<Download css={tw`text-gray-900 h-4 w-4 mr-2`} /> Send Backwards
			</button>
			<button
				css={tw`text-gray-900 bg-gray-100 hover:bg-blue-50 border border-gray-600 flex px-2 py-2 items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
				onClick={() => bringForward(canvas)}
			>
				<Upload css={tw`text-gray-900 h-4 w-4 mr-2`} /> Bring Forward
			</button>
			<button
				css={tw`text-white bg-red-600 hover:bg-red-500 border border-gray-600 flex px-2 py-2 items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
				onClick={() => remove(canvas)}
			>
				<Trash css={tw`text-white h-4 w-4 mr-2`} /> Remove
			</button>
		</div>
	)
}
