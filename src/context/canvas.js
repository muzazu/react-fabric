import * as React from 'react'

const CanvasContext = React.createContext()

function canvasReducer(state, action) {
	return { ...state, ...action }
}

function CanvasProvider({ children }) {
	const [state, dispatch] = React.useReducer(canvasReducer, {
		canvas: null,
		fabric: null,
		editor: {
			tab: null,
		},
	})

	const value = { state, dispatch }
	return (
		<CanvasContext.Provider value={value}>
			{children}
		</CanvasContext.Provider>
	)
}

function useCanvas() {
	const context = React.useContext(CanvasContext)
	if (context === undefined) {
		throw new Error('useCanvas must be used within a CanvasProvider')
	}
	return context
}

export { CanvasProvider, useCanvas }
