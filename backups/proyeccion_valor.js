// 📈 PROYECCIÓN DE VALOR A 3 AÑOS
window.ProyeccionValor = {
    calcular: function(jugador) {
        const edad = jugador.edad || (jugador.name ? jugador.name.length * 2 : 25);
        const overall = jugador.overall || 70;
        
        // Valor actual estimado (fórmula simplificada)
        let valorActual = (overall - 60) * 2.5;
        if (edad < 23) valorActual *= 1.5;
        if (edad > 30) valorActual *= 0.6;
        if (edad > 34) valorActual *= 0.3;
        
        // Proyección a 3 años
        let factorCrecimiento = 1;
        if (edad < 24) factorCrecimiento = 1.4; // Los jóvenes suben de valor
        else if (edad < 28) factorCrecimiento = 1.1; // En su prime, se mantienen
        else if (edad < 32) factorCrecimiento = 0.8; // Empiezan a bajar
        else factorCrecimiento = 0.4; // Veteranos bajan mucho
        
        let valorFuturo = valorActual * factorCrecimiento;
        
        let tendencia = "Estable";
        let color = "#f59e0b";
        if (valorFuturo > valorActual * 1.2) { tendencia = "Revalorización Alta 📈"; color = "#10b981"; }
        else if (valorFuturo < valorActual * 0.8) { tendencia = "Depreciación 📉"; color = "#ef4444"; }

        return { 
            valorActual: Math.round(valorActual), 
            valorFuturo: Math.round(valorFuturo), 
            tendencia, 
            color 
        };
    }
};
console.log("📈 ProyeccionValor cargado.");
