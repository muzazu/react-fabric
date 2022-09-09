import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { useCanvas } from '../context/canvas'

export const EditorSetting = (props) => {
	const {
		state: { canvas },
	} = useCanvas()
	const [cWidth, setCWidth] = useState('')
	const [cHeight, setCHeight] = useState('')

	const update = () => {
		if (!canvas) return

		canvas.setHeight(cHeight)
		canvas.setWidth(cWidth)

		canvas.renderAll()
	}

	useEffect(() => {
		if (canvas) {
			setCHeight(canvas.height)
			setCWidth(canvas.width)
		}
	}, [canvas])

	return (
		<div {...props}>
			<h2 css={tw`text-2xl font-bold mb-8`}>Setting</h2>

			<div css={tw`mb-4`}>
				<label htmlFor="text">Canvas Width</label>
				<div css={tw`relative`}>
					<input
						id="text"
						value={cWidth}
						onChange={(e) => setCWidth(e.target.value)}
						placeholder="150"
						css={tw`w-full border border-gray-400 p-2 rounded`}
					/>
					<div css={tw`absolute top-1 right-4 text-gray-400`}>px</div>
				</div>
			</div>
			<div css={tw`mb-4`}>
				<label htmlFor="text">Canvas Height</label>
				<div css={tw`relative`}>
					<input
						id="text"
						value={cHeight}
						onChange={(e) => setCHeight(e.target.value)}
						placeholder="150"
						css={tw`w-full border border-gray-400 p-2 rounded`}
					/>
					<div css={tw`absolute top-1 right-4 text-gray-400`}>px</div>
				</div>
			</div>

			<button
				css={tw`w-full py-2 border border-gray-200 rounded text-center bg-blue-500 text-white shadow-md mt-4`}
				onClick={() => update()}
			>
				Save
			</button>
		</div>
	)
}
