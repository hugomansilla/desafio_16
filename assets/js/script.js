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

        // Grafico 


    } catch (error) {
        alert(error.message);
    }

   }