---
title: "Nuestro artículo sobre conocimiento de seguridad y generación de código, aceptado en ReSAISE 2026"
authors:
  - name: "Emi"
    url: "https://emi-dm.github.io"
date: 2026-09-02T00:00:00.000Z
tags: [research, security, llm, code-generation, resaise-2026]
description: "Nuestro artículo sobre el nivel de abstracción del conocimiento de seguridad para generar código con LLM ha sido aceptado en ReSAISE 2026."
---

**TL;DR:** Me hace mucha ilusión compartir que nuestro artículo, *“Assessing the Proper Abstraction Level of Security Knowledge for Code Generation,”* ha sido aceptado para su presentación en [ReSAISE 2026](https://resaise.github.io/2026/index.html), celebrado junto a ISSRE 2026.

## Qué investigamos

En este trabajo estudiamos cómo el nivel de abstracción del conocimiento de seguridad afecta a la generación de código basada en LLM. Utilizamos la jerarquía **Common Weakness Enumeration (CWE)** para representar indicaciones con distintos niveles de especificidad.

> ¿Una guía de seguridad más específica conduce necesariamente a código generado más seguro?

La pregunta es relevante porque las instrucciones de seguridad pueden ir desde principios generales hasta indicaciones sobre debilidades concretas. Elegir el nivel adecuado puede influir en cómo el modelo comprende y aplica ese conocimiento al generar código.

## Por qué importa el nivel de abstracción

A menudo se asume que más detalle siempre es mejor, pero el modelo también debe relacionar ese detalle con el contexto general de la tarea de programación. Nuestro artículo estudia este equilibrio de forma sistemática, sin dar por hecho que la guía más específica producirá siempre el resultado más seguro.

El objetivo es comprender mejor cómo representar y proporcionar conocimiento de seguridad a los sistemas de generación de código, para que las indicaciones sean aplicables y tengan el alcance adecuado.

## Un trabajo colaborativo

Esta aceptación tiene un significado especial porque la investigación se ha realizado junto a mis compañeros de [i3 lab](https://i3lab.unex.es/es/), gestionado por el Quercus Software Engineering Group (QSEG), y en el Instituto Universitario de Investigación en Tecnologías Informáticas Aplicadas (INTIA) de la Universidad de Extremadura.

Muchas gracias a todos mis coautores y colaboradores por las conversaciones, revisiones, experimentos y todas las iteraciones que han hecho posible este trabajo.

## Nos vemos en ReSAISE 2026

[ReSAISE 2026](https://resaise.github.io/2026/index.html) es la cuarta edición del IEEE International Workshop on Reliable and Secure AI for Software Engineering y se celebra junto al [37th IEEE International Symposium on Software Reliability Engineering (ISSRE 2026)](https://cyprusconferences.org/issre2026/) en Limassol, Chipre.

Estoy deseando presentar el trabajo y debatir sus resultados con la comunidad.

## Enlaces

- [ReSAISE 2026](https://resaise.github.io/2026/index.html)
- [ISSRE 2026](https://cyprusconferences.org/issre2026/)
- [i3 lab de QSEG](https://i3lab.unex.es/es/)
- [Institutos de investigación de la Universidad de Extremadura](https://www.unex.es/investigacion-y-transferencia/nuestra-investigacion/institutos-de-investigacion/)
