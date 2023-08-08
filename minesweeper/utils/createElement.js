export function createElement(tagName, className, title = undefined) {
	const element = document.createElement(tagName)
	element.classList.add(className)
	if (title) {
		element.innerText = title
	}
	return element
}