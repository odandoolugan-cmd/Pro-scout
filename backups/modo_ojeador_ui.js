// 🧠 INYECCIÓN AUTOMÁTICA DEL MODO OJEADOR (VERSIÓN MEJORADA)
(function() {
    console.log("🧠 ModoOjeador UI cargado.");
    
    function inyectarVeredicto() {
        // Si ya existe el panel, no hacer nada
        if (document.getElementById('modo-ojeador-panel')) return;
        
        const playerCard = document.querySelector('.player-card-big');
        if (!playerCard || !window.ModoOjeador || !window.currentPlayer) return;
        
        try {
            // 1. Leer Setun real del panel
            const setunPanel = document.querySelector('[style*="NÚCLEO SETUN"]');
            let setunDecision = 'MANTENER (0)';
            if (setunPanel) {
                const texto = setunPanel.textContent;
                if (texto.includes('COMPRAR')) setunDecision = 'COMPRAR (1)';
                else if (texto.includes('VENDER')) setunDecision = 'VENDER (-1)';
                else setunDecision = 'MANTENER (0)';
            }
            
            // 2. Leer BitNet real del panel
            const bitnetPanel = document.querySelector('[style*="SCOUT NEURONAL"]');
            let bitnetNivel = 'ROTACIÓN';
            if (bitnetPanel) {
                const texto = bitnetPanel.textContent;
                if (texto.includes('ÉLITE MUNDIAL')) bitnetNivel = 'ÉLITE MUNDIAL';
                else if (texto.includes('GALÁCTICO')) bitnetNivel = 'GALÁCTICO';
                else if (texto.includes('JUGADOR DESTACADO')) bitnetNivel = 'JUGADOR DESTACADO';
                else if (texto.includes('ROTACIÓN')) bitnetNivel = 'ROTACIÓN / PROMESA';
                else bitnetNivel = 'DESCARTE';
            }
            
            // 3. Leer Finanzas real del panel
            const finanzasPanel = document.querySelector('[style*="SETUN FINANCIERO"]');
            let finanzasEstado = 'PRECIO JUSTO';
            if (finanzasPanel) {
                const texto = finanzasPanel.textContent;
                if (texto.includes('INFRAVALORADO')) finanzasEstado = 'INFRAVALORADO';
                else if (texto.includes('SOBREVALORADO')) finanzasEstado = 'SOBREVALORADO';
                else finanzasEstado = 'PRECIO JUSTO';
            }
            
            // 4. Leer Lesiones real del panel
            const lesionesPanel = document.querySelector('[style*="RIESGO DE LESIÓN"]');
            let lesionesNivel = 'BAJO';
            if (lesionesPanel) {
                const texto = lesionesPanel.textContent;
                if (texto.includes('ALTO')) lesionesNivel = 'ALTO';
                else if (texto.includes('MEDIO')) lesionesNivel = 'MEDIO';
                else lesionesNivel = 'BAJO';
            }
            
            // 5. Generar veredicto con los datos reales
            const veredicto = window.ModoOjeador.generarVeredicto(
                window.currentPlayer, 
                setunDecision, 
                bitnetNivel, 
                { estado: finanzasEstado }, 
                { nivel: lesionesNivel }
            );
            
            console.log(`🧠 Veredicto: ${veredicto.recomendacion} (Setun: ${setunDecision}, BitNet: ${bitnetNivel}, Finanzas: ${finanzasEstado}, Lesiones: ${lesionesNivel})`);
            
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

    // También al hacer clic en buscar
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'searchBtn') {
            // Eliminar el panel anterior si existe
            const panelAnterior = document.getElementById('modo-ojeador-panel');
            if (panelAnterior) panelAnterior.remove();
            setTimeout(inyectarVeredicto, 3000);
        }
    });
})();
