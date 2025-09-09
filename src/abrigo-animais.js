class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const animaisAbrigo = {
      Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
    }

    const brinquedosValidos = Object.values(animaisAbrigo).flatMap((animal) => animal.brinquedos)
    const todosBrinquedos = [...new Set(brinquedosValidos)]

    const processarEntrada = (entrada) => {
      if (!entrada) {
        return []
      }
      const itens = entrada.toUpperCase().split(",").map((item) => item.trim())
      const itensUnicos = new Set(itens)
      if (itens.length !== itensUnicos.size) {
        return { erro: "Brinquedo inválido" }
      }
      return itens
    }

    const brinquedosP1 = processarEntrada(brinquedosPessoa1)
    const brinquedosP2 = processarEntrada(brinquedosPessoa2)

    let animaisParaAdotar = []
    if (ordemAnimais) {
      animaisParaAdotar = ordemAnimais.split(",").map((animal) => animal.trim())
      const animaisUnicos = new Set(animaisParaAdotar)
      if (animaisParaAdotar.length !== animaisUnicos.size) {
        return { erro: "Animal inválido" }
      }
    }

    if (brinquedosP1.erro) return { erro: brinquedosP1.erro }
    if (brinquedosP2.erro) return { erro: brinquedosP2.erro }

    const todosBrinquedosEntrada = [...new Set([...brinquedosP1, ...brinquedosP2])]

    for (const brinquedo of todosBrinquedosEntrada) {
      if (!todosBrinquedos.includes(brinquedo)) {
        return { erro: "Brinquedo inválido" }
      }
    }

    const resultados = []
    const adotadosP1 = []
    const adotadosP2 = []

    const verificarAdocao = (pessoasBrinquedos, animal, adotados) => {
      const brinquedosAnimal = animal.brinquedos

      if (animal.tipo === "gato") {

        for (const adotadoNome of adotados) {
          const animalAdotado = animaisAbrigo[adotadoNome]
          const brinquedosCompartilhados = animalAdotado.brinquedos.some(b => brinquedosAnimal.includes(b))
          if (brinquedosCompartilhados) {
            return false
          }
        }
        let idx = 0
        for (const brinquedo of pessoasBrinquedos) {
          if (brinquedo === brinquedosAnimal[idx]) {
            idx++
          }
          if (idx === brinquedosAnimal.length) break
        }  
        return idx === brinquedosAnimal.length
      }
      
      if (animal.tipo === "jabuti") {
        if (adotados.length > 0 && pessoasBrinquedos.some(b => brinquedosAnimal.includes(b))) {
          return true
        }
        return false
      }

      let idx = 0
      for (const brinquedo of pessoasBrinquedos) {
        if (brinquedo === brinquedosAnimal[idx]) {
          idx++
        }
        if (idx === brinquedosAnimal.length) break
      } 
      return idx === brinquedosAnimal.length
    }

    for (const animalNome of animaisParaAdotar) {
      const animal = animaisAbrigo[animalNome]
      if (!animal) {
        return { erro: "Animal inválido" }
      }

      const aptoP1 = adotadosP1.length < 3? verificarAdocao(brinquedosP1, animal, adotadosP1) : false
      const aptoP2 = adotadosP2.length < 3? verificarAdocao(brinquedosP2, animal, adotadosP2) : false

      let resultadoAdocao

      if (aptoP1 && aptoP2) {
        resultadoAdocao = `${animalNome} - abrigo`
      } else if (aptoP1) {
          if (adotadosP1.length < 3) {
            resultadoAdocao = `${animalNome} - pessoa 1`
            adotadosP1.push(animalNome)
          } else {
            resultadoAdocao = `${animalNome} - abrigo`
          }
      } else if (aptoP2) { 
        if (adotadosP2.length < 3) {
          resultadoAdocao = `${animalNome} - pessoa 2`
          adotadosP2.push(animalNome)
        } else {
          resultadoAdocao = `${animalNome} - abrigo`
        }
      } else {
        resultadoAdocao = `${animalNome} - abrigo`
      }
      resultados.push(resultadoAdocao)
    }

    const listaFinal = resultados.sort((a, b) => {
      const nomeA = a.split(" - ")[0]
      const nomeB = b.split(" - ")[0]
      return nomeA.localeCompare(nomeB)
    })

    return { lista: listaFinal }
  }
}

export { AbrigoAnimais as AbrigoAnimais };

