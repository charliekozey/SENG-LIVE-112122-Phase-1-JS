function fetchCookies() {
    fetch("http://localhost:3000/cookies")
        .then(res => res.json())
        .then(cookies => cookies.forEach(cookie => renderCookie(cookie)))
}

function renderCookie(cookie) {
    const cookieMenu = document.getElementById("cookie-menu")
    const cookieCard = document.createElement("div")
    const cookieName = document.createElement("h1")
    const cookieDeliciousness = document.createElement("h2")
    const cookieImage = document.createElement("img")
    const deleteBtn = document.createElement("button")

    cookieName.textContent = cookie.name
    cookieDeliciousness.textContent = `Deliciousness: ${cookie.deliciousness}/5`
    cookieImage.src = cookie.image_url
    cookieCard.id = "cookie-card"

    deleteBtn.addEventListener("click", () => deleteCookie(cookie, cookieCard))

    cookieCard.append(cookieName, cookieDeliciousness, cookieImage, deleteBtn)
    cookieMenu.append(cookieCard)   
}

function deleteCookie(cookie, cookieCard) {
    fetch("http://localhost:3000/cookies", {
        method: "DELETE"
    })
        .then(cookieCard.remove())
}

fetchCookies()