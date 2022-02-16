function displayGraph(url, canvas) {

    fetch(url)

        .then(response => response.json())
        .then(data => printCharts(data.data))



    function printCharts(marketData) {

        //remove loading sentence 
        const waitingResponse = document.querySelector('h3')
        console.log(waitingResponse)
        waitingResponse.setAttribute('class', "display-none");

        displayPrice(marketData, canvas)
    }

    function displayPrice(marketData, id) {

        const data = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],

            datasets: [
                {
                    data:
                        marketData.map(elm => (elm.priceUsd))




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
fetch
displayGraph('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=1642287600000&end=1644966000000', 'chart99')

displayGraph('https://api.coincap.io/v2/assets/ethereum/history?interval=d1&start=1642287600000&end=1644966000000', 'chart98')

displayGraph('https://api.coincap.io/v2/assets/bitcoin-cash/history?interval=d1&start=1642287600000&end=1644966000000', 'chart97')

