const loader = document.querySelector('.loader')

const getUser = async userId => {
	try {
		loader.classList.remove('loader_hide')
		const response = await fetch(`https://api.github.com/users/${userId}`)
		console.log(response.ok)

		const userData = await response.json()
		loader.classList.add('loader_hide')
		return userData
	} catch (err) {
		// throw new Error('Failed to fetch user')
		console.log('some error')
	}
}

const getRep = async repositoriesUrl => {
	try {
		const response = await fetch(repositoriesUrl)
		const repData = await response.json()
		return repData
	} catch (err) {
		throw new Error('Failed to fetch user')
	}
}

const infoblock = document.querySelector('.infoblock')
const avatar = document.querySelector('.infoblock__avatar')
const itemsList = document.querySelector('.infoblock__items')

const formInput = document.querySelector('.findform__input')
const formButton = document.querySelector('.findform__submit')

formInput.addEventListener('input', e => {
	formInput.value = formInput.value.replace(/\s+/gi, '')
	if (formInput.value.length) {
		formButton.removeAttribute('disabled')
		//console.log(formInput.value, '-', formInput.value.length)
	} else {
		formButton.setAttribute('disabled', 'disabled')
	}
})

const objKeys = [
	// 'name',
	// 'html_url',
	'location',
	'bio',
	'public_repos',
	'repos_url',
	'followers',
	'following',
]

formButton.addEventListener('click', () => {
	let formInputValue = formInput.value
	formInput.value = ''
	formButton.setAttribute('disabled', 'disabled')
	getUser(formInputValue)
		.then(userData => {
			itemsList.innerText = ''
			avatar.setAttribute('src', userData.avatar_url)
			if (userData.name) {
				itemsList.insertAdjacentHTML(
					'beforeend',
					`<li><a href="${userData.html_url}">${userData.name}</a></li>`
				)
			} else {
				itemsList.insertAdjacentHTML(
					'beforeend',
					`<li><a href="${userData.html_url}">${userData.login}</a></li>`
				)
			}

			if (userData.location) {
				itemsList.insertAdjacentHTML(
					'beforeend',
					`<li class="items__location">${userData.location}</li>`
				)
			}
			Object.keys(userData).forEach(key => {
				// console.log(key, ':', userData[key])
				let addClass = `class="items__${key}"`
				// itemsList.insertAdjacentHTML(
				// 	'beforeend',
				// 	`<li ${addClass}>${key}: ${userData[key]}</li>`
				// )
				//
				switch (key) {
					case 'name':
						itemsList.insertAdjacentHTML(
							'beforeend',
							`<li ${addClass}>${key}: ${userData[key]}</li>`
						)
					default:
						itemsList.insertAdjacentHTML(
							'beforeend',
							`<li ${addClass}>${key}: ${userData[key]}</li>`
						)
				}
			})

			// name, url
			// document.querySelector('.items__html_url').innerHTML = userData.name
			// document
			// 	.querySelector('.items__html_url')
			// 	.setAttribute('href', userData.html_url)
			// document.querySelector('.items__html_url').classList.add('.items_show')
		})
		.catch(err => alert(err.message))
})
