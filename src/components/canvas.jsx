import { useEffect, useRef } from 'react'
import { fabric } from 'fabric'
import { init } from '../utils/fabric'
import { useCanvas } from '../context/canvas'
import { onObjectSelected } from '../utils/canvas-events'

export const FabricJSCanvas = ({ options, ...props }) => {
	const canvasEl = useRef(null)
	const { dispatch } = useCanvas()

	const CANVAS_OPTION = {
		hoverCursor: 'pointer',
		selection: true,
		selectionBorderColor: 'blue',
		preserveObjectStacking: true,

		fireRightClick: false, // <-- enable firing of right click events
		fireMiddleClick: false, // <-- enable firing of middle click events
		stopContextMenu: true, // <--  prevent context menu from showing
	}

	const dispatchSelection = (e) =>
		dispatch({ editor: { tab: onObjectSelected(e) } })

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current, {
			...CANVAS_OPTION,
			...options,
		})

		canvas.on({
			'selection:created': dispatchSelection,
			'selection:updated': dispatchSelection,
			'selection:cleared': dispatchSelection,
		})

		init(fabric, canvas)

		dispatch({ canvas, fabric })

		return () => {
			dispatch(null)
			canvas.dispose()
		}
	}, [dispatch, options])

	return <canvas width="300" height="300" ref={canvasEl} {...props} />
}
