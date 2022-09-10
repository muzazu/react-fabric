import { useEffect, useRef } from 'react'
import { fabric } from 'fabric'
import { init } from '../utils/fabric'
import { useCanvas } from '../context/canvas'
import { onObjectSelected } from '../utils/canvas-events'

export const FabricJSCanvas = ({ options, ...props }) => {
	const canvasEl = useRef(null)
	const {
		dispatch,
		state: {
			editor: { tab },
		},
	} = useCanvas()

	const CANVAS_OPTION = {
		hoverCursor: 'pointer',
		selection: true,
		selectionBorderColor: 'blue',
		preserveObjectStacking: true,

		fireRightClick: true, // <-- enable firing of right click events
		fireMiddleClick: false, // <-- enable firing of middle click events
		stopContextMenu: true, // <--  prevent context menu from showing
	}

	const dispatchSelection = (e) =>
		dispatch({ editor: { tab: onObjectSelected(e) || tab || 'setting' } })

	const onMouseDown = (e) => {
		if (e.button === 3) {
			dispatch({
				contextMenu: {
					x: e.e.clientX + 8,
					y: e.e.clientY + 8,
					active: true,
				},
			})
		} else {
			dispatch({
				contextMenu: {
					x: null,
					y: null,
					active: false,
				},
			})
		}
	}

	useEffect(() => {
		const canvas = new fabric.Canvas(canvasEl.current, {
			...CANVAS_OPTION,
			...options,
		})

		canvas.on({
			'selection:created': dispatchSelection,
			'selection:updated': dispatchSelection,
			'selection:cleared': dispatchSelection,
			'mouse:down': onMouseDown,
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
