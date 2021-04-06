const getUser = async userId => {
	try {
		const response = await fetch(`https://api.github.com/users/${userId}`)
		const userData = await response.json()
		return userData
	} catch (err) {
		throw new Error('Failed to fetch user')
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
const itemsList = document.querySelector('.infoblock__items')

const formButton = document.querySelector('.findform__submit')

formButton.addEventListener('click', () => {
	let formInputValue = document.querySelector('.findform__input').value
	console.log(formInputValue)
})

// getUser('facebook')
// 	.then(userData => {
// 		infoblock.insertAdjacentHTML(
// 			'afterbegin',
// 			`<img class="infoblock__avatar" src="${userData['avatar_url']}">`
// 		)
// 		itemsList.insertAdjacentHTML(
// 			'beforeend',
// 			`<li><a href="${userData['html_url']}" target="_blank">${userData['login']}</a></li>`
// 		)

// 		switch (true) {
// 			case !!userData['location']:
// 				itemsList.insertAdjacentHTML(
// 					'beforeend',
// 					`<li class="items__location">${userData['location']}</li>`
// 				)
// 			case !!userData['bio']:
// 				itemsList.insertAdjacentHTML('beforeend', `<li>${userData['bio']}</li>`)
// 		}

// 		itemsList.insertAdjacentHTML(
// 			'beforeend',
// 			`<li><strong>Repositories (${userData['public_repos']}):</strong></li>`
// 		)
// 		itemsList.insertAdjacentHTML('beforeend', `<li class="items__rep"></li>`)
// 		let itemsRep = document.querySelector('.infoblock__avatar')

// 		console.log(userData.repos_url)
// 		// let repsUrl = ''
// 		// getRep(repsUrl).then(repUrl => {
// 		// 	console.log(repUrl[18])
// 		// })
// 		// const keys = Object.keys(userData)
// 		// keys.forEach(key => {
// 		// 	// console.log(`${key} : ${userData[key]}`)
// 		// 	// let newNode = document.createElement('li')
// 		// 	// newNode.className = 'infoblock__item'
// 		// 	// newNode.innerHTML = `${key} : ${userData[key]}`
// 		// 	// itemsList.append(newNode)
// 		// 	let k, kValue
// 		// 	switch (key) {
// 		// 		case 'avatar_url':
// 		// 			itemAvatar.setAttribute('src', `${userData[key]}`)
// 		// 			k = key
// 		// 			kValue = userData[key]
// 		// 			break
// 		// 		default:
// 		// 			k = key
// 		// 			kValue = userData[key]
// 		// 	}
// 		// 	let html = `<li class="infoblock__item"><span>${k}</span><span>${kValue}</span></li>`
// 		// 	itemsList.insertAdjacentHTML('beforeend', html)
// 		// })
// 	})
// 	.catch(err => alert(err.message))
