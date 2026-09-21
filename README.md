# ANCESTRIA

### *Stories. Peoples. Memories.*

---
Juego educativo web de exploración 2.5D/3D sobre historias, tecnologías, memorias y saberes de pueblos originarios de las Américas.

> El español es el idioma principal y predeterminado. La interfaz también puede utilizarse en portugués e inglés desde Configuración y accesibilidad.

## Exploración y Atlas: funciones diferentes

- **Exploración** es el modo jugable. Los recorridos se liberan de uno en uno, comenzando siempre por Mexica. Completar las memorias de un recorrido abre el siguiente.
- **Puntos de inicio seguros y física**: Cada mapa cuenta con puntos de surgimiento calibrados (`CULTURE_SPAWN_POINTS`), resolución automática de sobreposiciones y evasión de bloqueos en muros o estructuras, garantizando movilidad libre e inmediata desde el primer segundo.
- **Atlas de las Américas** es una biblioteca de consulta libre. Mantiene visibles las 13 fichas sociolingüísticas en tarjetas compactas y abre cada pueblo en una ficha de lectura propia. No repite botones de juego, barras de progreso ni bloqueos.
- Un recorrido ya abierto o completado puede volver a jugarse en cualquier momento.
- Cada descubrimiento, conversación o capítulo otorga fragmentos solamente la primera vez. Si un recorrido quedó incompleto, las memorias pendientes todavía pueden completarse y puntuar una vez.
- Al completar todas las interacciones esenciales de un prototipo 3D, aparece un cierre explícito con opciones para continuar explorando, completar las memorias educativas pendientes, avanzar al siguiente recorrido cuando corresponda o salir al menú.
- El orden de liberación es una decisión curatorial de navegación y no expresa jerarquía, evolución ni homogeneidad cultural entre los pueblos.

Orden actual: Mexica → Incas/Tawantinsuyu → pueblos quechuas → pueblos aymaras → pueblos zapotecos → Rarámuri → Bribri → Wayuu → Warao → Yanomami → pueblos guaraníes → Tupinambá → Xukuru do Ororubá.

## Experiencias disponibles

### Mexica — primera opción

- Prototipo 3D de un paisaje inspirado en Mexico-Tenochtitlan, con lago, canales, calzadas, chinampas, viviendas y recinto ceremonial.
- Puntos interactivos sobre el manejo del agua, las chinampas y la organización lacustre.
- Tres habitantes educativos dentro del escenario — chinampa, intercambio de Tlatelolco y memoria/lengua nahua — con diálogos, preguntas aleatorias, respuestas explicativas y fuentes. Son síntesis educativas identificadas, no personas históricas inventadas.
- Recorrido educativo en cinco capítulos sobre territorio, prácticas chinamperas y el uso contextualizado de los nombres Mexica, tenochca y “azteca”.
- “Mexica” se utiliza como nombre principal; “azteca” se explica como el término internacionalmente más difundido sin borrar el nombre propio.

### Pueblos andinos / Tawantinsuyu

- Prototipo 3D del valle andino con Qhapaq Ñan, andenes, canales, qullqas, puente de fibra vegetal, personajes, diálogos y minijuegos.
- Recorrido educativo en cinco capítulos sobre caminos y territorios, agricultura de altura y khipus.
- El Tawantinsuyu no se presenta como sinónimo de todos los pueblos andinos: se distinguen comunidades, territorios, épocas y continuidades contemporáneas.

Los pueblos mayas y futuros recorridos se incorporarán como experiencias independientes, con fuentes, voces y contextos propios.

## Idiomas e internacionalización

- **Español**: idioma inicial, principal y referencia editorial.
- **Português** y **English**: seleccionables en cualquier momento desde Configuración y accesibilidad.
- La elección de idioma se conserva localmente en el navegador y actualiza dinámicamente toda la interfaz, avisos, modales y minijuegos.
- Los mensajes reutilizables están centralizados en `src/i18n/index.ts`.
- La traducción incluye menú, configuración, selección de pueblos, HUD, mapa, diario, minijuegos y diálogos.

