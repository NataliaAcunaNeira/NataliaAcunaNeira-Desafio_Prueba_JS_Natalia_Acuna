
async function obtenerValorTipoCambio(moneda) {
    try {

        const res = await fetch("https://mindicador.cl/api/" + moneda)
        const data = await res.json()
        return data.serie
    } catch (error) {
        const resultado = document.getElementById("resultado")
        resultado.innerHTML = error.message
    }
}
obtenerValorTipoCambio("dolar")

async function calcularResultado() {
    const moneda = valorSelect
    const monedasACambiar = valorInput
    const data = await obtenerValorTipoCambio(moneda)

    // conversion
    const resultado = document.getElementById("resultado")
    const valorCambio = data[0].valor
    resultado.innerHTML = monedasACambiar / valorCambio

    // grafico
    const serie = data.map(({ valor, fecha }) => ({ valor, fecha: fecha.substr(0, fecha.indexOf("T")) }))
    const seriesOrdenadas = serie.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    const valores = seriesOrdenadas.map((elemento) => elemento.valor)
    const fechas = seriesOrdenadas.map((elemento) => elemento.fecha)

    const grafico = document.getElementById('chart').getContext('2d');
    new Chart(grafico, {
        type: 'bar',
        data: {
            labels: fechas,
            datasets: [{
                label: 'Tipos de cambio',
                data: valores,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            }],
        },
        options: {
            // responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                },

            },
        },
    });
};


let valorInput = 0
function alCambiarInput() {
    const input = document.getElementById("input")
    valorInput = Number(input.value)
}

let valorSelect = "dolar"
function alCambiarSelect() {
    const select = document.getElementById("select")
    valorSelect = select.value

}
