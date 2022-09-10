import { useEffect, useState } from 'react'
import { Download } from 'react-feather'
import tw from 'twin.macro'
import { useCanvas } from '../context/canvas'
import { ColorPicker } from './color-picker'

export const EditorSetting = (props) => {
	const {
		state: { canvas },
	} = useCanvas()
	const [cWidth, setCWidth] = useState('')
	const [cHeight, setCHeight] = useState('')
	const [cColor, setCColor] = useState('')

	const update = () => {
		if (!canvas) return

		canvas.setHeight(cHeight)
		canvas.setWidth(cWidth)
		if (cColor) canvas.setBackgroundColor(cColor)

		canvas.renderAll()
	}

	const saveImage = (e) => {
		if (!canvas) return

		const href = canvas.toDataURL({
			format: 'png',
			quality: 0.8,
		})

		e.target.href = href
		e.target.download = 'canvas.png'
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
				<label htmlFor="text">Canvas Color</label>
				<div css={tw`relative`}>
					<ColorPicker selected={cColor} setSelected={setCColor} />
				</div>
			</div>
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

			<hr
				css={tw`h-1 bg-gradient-to-r from-white via-gray-200 to-white mt-8 border-none`}
			/>

			<a
				onClick={saveImage}
				css={tw`block flex justify-center items-center w-full py-4 border border-gray-200 rounded text-center bg-white text-black shadow-md mt-8 cursor-pointer`}
			>
				<Download css={tw`mr-2`} /> Download
			</a>
		</div>
	)
}