## Principios editoriales y fuentes de los pueblos originarios

ANCESTRIA fundamenta su contenido en relatos, artículos, testimonios directos y registros de los propios pueblos originarios:

- **Hernando Alvarado Tezozómoc (c. 1598)** — *Crónica Mexicáyotl*: historia nahua en lengua originaria náhuatl sobre los orígenes y fundación de Tenochtitlan.
- **Felipe Guamán Poma de Ayala (1615)** — *El primer nueva corónica y buen gobierno*: crónica e ilustraciones quechuas sobre los ayllus, andenes, quipus y cosmovisión andina.
- **Inca Garcilaso de la Vega (1609)** — *Comentarios Reales de los Incas*: memorias transmitidas por sus mayores nobles quechuas.
- **Comunidades Quechuas de Huinchiri, Chaupibanda, Choccahua y Ccollana Quehue** — *Renovación comunitaria anual del puente Q’eswachaka*: tradición viva de ingeniería tradicional andina mediante la Minka.
- **Davi Kopenawa Yanomami & Bruce Albert (2010)** — *La caída del cielo / A Queda do Céu*: cosmovisión yanomami viva, espíritus xapiri y cuidado de la tierra-bosque (Urihi A).
- **Ailton Krenak (2019)** — *Ideas para postergar el fin del mundo / Ideias para adiar o fim do mundo*: pensamiento filosófico originario y relación viva con la naturaleza.
- **Natalio Hernández (2008)** — *De la memoria a la palabra / Yancuic Tlahtolli (INALI)*: literatura y creación contemporánea en lengua náhuatl.
- **UNICEF & FUNPROEIB Andes (2009)** — *Atlas sociolingüístico de pueblos indígenas en América Latina*: sistematización rigurosa de más de 400 pueblos indígenas y sus familias lingüísticas.
- **Pueblo Indígena Xukuru do Ororubá / Cacique Marcos Xukuru** — Memoria territorial, asambleas comunitarias y proyectos agroecológicos en la Serra do Ororubá.
- **Junta Mayor de Palabreros Wayuu** — Sistema normativo tradicional Wayuu y función del Pütchipü’üi (palabrero) en la resolución pacífica y la palabra mediadora.

## Controles y experiencia móvil

| Acción | Escritorio | Dispositivo táctil / Móvil |
| --- | --- | --- |
| Moverse | `WASD` o flechas | Cruceta virtual continua (D-Pad multi-toque) |
| Interactuar / Acción | `E` o `Enter` | Botón táctil **ACCIÓN** (respuesta táctil instantánea) |
| Saltar | `Espacio` | Botón táctil **SALTAR** (plenamente funcional en móvil) |
| Abrir diario | `J` o HUD | Botón **Diario** en barra superior |
| Abrir mapa | `M` o HUD | Botón **Mapa** en barra superior |

La experiencia móvil cuenta con soporte para áreas seguras (`env(safe-area-inset-*)`), prevención de retardos táctiles de 300 ms, controles táctiles multi-toque que permiten caminar y saltar o interactuar en simultáneo, y modales con desplazamiento fluido optimizado.

## Ejecución local

Requiere Node.js 18 o posterior.

```bash
git clone https://github.com/SouBeatrizKaroline/ANCESTRIAgame.git
cd ANCESTRIAgame
npm install
npm run dev
```

Compilación de producción: `npm run build`.

## Estado actual

- [x] Español como idioma principal predeterminado con selector trilingüe fluido (Español / Português / English).
- [x] Corrección de puntos de inicio de personajes (`CULTURE_SPAWN_POINTS`) y prevención de bloqueos con resolución de colisiones.
- [x] Controles móviles perfeccionados con botón de salto activo, cruceta multi-toque sin retardo y diseño seguro.
- [x] Fuentes y relatos basados en autores, crónicas y artículos de los propios pueblos originarios.
- [x] Prototipos 3D interactivos y recorridos educativos para los 13 pueblos del catálogo.

## Licencia

Proyecto distribuido bajo la licencia [MIT](LICENSE) con finalidad educativa y de difusión cultural.
