// 🧬 Núcleo Setun 1958 - Lógica Ternaria aplicada al Scouting
window.SetunCore = {
    ternario: function(valor, umbralBajo, umbralAlto) {
        if (valor <= umbralBajo) return -1; 
        if (valor >= umbralAlto) return 1;   
        return 0;                            
    },
    filtroAnalogico: function(señalesArray) {
        if (!señalesArray || señalesArray.length === 0) return 0;
        const suma = señalesArray.reduce((acc, val) => acc + val, 0);
        const promedio = suma / señalesArray.length;
        if (promedio > 0.33) return 1;
        if (promedio < -0.33) return -1;
        return 0;
    },
    inferenciaBitNet: function(datosJugador) {
        let capa1 = [];
        if (datosJugador.overall) capa1.push(this.ternario(datosJugador.overall, 65, 80));
        if (datosJugador.goles !== undefined) capa1.push(this.ternario(datosJugador.goles, 3, 15));
        if (datosJugador.asistencias !== undefined) capa1.push(this.ternario(datosJugador.asistencias, 2, 10));
        if (datosJugador.pace) capa1.push(this.ternario(datosJugador.pace, 60, 85));
        
        const resultadoFiltrado = this.filtroAnalogico(capa1);
        let decision = "MANTENER (0) - Rotación";
        let color = "#f59e0b";
        if (resultadoFiltrado === 1) { decision = "COMPRAR (1) - Prioritario"; color = "#10b981"; }
        else if (resultadoFiltrado === -1) { decision = "VENDER (-1) - No recomendado"; color = "#ef4444"; }
        
        return { valorTernario: resultadoFiltrado, decision, color, capa1 };
    }
};
console.log("🧬 Setun Core 1958 cargado.");
