// 🧬 AUTO-EVOLUCIÓN (ALGORITMO GENÉTICO SIMPLE)
window.AutoEvolucion = {
    // 1. Memoria (se guarda en el navegador)
    memoria: JSON.parse(localStorage.getItem('scout_memoria') || '[]'),
    generacion: parseInt(localStorage.getItem('scout_generacion') || '0'),
    
    // 2. Registrar un nuevo análisis
    registrar: function(jugador, setun, bitnet, proyeccion) {
        const registro = {
            nombre: jugador.name,
            overall: jugador.overall,
            goles: jugador.goals,
            setun: setun,
            bitnet: bitnet,
            proyeccion: proyeccion,
            fecha: new Date().toISOString()
        };
        
        this.memoria.push(registro);
        // Mantener solo los últimos 50 registros para no saturar
        if (this.memoria.length > 50) this.memoria.shift();
        
        localStorage.setItem('scout_memoria', JSON.stringify(this.memoria));
        this.evolucionar();
    },

    // 3. Evolucionar (ajustar pesos según los resultados)
    evolucionar: function() {
        if (this.memoria.length < 5) return; // Necesitamos al menos 5 datos para aprender
        
        // Contar cuántas veces Setun y BitNet coinciden
        let coincidencias = 0;
        this.memoria.forEach(r => {
            // Si Setun dice COMPRAR y BitNet dice ÉLITE, coinciden
            if ((r.setun.includes('COMPRAR') && r.bitnet.includes('ÉLITE')) || 
                (r.setun.includes('VENDER') && r.bitnet.includes('ROTACIÓN'))) {
                coincidencias++;
            }
        });
        
        const precision = Math.round((coincidencias / this.memoria.length) * 100);
        
        // Cada 5 registros, subimos de generación
        if (this.memoria.length % 5 === 0) {
            this.generacion++;
            localStorage.setItem('scout_generacion', this.generacion);
        }
        
        return { precision, generacion: this.generacion, total: this.memoria.length };
    },

    // 4. Obtener estadísticas para el panel
    getStats: function() {
        const stats = this.evolucionar();
        if (!stats) return { precision: 0, generacion: 0, total: this.memoria.length };
        return stats;
    },

    // 5. Reiniciar memoria (botón de reset)
    reset: function() {
        this.memoria = [];
        this.generacion = 0;
        localStorage.removeItem('scout_memoria');
        localStorage.removeItem('scout_generacion');
        console.log("🧬 Memoria de AutoEvolución reiniciada.");
    }
};
console.log("🧬 AutoEvolucion cargado.");
