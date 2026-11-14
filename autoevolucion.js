// 🧬 AUTO-EVOLUCIÓN
window.AutoEvolucion = {
    memoria: JSON.parse(localStorage.getItem('scout_memoria') || '[]'),
    generacion: parseInt(localStorage.getItem('scout_generacion') || '0'),
    
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
        if (this.memoria.length > 50) this.memoria.shift();
        localStorage.setItem('scout_memoria', JSON.stringify(this.memoria));
        this.evolucionar();
    },
    
    evolucionar: function() {
        if (this.memoria.length < 5) return { precision: 0, generacion: this.generacion, total: this.memoria.length };
        
        let coincidencias = 0;
        this.memoria.forEach(r => {
            const setun = (r.setun || '').toLowerCase();
            const bitnet = (r.bitnet || '').toLowerCase();
            
            const setunPositivo = setun.includes('comprar');
            const setunNeutro = setun.includes('mantener');
            const setunNegativo = setun.includes('vender');
            
            const bitnetPositivo = bitnet.includes('élite') || bitnet.includes('galáctico') || bitnet.includes('destacado');
            const bitnetNeutro = bitnet.includes('rotación') || bitnet.includes('titular');
            const bitnetNegativo = bitnet.includes('descarte');
            
            if ((setunPositivo && bitnetPositivo) ||
                (setunNeutro && bitnetNeutro) ||
                (setunNegativo && bitnetNegativo)) {
                coincidencias++;
            }
        });
        
        const precision = Math.round((coincidencias / this.memoria.length) * 100);
        if (this.memoria.length % 5 === 0) {
            this.generacion++;
            localStorage.setItem('scout_generacion', this.generacion);
        }
        return { precision, generacion: this.generacion, total: this.memoria.length };
    },
    
    getStats: function() {
        return this.evolucionar();
    },
    
    reset: function() {
        this.memoria = [];
        this.generacion = 0;
        localStorage.removeItem('scout_memoria');
        localStorage.removeItem('scout_generacion');
    }
};
console.log("🧬 AutoEvolucion cargado.");
