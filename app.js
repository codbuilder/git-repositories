const loader = document.querySelector('.loader')

const getUser = async userId => {
	try {
		loader.classList.remove('loader_hide')
		const response = await fetch(`https://api.github.com/users/${userId}`)
		// console.log('status: ', response.status, response.ok)
		if (response.ok) {
			const userData = await response.json()
			loader.classList.add('loader_hide')
			return userData
		} else {
			loader.classList.add('loader_hide')
			return response.status
			//throw 'Error 404'
		}
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
	// console.log(typeof getUser(formInputValue))
	// console.log(getUser(formInputValue))
	getUser(formInputValue)
		.then(userData => {
			// console.log('userData:', userData)
			itemsList.innerText = ''
			if (userData === 403) {
				avatar.setAttribute('src', './images/avatar-default.png')
				itemsList.insertAdjacentHTML(
					'beforeend',
					`<li>Exceeded the limit of requests to the GitHub API</li>`
				)
				throw 'Error 403: Exceeded the limit of requests to the GitHub API'
			} else if (userData === 404) {
				avatar.setAttribute('src', './images/avatar-default.png')
				itemsList.insertAdjacentHTML(
					'beforeend',
					`<li>The user <strong>${formInputValue}</strong> does not exist</li>`
				)
				throw 'Error 404: The user does not exist'
			}
			avatar.setAttribute('src', userData.avatar_url)
			// console.log(userData)
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
			// pages of repositories
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
			// repositories // freeCodeCamp // ?page=1
			if (userData.repos_url) {
				itemsList.insertAdjacentHTML(
					'beforeend',
					`<li class="items__repos-url"></li>`
				)
				//console.log('-----')
				//console.log(userData.repos_url)
				//
				if (userData.public_repos) {
					let repLastPage = userData.public_repos % 30
					// console.log('repLastPage:', repLastPage)
					let repPages = (userData.public_repos - repLastPage) / 30
					// console.log('repPages:', repPages)

					if (userData.public_repos < 30) {
						// console.log(`Полных страниц: ${repPages + 1}`)
						repPages++
					} else {
						// console.log(`Полных страниц: ${repPages} и еще одна с репозиториями: ${repLastPage}`)
						repPages++
					}
					for (let pgs = 0; pgs < repPages; pgs++) {
						let repPageUrl = `${userData.repos_url}?page=${pgs + 1}`
						// console.log(pgs, '—', repPageUrl)
						getRep(repPageUrl)
							.then(repos => {
								// console.log(typeof repos, repos)
								let repListBlock = document.querySelector('.items__repos-url')
								Object.keys(repos).forEach(function(key) {
									repListBlock.insertAdjacentHTML(
										'beforeend',
										`<a href="${this[key].html_url}" target="_blank">${this[key].name}</a>`
									)
								}, repos)
							})
							.catch(err => console.log(err.message))
					}
				}
				//
			}
		})
		.catch(err => console.log(err.message))
})
