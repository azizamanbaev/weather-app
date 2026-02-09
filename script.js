const inp = document.getElementById("inp")
const btn = document.getElementById("btn")
const temp = document.getElementById("temp")
const desc = document.getElementById("desc")
const icon = document.getElementById("icon")

async function getWeather(query) {
    try {
        const link = `https://api.weatherapi.com/v1/current.json?key=9727ca855c824827b0434126260902&q=${query}&lang=ru`
        const res = await fetch(link)
        const data = await res.json()

        temp.innerText = data.current.temp_c + "°"
        desc.innerText = data.current.condition.text
        icon.src = "https:" + data.current.condition.icon

        // Меняем фон
        document.body.className = ""
        const condition = data.current.condition.text.toLowerCase()
        console.log("Погода:", condition)

        if (condition.includes("дожд")) {
            document.body.classList.add("rainy")
        } else if (condition.includes("ясно") || condition.includes("солнечно")) {
            document.body.classList.add("sunny")
        } else if (condition.includes("обла") || condition.includes("пасмурно")) {
            document.body.classList.add("cloudy")
        } else if (condition.includes("снег")) {
            document.body.classList.add("snowy")
        } else {
            document.body.classList.add("cloudy") // фон по умолчанию
        }

    } catch (error) {
        temp.innerText = "—"
        desc.innerText = "Ошибка запроса"
        icon.src = ""
        console.error(error)
    }
}

// Автоопределение города по IP
window.addEventListener("load", () => {
    const lastCity = localStorage.getItem("lastCity")
    if (lastCity) {
        inp.value = lastCity
        getWeather(lastCity)
    } else {
        getWeather("auto:ip")
    }
})

btn.addEventListener('click', () => {
    if (!inp.value.trim()) {
        temp.innerText = "—"
        desc.innerText = "Введите город"
        icon.src = ""
        return
    }
    getWeather(inp.value