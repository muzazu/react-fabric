export const onObjectSelected = ({ selected }) => {
	if (selected?.length === 1) return selected[0].type

	return null
}
