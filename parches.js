// 🔧 PARCHE DE DIAGNÓSTICO Y APLICACIÓN
console.log("🧪 Parche cargado. Esperando funciones...");

// Intentar aplicar los parches cada 500ms hasta que las funciones existan
let intentos = 0;
const intervalo = setInterval(function() {
    intentos++;
    
    // Verificar si las funciones ya existen
    if (window.UltraWasm && window.UltraWasm.setunContextual && window.AutoEvolucion && window.AutoEvolucion.evolucionar) {
        clearInterval(intervalo);
        console.log("✅ Funciones encontradas en el intento " + intentos);
        
        // PARCHE 1: Setun Contextual
        const originalSetun = window.UltraWasm.setunContextual;
        window.UltraWasm.setunContextual = function(jugador, liga) {
            const edad = jugador.edad || 25;
            const resultado = originalSetun.call(this, jugador, liga);
            if (edad > 35) resultado.sinergia = Math.max(0, resultado.sinergia - 25);
            else if (edad > 32) resultado.sinergia = Math.max(0, resultado.sinergia - 15);
            return resultado;
        };
        console.log("🔧 Parche 1 aplicado: Setun Contextual.");
        
        // PARCHE 2: Auto-Evolución
        const originalEvo = window.AutoEvolucion.evolucionar;
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
        console.log("🔧 Parche 2 aplicado: Auto-Evolución.");
        
        // PARCHE 3: BitNet Hebbiano
        const originalBitnet = window.UltraWasm.bitnetHebbiano;
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
        console.log("🔧 Parche 3 aplicado: BitNet Hebbiano.");
        
        // Mostrar un mensaje en pantalla
        const toast = document.createElement('div');
        toast.textContent = "🔧 Parches aplicados correctamente";
        toast.style.cssText = "position:fixed;top:10px;right:10px;background:#10b981;color:white;padding:8px 16px;border-radius:20px;z-index:9999;font-size:12px;";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
    
    // Si después de 10 segundos no encuentra las funciones, avisar
    if (intentos > 20) {
        clearInterval(intervalo);
        console.warn("⚠️ No se encontraron las funciones después de 10 segundos.");
        console.log("UltraWasm:", window.UltraWasm ? "✅ Existe" : "❌ No existe");
        console.log("AutoEvolucion:", window.AutoEvolucion ? "✅ Existe" : "❌ No existe");
        
        const toast = document.createElement('div');
        toast.textContent = "⚠️ No se pudieron aplicar los parches";
        toast.style.cssText = "position:fixed;top:10px;right:10px;background:#ef4444;color:white;padding:8px 16px;border-radius:20px;z-index:9999;font-size:12px;";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    }
}, 500);
