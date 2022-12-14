import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { useCanvas } from '../context/canvas'
import { ColorPicker } from './color-picker'

export const EditorText = (props) => {
	const {
		state: { canvas, fabric },
	} = useCanvas()

	const [text, setText] = useState('')
	const [rotation, setRotation] = useState('')
	const [fill, setFill] = useState('#000000')

	const activeObject = canvas?.getActiveObject() || null

	const addText = () => {
		if (fabric && canvas) {
			const ftext = new fabric.Text(text, {
				type: 'text',
				fill: fill || '#000',
				angle: rotation || 0,
			})
			canvas.viewportCenterObject(ftext)
			canvas.add(ftext)
			canvas.setActiveObject(ftext)
		}
	}

	const addNewText = () => {
		if (canvas) {
			canvas.discardActiveObject()
			canvas.renderAll()
		}

		// reset form
		setText('')
		setRotation('')
		setFill('#000000')
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
		if (!activeObject) return setFill(e)
		activeObject.set({ fill: e })
		canvas.renderAll()

		setFill(e)
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
		} else {
			// reset input on discard active object
			setText('')
			setRotation('')
			setFill('#000000')
		}
	}, [activeObject])

	return (
		<div {...props}>
			<h2 css={tw`text-2xl font-bold mb-8`}>Text</h2>
			<div css={tw`mb-4`}>
				<label htmlFor="text">Text</label>
				<textarea
					id="text"
					value={text}
					onChange={updateText}
					placeholder="Enter your text here"
					css={tw`w-full border border-gray-400 p-2 rounded`}
				/>
			</div>
			<div css={tw`mb-4`}>
				<label htmlFor="color">Color</label>
				<ColorPicker selected={fill} setSelected={updateFill} />
			</div>
			<div css={tw`mb-4`}>
				<label htmlFor="rotation">Rotate</label>
				<input
					id="rotation"
					value={rotation}
					onChange={updateRotation}
					placeholder="0-360"
					css={tw`w-full border border-gray-400 p-2 rounded`}
				/>
			</div>

			{!activeObject ? (
				<button
					css={tw`w-full py-2 border border-gray-200 rounded text-center bg-blue-500 text-white shadow-md mt-4`}
					onClick={() => addText()}
				>
					Add
				</button>
			) : (
				<button
					css={tw`w-full py-2 border border-gray-200 rounded text-center bg-white shadow-md mt-4`}
					onClick={() => addNewText()}
				>
					Add New Text
				</button>
			)}
		</div>
	)
}
