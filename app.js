const loader = document.querySelector('.loader')

const getUser = async userId => {
	try {
		loader.classList.remove('loader_hide')
		const response = await fetch(`https://api.github.com/users/${userId}`)
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
		loader.classList.remove('loader_hide')
		const response = await fetch(repositoriesUrl)
		const repData = await response.json()
		loader.classList.add('loader_hide')
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
	} else {
		formButton.setAttribute('disabled', 'disabled')
	}
})

formButton.addEventListener('click', () => {
	let formInputValue = formInput.value
	formInput.value = ''
	formButton.setAttribute('disabled', 'disabled')
	console.log(typeof getUser(formInputValue))
	console.log(getUser(formInputValue))
	getUser(formInputValue)
		.then(userData => {
			itemsList.innerText = ''
			avatar.setAttribute('src', userData.avatar_url)
			console.log(userData)
			if (userData.name) {
				itemsList.insertAdjacentHTML(
					'beforeend',
					`<li><a href="${userData.html_url}" target="_blank">${userData.name}</a> — @${userData.login}</li>`
				)
			} else {
				itemsList.insertAdjacentHTML(
					'beforeend',
					`<li><a href="${userData.html_url}" target="_blank">@${userData.login}</a></li>`
				)
			}
			// location
			if (userData.location) {
				itemsList.insertAdjacentHTML(
					'beforeend',
					`<li class="items__location">${userData.location}</li>`
				)
			}
			// bio
			if (userData.bio) {
				itemsList.insertAdjacentHTML(
					'beforeend',
					`<li class="items__bio">${userData.bio}</li>`
				)
			}
			// public_repos
			if (userData.public_repos) {
				itemsList.insertAdjacentHTML(
					'beforeend',
					`<li class="items__repos"><strong>Public repositories: ${userData.public_repos}</strong></li>`
				)
			}
			// followers, following
			if (userData.followers || userData.following) {
				itemsList.insertAdjacentHTML(
					'beforeend',
					`<li class="items__follow">
						<p>Followers: ${userData.followers}</p> ・ <p>Following: ${userData.following}</p>
					</li>`
				)
			}
			// repositories
			if (userData.repos_url) {
				itemsList.insertAdjacentHTML(
					'beforeend',
					`<li class="items__repos-url"></li>`
				)
				getRep(userData.repos_url)
					.then(repos => {
						console.log(typeof repos, repos)
						let repListBlock = document.querySelector('.items__repos-url')
						Object.keys(repos).forEach(function(key) {
							repListBlock.insertAdjacentHTML(
								'beforeend',
								`<a href="${this[key].html_url}" target="_blank">${this[key].name}</a>`
							)
						}, repos)
					})
					.catch(err => alert(err.message))
			}
		})
		.catch(err => alert(err.message))
})
