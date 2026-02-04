---
title: "SDD didáctico: Qué es SDD y entender su rol"
authors:
  - name: "Emi"
    url: "https://emi-dm.github.io"
date: 2026-02-04T00:00:00.000Z
tags: [sdd, especificación, desarrollo, ia, didáctico]
description: "Introducción didáctica y amena a Specification Driven Development (SDD) y su rol en el desarrollo asistido por IA."
---


**TL;DR:** SDD pone la especificación en el centro: las especificaciones (bien escritas) generan el código mediante agentes IA. Menos malentendidos, más iteración rápida. 


## Definition of the concept

Imagina que la especificación es la receta y el código el plato final. En **Specification Driven Development (SDD)** la receta no es una nota pobre al margen; es el manual que usan los chefs (incluyendo los chefs robot—los LLMs) para cocinar la aplicación.

SDD surge como filosofía en respuesta a los agentes basados en LLMs y al *vibe coding*: en lugar de escribir primero el código y luego la documentación, la documentación bien redactada y ejecutable pasa a ser la "fuente de la verdad" y guía la generación del código.

> Ejemplo rápido: escribes una especificación: "Al pulsar el botón X, enviar notificación Y al usuario con condiciones Z". Un agente puede transformar esa especificación en endpoints, pruebas y despliegue mínimo viable. Simple, repetible y trazable.

## Fuente de la verdad

- **Agile / Waterfall**: El código manda. Las specs son apuntes que a menudo se quedan anticuados.
- **SDD**: La especificación manda. El código es una expresión temporal de esa especificación: si algo no cuadra, la fuente auténtica a corregir es la spec.

En SDD la especificación funciona como un contrato: cuando la spec y el código difieren, la spec es la verdad hasta que decidimos lo contrario (y lo documentamos).

## Gestión de Cambios (con analogía)

Piensa en los cambios como actualizar una receta, no rehacer el plato a mano cada vez:

- **Antes**: un cambio en el requisito provoca un sálvese quien pueda: edición en código, PRs, hotfixes.
- **Con SDD**: cambias la spec, regeneras implementaciones y pruebas. Experimentas *what-if* con poco coste.

---

|                            | Metodologías Tradicionales (Agile / Waterfall)                                                                                                 | Spec-Driven Development (SDD)                                                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **La Fuente de la Verdad** | **El Código es el Rey.** Las specs se quedan atrás.                                                                                          | **La Especificación es el Rey.** El PRD genera la implementación.                                                                    |
| **Relación Spec-Código**   | La especificación suele ser estática y se desvía del código.                                                                                  | La especificación es un artefacto **ejecutable**; el código es su expresión.                                                        |
| **La Brecha (The Gap)**    | Ambigüedades y malentendidos inevitables.                                                                                                     | La transformación automática reduce o elimina la brecha de interpretación.                                                          |

## ¿Por qué ahora? (tendencias que empujan SDD)

1. IA más capaz: las specs en lenguaje natural generan código funcional de forma fiable.
2. Software más complejo: mantener la coherencia manualmente es cada vez más caro.
3. Ritmo de cambio acelerado: los pivots son la norma y hay que poder iterar rápido y con seguridad.

Esto habilita además un juego interesante: generar varias implementaciones a partir de la misma spec y comparar ventajas (rendimiento vs. coste vs. mantenibilidad).

## Principios fundamentales (en una frase cada uno)

1. **Especificaciones como lengua franca** — la spec es el artefacto central.
2. **Especificaciones ejecutables** — precisas, completas y sin ambigüedades.
3. **Refinamiento continuo** — validación y detección de ambigüedades todo el tiempo.
4. **Contexto impulsado por la investigación** — los agentes recolectan contexto y opciones técnicas.
5. **Retroalimentación bidireccional** — la producción alimenta la especificación.
6. **Ramificación para la exploración** — generar alternativas para optimizar distintos objetivos.

## Pequeño ejercicio (¡ponlo a prueba!)

Toma una historia de usuario y conviértela en una spec mínima (3–5 líneas) clara y sin ambigüedades. Luego pregúntate:

- ¿Puede un agente generar endpoints y pruebas a partir de esto?
- ¿Qué ambigüedades quedan?

Si respondiste que sí y que hay poca ambigüedad, has dado un gran paso hacia SDD.

## Reflexión final

SDD no viene a sustituir al desarrollador: viene a convertirlo en arquitecto de especificaciones, director de orquesta y crítico curioso. Es una forma potente de acelerar iteraciones, mejorar trazabilidad y minimizar deuda técnica cuando está bien implementado.

---

## Fuentes y referencias

- Definición de SDD proporcionada por GitHub Spec Kit: https://github.com/github/spec-kit/blob/main/spec-driven.md
