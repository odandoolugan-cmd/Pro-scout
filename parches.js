// 🔧 PARCHE 1: Setun Contextual con penalización por edad
(function() {
    const originalSetunContextual = window.UltraWasm ? window.UltraWasm.setunContextual : null;
    if (originalSetunContextual) {
        window.UltraWasm.setunContextual = function(jugador, liga) {
            const edad = jugador.edad || 25;
            const resultado = originalSetunContextual.call(this, jugador, liga);
            if (edad > 32) resultado.sinergia = Math.max(0, resultado.sinergia - 15);
            else if (edad > 35) resultado.sinergia = Math.max(0, resultado.sinergia - 25);
            return resultado;
        };
        console.log("🔧 Parche 1: Setun Contextual con edad aplicado.");
    }
})();

// 🔧 PARCHE 2: Auto-Evolución con lógica flexible
(function() {
    const originalEvolucionar = window.AutoEvolucion ? window.AutoEvolucion.evolucionar : null;
    if (originalEvolucionar) {
        window.AutoEvolucion.evolucionar = function() {
            if (this.memoria.length < 5) return;
            let coincidencias = 0;
            this.memoria.forEach(r => {
                const setun = (r.setun || '').toLowerCase();
                const bitnet = (r.bitnet || '').toLowerCase();
                if ((setun.includes('comprar') && (bitnet.includes('élite') || bitnet.includes('galáctico'))) ||
                    (setun.includes('mantener') && (bitnet.includes('rotación') || bitnet.includes('titular'))) ||
                    (setun.includes('vender') && (bitnet.includes('descarte') || bitnet.includes('rotación')))) {
                    coincidencias++;
                }
            });
            const precision = Math.round((coincidencias / this.memoria.length) * 100);
            if (this.memoria.length % 5 === 0) {
                this.generacion++;
                localStorage.setItem('scout_generacion', this.generacion);
            }
            return { precision, generacion: this.generacion, total: this.memoria.length };
        };
        console.log("🔧 Parche 2: Auto-Evolución flexible aplicada.");
    }
})();

// 🔧 PARCHE 3: BitNet Hebbiano con análisis
(function() {
    const originalBitnet = window.UltraWasm ? window.UltraWasm.bitnetHebbiano : null;
    if (originalBitnet) {
        window.UltraWasm.bitnetHebbiano = function(jugador, textoInforme) {
            const txt = (textoInforme || window.ultimoAnalisis || '').toLowerCase();
            const input = [
                (jugador.overall || 70) / 10,
                (jugador.goals || 0) / 5,
                (jugador.assists || 0) / 5,
                (jugador.pace || 70) / 10,
                (jugador.defending || 50) / 10
            ];
            let pesos = [1.0, 1.0, 1.0, 1.0, 1.0];
            if (txt.includes('velocidad') || txt.includes('rápido')) pesos[3] += 0.5;
            if (txt.includes('gol') || txt.includes('finaliza')) pesos[1] += 0.5;
            if (txt.includes('asistencia') || txt.includes('pase')) pesos[2] += 0.5;
            if (txt.includes('defensa') || txt.includes('recupera')) pesos[4] += 0.5;
            let suma = 0, totalPesos = 0;
            for (let i = 0; i < input.length; i++) { suma += input[i] * pesos[i]; totalPesos += pesos[i]; }
            const resultado = (suma / totalPesos) * 10;
            return { puntaje: Math.round(resultado), pesos: pesos.map(p => p.toFixed(1)) };
        };
        console.log("🔧 Parche 3: BitNet Hebbiano con análisis aplicado.");
    }
})();
