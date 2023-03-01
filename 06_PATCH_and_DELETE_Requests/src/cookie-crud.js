function fetchCookies() {
    fetch("http://localhost:3000/cookies")
        .then(res => res.json())
        .then(cookies => cookies.forEach(cookie => renderCookie(cookie)))
}

function renderCookie(cookie) {    
    const cookieMenu = document.getElementById("cookie-menu")
    const cookieCard = document.createElement("div")
    const cookieName = document.createElement("h1")
    const cookieQuantity = document.createElement("h2")
    const cookieImage = document.createElement("img")
    const deleteBtn = document.createElement("button")
    const favoriteBtn = document.createElement("button")

    cookieName.textContent = cookie.name
    cookieQuantity.textContent = `Cookies in stash: ${cookie.quantity}`
    cookieImage.src = cookie.image_url
    cookieCard.id = "cookie-card"
    deleteBtn.textContent = "EAT ALL"
    favoriteBtn.textContent = cookie.isFavorite ? "★" : "☆"

    deleteBtn.addEventListener("click", () => deleteCookie(cookie, cookieCard))
    favoriteBtn.addEventListener("click", () => toggleFavorite(cookie))

    cookieCard.append(cookieName, cookieQuantity, cookieImage, deleteBtn, favoriteBtn)
    cookieMenu.append(cookieCard)
}

function deleteCookie(cookie, cookieCard) {
    fetch(`http://localhost:3000/cookies/${cookie.id}`, {
        method: "DELETE"
    })
        .then(cookieCard.remove())
}

function toggleFavorite(cookie) {
    fetch(`http://localhost:3000/cookies/${cookie.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"isFavorite": !cookie.isFavorite})
    })
        .then(res => res.json())
        .then(cookie => updateCookie(cookie))
}

function updateCookie(cookie) {
    
}

fetchCookies()