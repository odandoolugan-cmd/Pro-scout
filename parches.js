// 🔧 PARCHE DE DIAGNÓSTICO VISUAL
console.log("🧪 Parche cargado a las " + new Date().toLocaleTimeString());

// Crear un banner en la pantalla
const banner = document.createElement('div');
banner.style.cssText = "position:fixed;top:0;left:0;right:0;background:#0f172a;color:white;padding:10px;z-index:9999;font-family:monospace;font-size:12px;text-align:center;border-bottom:2px solid #8b5cf6;";
banner.innerHTML = "🔍 <strong>Diagnóstico de Parches</strong> | UltraWasm: ❌ | AutoEvolucion: ❌ | Intentos: 0";
document.body.appendChild(banner);

let intentos = 0;
const intervalo = setInterval(function() {
    intentos++;
    const tieneUltra = !!window.UltraWasm;
    const tieneAuto = !!window.AutoEvolucion;
    const tieneSetun = tieneUltra && !!window.UltraWasm.setunContextual;
    const tieneHebb = tieneUltra && !!window.UltraWasm.bitnetHebbiano;
    const tieneEvo = tieneAuto && !!window.AutoEvolucion.evolucionar;
    
    banner.innerHTML = "🔍 <strong>Diagnóstico</strong> | Intentos: " + intentos + 
        " | UltraWasm: " + (tieneUltra ? "✅" : "❌") + 
        " | SetunContextual: " + (tieneSetun ? "✅" : "❌") + 
        " | BitnetHebbiano: " + (tieneHebb ? "✅" : "❌") + 
        " | AutoEvolucion: " + (tieneAuto ? "✅" : "❌") + 
        " | Evolucionar: " + (tieneEvo ? "✅" : "❌");

    // Si todas las funciones existen, aplicar los parches
    if (tieneSetun && tieneHebb && tieneEvo) {
        clearInterval(intervalo);
        banner.style.background = "#10b981";
        banner.innerHTML = "✅ <strong>Parches aplicados correctamente</strong>";
        
        // PARCHE 1: Setun Contextual
        const originalSetun = window.UltraWasm.setunContextual;
        window.UltraWasm.setunContextual = function(jugador, liga) {
            const edad = jugador.edad || 25;
            const resultado = originalSetun.call(this, jugador, liga);
            if (edad > 35) resultado.sinergia = Math.max(0, resultado.sinergia - 25);
            else if (edad > 32) resultado.sinergia = Math.max(0, resultado.sinergia - 15);
            return resultado;
        };
        
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
        
        setTimeout(() => banner.remove(), 3000);
    }
    
    // Si después de 15 segundos no encuentra las funciones, avisar
    if (intentos > 30) {
        clearInterval(intervalo);
        banner.style.background = "#ef4444";
        banner.innerHTML = "❌ <strong>No se encontraron las funciones después de 15s</strong> | UltraWasm: " + (tieneUltra ? "✅" : "❌") + " | AutoEvolucion: " + (tieneAuto ? "✅" : "❌");
        setTimeout(() => banner.remove(), 10000);
    }
}, 500);
