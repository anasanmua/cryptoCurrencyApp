function displayGraph(url, canvas) {

    fetch(url)

        .then(response => response.json())
        .then(data => printCharts(data.data))



    function printCharts(marketData) {

        displayPrice(marketData, canvas)

    }

    function displayPrice(marketData, id) {

        // remove loading sentence
        const waitingResponse = document.querySelectorAll('h3')

        waitingResponse.forEach(el => el.setAttribute('class', "display-none"))


        const data = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],

            datasets: [
                {
                    data:
                        marketData.map(elm => (elm.priceUsd)),

                    borderColor: 'rgba(39, 226, 245, 0.65)'


                }
            ]
        }

        const options = {
            legend: {
                display: false
            }
        }

        new Chart(id, { type: 'line', data, options })

    }

}


window.addEventListener('load', () => {
    const ids = [...document.querySelectorAll('.crypto-id')].map(el => el.value)
    console.log(ids)
    ids.forEach((el, i) => displayGraph(`https://api.coincap.io/v2/assets/${el}/history?interval=d1&start=1642287600000&end=1644966000000`, `chart${i}`))


})




