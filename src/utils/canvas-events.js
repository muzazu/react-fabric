export const onObjectSelected = ({ selected }) => {
	if (selected?.length === 1) return selected[0].type

	return null
}

/**
 * quick action
 */
export const flipHorizontal = (canvas) => {
	const activeObject = canvas?.getActiveObject() || null
	if (!activeObject) return

	activeObject.toggle('flipX')
	canvas.renderAll()
}
export const flipVertical = (canvas) => {
	const activeObject = canvas?.getActiveObject() || null
	if (!activeObject) return

	activeObject.toggle('flipY')
	canvas.renderAll()
}
export const centerHorizontal = (canvas) => {
	const activeObject = canvas?.getActiveObject() || null
	if (!activeObject) return

	canvas.centerObjectH(activeObject)
	canvas.renderAll()
}
export const centerVertical = (canvas) => {
	const activeObject = canvas?.getActiveObject() || null
	if (!activeObject) return

	canvas.centerObjectV(activeObject)
	canvas.renderAll()
}
export const clone = (canvas) => {
	const activeObject = canvas?.getActiveObject() || null
	if (!activeObject) return

	activeObject.clone((objClone) => {
		canvas.add(
			objClone.set({
				left: activeObject.left + 10,
				top: activeObject.top + 10,
			})
		)
	})
}
export const sendBackwards = (canvas) => {
	const activeObject = canvas?.getActiveObject() || null
	if (!activeObject) return

	canvas.sendBackwards(activeObject)
}
export const bringForward = (canvas) => {
	const activeObject = canvas?.getActiveObject() || null
	if (!activeObject) return

	canvas.bringForward(activeObject)
}
export const remove = (canvas) => {
	const activeObject = canvas?.getActiveObject() || null
	if (!activeObject) return

	canvas.remove(activeObject)
}

export const clearAll = (canvas) => {
	canvas.clear()
}
