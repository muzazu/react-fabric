import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { useCanvas } from '../context/canvas'
import { ReactComponent as Circle } from '../assets/svg/circle.svg'
import { ReactComponent as Square } from '../assets/svg/square.svg'
import { ReactComponent as Triangle } from '../assets/svg/triangle.svg'
import { ColorPicker } from './color-picker'

export const EditorShapes = (props) => {
	const {
		state: { canvas },
		dispatch,
	} = useCanvas()
	const [fill, setFill] = useState('#000000')
	const SHAPE_CONF = {
		width: 100,
		height: 100,
		fill,
		type: 'shapes',
	}
	const activeObject = canvas?.getActiveObject() || null

	const updateFill = (e) => {
		if (!activeObject) return setFill(e)
		activeObject.set({ fill: e })
		canvas.renderAll()

		setFill(e)
	}

	const addRect = () => {
		const elm = new fabric.Rect(SHAPE_CONF)
		canvas.viewportCenterObject(elm)

		canvas.add(elm)
		canvas.setActiveObject(elm)
	}
	const addCircle = () => {
		const elm = new fabric.Circle({ radius: 50, type: 'shapes', fill })
		canvas.viewportCenterObject(elm)

		canvas.add(elm)
		canvas.setActiveObject(elm)
	}
	const addTriangle = () => {
		const elm = new fabric.Triangle(SHAPE_CONF)
		canvas.viewportCenterObject(elm)

		canvas.add(elm)
		canvas.setActiveObject(elm)
	}

	const addNewShape = () => {
		if (canvas) {
			canvas.discardActiveObject()
			canvas.renderAll()

			dispatch({ editor: { tab: 'shapes' } })
		}

		// reset form
		setFill('#000000')
	}

	useEffect(() => {
		if (activeObject) {
			setFill(activeObject.fill)
		} else {
			// reset input on discard active object
			setFill('#000000')
		}
	}, [activeObject])

	return (
		<div {...props}>
			<h2 css={tw`text-2xl font-bold mb-8`}>Elements</h2>

			{!activeObject && (
				<div css={tw`flex -mx-2 mb-4`}>
					<div css={tw`p-2 w-full`}>
						<button
							css={tw`p-4 border border-gray-200 hover:bg-gray-100 rounded-md cursor-pointer w-full`}
							onClick={addCircle}
						>
							<Circle css={tw`h-12 w-12`} />
						</button>
					</div>
					<div css={tw`p-2 w-full`}>
						<button
							css={tw`p-4 border border-gray-200 hover:bg-gray-100 rounded-md cursor-pointer w-full`}
							onClick={addRect}
						>
							<Square css={tw`h-12 w-12`} />
						</button>
					</div>
					<div css={tw`p-2 w-full`}>
						<button
							css={tw`p-4 border border-gray-200 hover:bg-gray-100 rounded-md cursor-pointer w-full`}
							onClick={addTriangle}
						>
							<Triangle css={tw`h-12 w-12`} />
						</button>
					</div>
				</div>
			)}

			<div css={tw`mb-4`}>
				<label htmlFor="color">Color</label>
				<ColorPicker selected={fill} setSelected={updateFill} />
			</div>

			{activeObject && (
				<button
					css={tw`w-full py-2 border border-gray-200 rounded text-center bg-white shadow-md mt-4`}
					onClick={() => addNewShape()}
				>
					Add New Shape
				</button>
			)}
		</div>
	)
}
