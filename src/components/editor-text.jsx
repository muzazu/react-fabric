import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { Colors } from '../constants/colors'
import { useCanvas } from '../context/canvas'

export const EditorText = (props) => {
	const {
		state: { canvas, fabric },
	} = useCanvas()

	const [text, setText] = useState('')
	const [rotation, setRotation] = useState('')
	const [fill, setFill] = useState('')

	const activeObject = canvas?.getActiveObject() || null

	const addText = () => {
		if (fabric && canvas) {
			const ftext = new fabric.Text(text, { type: 'text' })
			canvas.viewportCenterObject(ftext)
			canvas.add(ftext)
			canvas.setActiveObject(ftext)
		}
	}

	const updateText = (e) => {
		if (!activeObject) return setText(e.target.value)
		activeObject.text = e.target.value
		canvas.renderAll()

		setText(e.target.value)
	}
	const updateRotation = (e) => {
		if (!activeObject) return setRotation(e.target.value)
		activeObject.angle = e.target.value
		canvas.renderAll()

		setRotation(e.target.value)
	}
	const updateFill = (e) => {
		if (!activeObject) return setFill(e.target.value)
		activeObject.set({ fill: e.target.value })
		canvas.renderAll()

		setFill(e.target.value)
	}

	if (canvas)
		canvas.on('object:modified', (e) => {
			setRotation(e.target.angle)
		})

	useEffect(() => {
		if (activeObject) {
			setText(activeObject.text)
			setRotation(activeObject.angle)
			setFill(activeObject.fill)
		}
	}, [activeObject])

	return (
		<div {...props}>
			<div css={tw`mb-4`}>
				<label htmlFor="text">Teks</label>
				<textarea
					id="text"
					value={text}
					onChange={updateText}
					css={tw`w-full border border-gray-400`}
				/>
			</div>
			<div css={tw`mb-4`}>
				<label htmlFor="color">Warna</label>
				<select
					id="color"
					value={fill}
					onChange={updateFill}
					css={tw`w-full border border-gray-400`}
				>
					{Colors.map((v) => (
						<option key={v} value={v}>
							{v}
						</option>
					))}
				</select>
			</div>
			<div css={tw`mb-4`}>
				<label htmlFor="rotation">Rotasi</label>
				<input
					id="rotation"
					value={rotation}
					onChange={updateRotation}
					css={tw`w-full border border-gray-400`}
				/>
			</div>

			{!activeObject && (
				<button
					css={tw`w-full py-2 border border-gray-200 rounded text-center bg-white shadow-md mt-4`}
					onClick={() => addText()}
				>
					Tambah
				</button>
			)}
		</div>
	)
}
