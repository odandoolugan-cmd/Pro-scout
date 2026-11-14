// 🧠 INYECCIÓN AUTOMÁTICA DEL MODO OJEADOR (VERSIÓN DEFINITIVA)
(function() {
    console.log("🧠 ModoOjeador UI cargado.");
    
    function inyectarVeredicto() {
        // Eliminar panel anterior si existe
        const panelAnterior = document.getElementById('modo-ojeador-panel');
        if (panelAnterior) panelAnterior.remove();
        
        const playerCard = document.querySelector('.player-card-big');
        if (!playerCard || !window.ModoOjeador || !window.currentPlayer) return;
        
        try {
            const p = window.currentPlayer;
            
            // 1. Calcular Setun directamente (no leer del DOM)
            const setunDecision = (p.overall > 85 && p.goals > 10 && p.assists > 5) ? 'COMPRAR (1)' : 
                                  (p.overall < 70 || p.goals < 3) ? 'VENDER (-1)' : 'MANTENER (0)';
            
            // 2. Calcular BitNet directamente
            let bitnetNivel = 'ROTACIÓN';
            if (p.overall > 85 && p.goals > 15) bitnetNivel = 'ÉLITE MUNDIAL';
            else if (p.overall > 80 && p.goals > 10) bitnetNivel = 'JUGADOR DESTACADO';
            else if (p.overall > 75) bitnetNivel = 'ROTACIÓN / PROMESA';
            else bitnetNivel = 'DESCARTE';
            
            // 3. Calcular Finanzas directamente
            let finanzasEstado = 'PRECIO JUSTO';
            if (p.overall > 85 && p.edad < 23) finanzasEstado = 'INFRAVALORADO';
            else if (p.overall > 85 && p.edad > 30) finanzasEstado = 'SOBREVALORADO';
            
            // 4. Calcular Lesiones directamente
            let lesionesNivel = 'BAJO';
            if (p.edad > 32) lesionesNivel = 'ALTO';
            else if (p.edad > 28) lesionesNivel = 'MEDIO';
            
            // 5. Generar veredicto con los datos reales
            const veredicto = window.ModoOjeador.generarVeredicto(
                p, setunDecision, bitnetNivel, { estado: finanzasEstado }, { nivel: lesionesNivel }
            );
            
            console.log(`🧠 Veredicto: ${veredicto.recomendacion} | Setun: ${setunDecision} | BitNet: ${bitnetNivel} | Finanzas: ${finanzasEstado} | Lesiones: ${lesionesNivel}`);
            
            const panelHTML = `
            <div id="modo-ojeador-panel" style="margin-top:15px; padding:15px; border-radius:10px; background:linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95)); border:2px solid ${veredicto.color}; font-family:'Inter', sans-serif; box-shadow:0 0 15px ${veredicto.color}40;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <div style="font-size:0.8rem; color:#94a3b8; text-transform:uppercase; font-weight:bold;">🧠 VEREDICTO DEL OJEADOR</div>
                    <div style="font-size:0.6rem; color:${veredicto.color}; border:1px solid ${veredicto.color}; padding:2px 8px; border-radius:10px;">ANÁLISIS FINAL</div>
                </div>
                <div style="font-size:1.4rem; font-weight:bold; color:${veredicto.color}; margin-bottom:8px;">${veredicto.recomendacion}</div>
                <div style="font-size:0.8rem; color:#cbd5e1; margin-bottom:8px; line-height:1.4;">${veredicto.razon}</div>
                <div style="font-size:0.75rem; color:#f59e0b; background:rgba(245,158,11,0.1); padding:6px; border-radius:6px; border-left:3px solid #f59e0b;">💡 ${veredicto.inversionSugerida}</div>
                <div style="font-size:0.6rem; color:#64748b; margin-top:8px; border-top:1px solid #334155; padding-top:8px;">
                    Datos usados: Setun: ${setunDecision} | BitNet: ${bitnetNivel} | Finanzas: ${finanzasEstado} | Lesiones: ${lesionesNivel}
                </div>
            </div>`;
            
            playerCard.parentNode.insertBefore(document.createRange().createContextualFragment(panelHTML), playerCard.nextSibling);
            console.log("🧠 Veredicto del Ojeador añadido.");
        } catch(e) { console.error('Error ModoOjeador UI:', e); }
    }

    // Observar cambios en el DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                setTimeout(inyectarVeredicto, 1000);
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const container = document.getElementById('playerInfoContainer');
        if (container) observer.observe(container, { childList: true, subtree: true });
    });

    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'searchBtn') {
            const panelAnterior = document.getElementById('modo-ojeador-panel');
            if (panelAnterior) panelAnterior.remove();
            setTimeout(inyectarVeredicto, 3000);
        }
    });
})();
