// 🧠 MOTOR DE MENTALIDAD Y LIDERAZGO
window.MentalidadWasm = {
    analizar: function(jugador, textoInforme) {
        const txt = (textoInforme || '').toLowerCase();
        let score = 50; // Base
        let perfil = "Equilibrado";
        let color = "#f59e0b";

        // 1. Liderazgo (basado en palabras clave del informe)
        if (txt.includes('liderazgo') || txt.includes('capitán') || txt.includes('líder')) {
            score += 25;
            perfil = "Líder Nato 🏆";
            color = "#10b981";
        }
        if (txt.includes('mentalidad ganadora') || txt.includes('competitivo')) {
            score += 15;
        }
        
        // 2. Experiencia en competiciones de élite
        if (txt.includes('champions') || txt.includes('mundial') || txt.includes('copa del mundo')) {
            score += 10;
        }

        // 3. Consistencia (basada en la edad y posición)
        const edad = jugador.edad || (jugador.name ? jugador.name.length * 2 : 25);
        if (edad > 30) score += 10; // Los veteranos suelen ser más consistentes
        if (edad < 21) score -= 10; // Los jóvenes son más irregulares

        // 4. Penalización por indisciplina (si el texto lo menciona)
        if (txt.includes('indisciplina') || txt.includes('problemas extradeportivos')) {
            score -= 30;
            perfil = "Riesgo de Comportamiento ⚠️";
            color = "#ef4444";
        }

        score = Math.min(100, Math.max(0, score));

        return { score, perfil, color };
    }
};
console.log("🧠 MentalidadWasm cargado.");
