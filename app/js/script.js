import { Backend } from './backend.js'
import { startLoader, stopLoader } from './helpers.js'

const API = new Backend
API.setBaseUrl('https://api.icndb.com')
const form = document.querySelector('.picknumber')
const jokeList = document.querySelector('.jokelist')
const entry = document.querySelector('#number')
const button = document.querySelector('.btn-grad')
const ticks = document.querySelector('#ticks')
const intro = document.querySelector('#intro')
const burgerMenuIcon = document.querySelector('.burger-menu-icon')
const burgerMenu = document.querySelector('.burger-menu')



API.get(`/jokes/random/`).then(data => {
	let introQuote = ''
	Object.values(data).forEach(element => {
		introQuote = `<li>"${element.joke}"</li>`
	});
	intro.innerHTML = introQuote
})

form.addEventListener('submit', (event) => {
	event.preventDefault()
	let startTime = performance.now();
	if (entry.value > 0) {
		startLoader(button)
		let cats = document.querySelectorAll('input[type=checkbox]:checked')
		if (cats.length > 0) {
			let catArray = []
			cats.forEach(item => {
				catArray.push(item.name)
			})
			API.get(`/jokes/random/${entry.value}?limitTo=${catArray}`).then(data => {
				let generateList = ''
				data.value.forEach(element => {
					generateList += `<li>${element.joke}</li>`
				});
				ticks.innerHTML = `List generated in: ${Math.round(performance.now() - startTime)} ms`
				jokeList.innerHTML = generateList
			})
				.finally(() => {
					stopLoader(button, "GENERATE");
				})
			return
		}

		API.get(`/jokes/random/${entry.value}`).then(data => {
			let generateList = ''
			data.value.forEach(element => {
				generateList += `<li>${element.joke}</li>`
			});
			ticks.innerHTML = `List generated in: ${Math.round(performance.now() - startTime)} ms`
			jokeList.innerHTML = generateList
		})
			.finally(() => {
				stopLoader(button, "GENERATE");
			})
	}
})

burgerMenuIcon.addEventListener('click', () => {
	burgerMenu.classList.toggle('hide')

})