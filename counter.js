export function setupCounter(element) {
  let counter = 5
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 5))
  setCounter(5)
}
