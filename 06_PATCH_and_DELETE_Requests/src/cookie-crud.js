function fetchCookies() {
    fetch("http://localhost:3000/cookies")
        .then(res => res.json())
        .then(cookies => cookies.forEach(cookie => renderCookie(cookie)))
}

function renderCookie(cookie) {    
    const cookieMenu = document.getElementById("cookie-menu")
    
    const cookieCard = document.createElement("div")
    cookieCard.id = "cookie-card"
    
    const cookieName = document.createElement("h1")
    cookieName.textContent = cookie.name
    
    const cookieQuantity = document.createElement("h2")
    cookieQuantity.textContent = `Cookies in stash: ${cookie.quantity}`
    
    const cookieImage = document.createElement("img")
    cookieImage.src = cookie.image_url
    
    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "EAT ALL"
    deleteBtn.addEventListener("click", () => deleteCookie(cookie, cookieCard))
    
    const favoriteBtn = document.createElement("button")
    let favoriteToggle = cookie.isFavorite
    favoriteBtn.textContent = cookie.isFavorite ? "★" : "☆"
    favoriteBtn.addEventListener("click", (e) => {
        favoriteToggle = !favoriteToggle
        favoriteBtn.textContent = favoriteToggle ? "★" : "☆"
        updateFavorite(cookie, favoriteToggle)
    })

    cookieCard.append(cookieName, cookieQuantity, cookieImage, deleteBtn, favoriteBtn)
    cookieMenu.append(cookieCard)
}   

function deleteCookie(cookie, cookieCard) {
    fetch(`http://localhost:3000/cookies/${cookie.id}`, {
        method: "DELETE"
    })  
        .then(cookieCard.remove())
}

function updateFavorite(cookie, favoriteToggle) {
    fetch(`http://localhost:3000/cookies/${cookie.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"isFavorite": favoriteToggle})
    })
}

fetchCookies()