const prevBtn = document.querySelector('.prevnews')
const nextBtn = document.querySelector('.nextnews')
const pageIndex = document.querySelector('.pageIndex')

const newsAPI = new APIHandler('https://min-api.cryptocompare.com/data/')
const newsContainer = document.querySelector('.newsCardsContainer')

let start = 0
let limit = 10

nextBtn.addEventListener('click', e => {
    start <= 30 ? start = start + 10 : start = 0
    pageIndex.innerText = (start / 10) + 1
    newsContainer.innerHTML = ''
    newsAPI
        .getNews(start, limit)
        .then(resp => {
            resp.forEach(element => {
                newsContainer.innerHTML += `<div class="col-2 news-card d-grid align-center">
                    <a href="${element.url}"><img src="${element.imageurl}" alt="${element.title}"></a>
                    <hr>
                        <div class="news-card-body">
                            <a href="${element.url}">${element.title}</a>
                        </div>`
            })
        })
})

prevBtn.addEventListener('click', e => {
    start >= 10 ? start = start - 10 : start = 40
    pageIndex.innerText = (start / 10) + 1
    newsContainer.innerHTML = ''
    newsAPI
        .getNews(start, limit)
        .then(resp => {
            resp.forEach(element => {
                newsContainer.innerHTML += `<div class="col-2 news-card d-grid align-center">
                    <a href="${element.url}"><img src="${element.imageurl}" alt="${element.title}"></a>
                    <hr>
                        <div class="news-card-body">
                            <a href="${element.url}">${element.title}</a>
                        </div>`
            })
        })
})
