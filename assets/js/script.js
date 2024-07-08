async function getMoneda(){
    try {
        const res = await fetch("https://mindicador.cl/api/")
        const data = await res.json()
        console.log(data);
    
        // Calcular conversion
        var valor = parseFloat(document.querySelector('#peso').value);

        var monedaSeleccionada = document.querySelector('#monedas').value;
        var tasaCambio;

        switch (monedaSeleccionada) {
            case 'usd':
                tasaCambio = data.dolar.valor;
                break;
            case 'eur':
                tasaCambio = data.euro.valor;
                break;
            case 'uf':
                tasaCambio = data.uf.valor;
                break;
            case 'utm':
                tasaCambio = data.utm.valor;
                break;
            default:
                alert("No se encuentra moneda");
                return;
        }

        var resultado = valor/tasaCambio;
        var resultadodec = resultado.toFixed(2);

        // Insertar en DOM
        const element = document.querySelector(".moneda_valor")
        element.innerHTML = 'Resultado: $' + resultadodec

        // Obtener datos de la serie de tiempo
        const resTimeSeries = await fetch(`https://mindicador.cl/api/{monedaSeleccionada}`);
        const dataTimeSeries = await resTimeSeries.json();
        const timeSeries = dataTimeSeries.serie;

        // Formatear datos para Chart.js
        const labels = timeSeries.map(entry => entry.fecha.split("T")[0]);
        const values = timeSeries.map(entry => entry.valor);

        // Crear gráfico
        const ctx = document.querySelector('#grafico').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Valor de ' + monedaSeleccionada.toUpperCase(),
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    },
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });

    } catch (error) {
        alert(error.message);
    }

   }