// 🧬 SETUN DE CONSENSO - COMBINA TODAS LAS SEÑALES
window.SetunConsenso = {
    calcular: function(señales) {
        let puntos = 0;
        let detalles = [];
        
        // 1. Setun (peso: 2)
        if (señales.setun === 'COMPRAR') { puntos += 2; detalles.push('Setun: +2 (COMPRAR)'); }
        else if (señales.setun === 'VENDER') { puntos -= 2; detalles.push('Setun: -2 (VENDER)'); }
        else { detalles.push('Setun: 0 (MANTENER)'); }
        
        // 2. BitNet (peso: 2)
        if (señales.bitnet === 'ÉLITE') { puntos += 2; detalles.push('BitNet: +2 (ÉLITE)'); }
        else if (señales.bitnet === 'DESTACADO') { puntos += 1; detalles.push('BitNet: +1 (DESTACADO)'); }
        else if (señales.bitnet === 'ROTACIÓN') { detalles.push('BitNet: 0 (ROTACIÓN)'); }
        else if (señales.bitnet === 'DESCARTE') { puntos -= 2; detalles.push('BitNet: -2 (DESCARTE)'); }
        
        // 3. Finanzas (peso: 1)
        if (señales.finanzas === 'INFRAVALORADO') { puntos += 1; detalles.push('Finanzas: +1 (INFRAVALORADO)'); }
        else if (señales.finanzas === 'SOBREVALORADO') { puntos -= 1; detalles.push('Finanzas: -1 (SOBREVALORADO)'); }
        else { detalles.push('Finanzas: 0 (PRECIO JUSTO)'); }
        
        // 4. Lesiones (peso: 1)
        if (señales.lesiones === 'BAJO') { puntos += 1; detalles.push('Lesiones: +1 (BAJO)'); }
        else if (señales.lesiones === 'ALTO') { puntos -= 1; detalles.push('Lesiones: -1 (ALTO)'); }
        else { detalles.push('Lesiones: 0 (MEDIO)'); }
        
        // 5. Edad (peso: 1)
        if (señales.edad < 23) { puntos += 1; detalles.push('Edad (<23): +1'); }
        else if (señales.edad > 32) { puntos -= 1; detalles.push('Edad (>32): -1'); }
        else { detalles.push('Edad: 0'); }
        
        // Calcular consenso final
        let consenso, color, razon;
        
        if (puntos >= 4) {
            consenso = 'FICHAJE PRIORITARIO'; color = '#10b981';
            razon = 'Consenso positivo: Señales alineadas hacia la compra.';
        } else if (puntos >= 2) {
            consenso = 'APUESTA TÁCTICA'; color = '#3b82f6';
            razon = 'Consenso moderado: Señales mixtas, pero con potencial.';
        } else if (puntos >= 0) {
            consenso = 'SEGUIMIENTO ESTRECHO'; color = '#8b5cf6';
            razon = 'Consenso neutro: Señales equilibradas. Seguir evolución.';
        } else if (puntos >= -2) {
            consenso = 'EVITAR FICHAJE'; color = '#ef4444';
            razon = 'Consenso negativo: Señales desfavorables.';
        } else {
            consenso = 'DESCARTE'; color = '#64748b';
            razon = 'Consenso muy negativo: Múltiples señales en contra.';
        }
        
        return {
            consenso,
            color,
            razon,
            puntos,
            detalles,
            puedeFichar: puntos >= 2
        };
    }
};

console.log("🧬 SetunConsenso cargado.");
