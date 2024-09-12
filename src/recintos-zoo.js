class RecintosZoo 
{

    static recintos = 
    [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: { macacos: 3 } },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: {} },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: { gazelas: 1 } },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: {} },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: { leões: 1 } }
    ];

    static animais = 
    {
        leão: { tamanho: 3, biomas: ['savana'] },
        leopardo: { tamanho: 2, biomas: ['savana'] },
        crocodilo: { tamanho: 3, biomas: ['rio'] },
        macaco: { tamanho: 1, biomas: ['savana', 'floresta'] },
        gazela: { tamanho: 2, biomas: ['savana'] },
        hipopotamo: { tamanho: 4, biomas: ['savana', 'rio'] }
    };        

    analisaRecintos(animal, quantidade) { 
    
    const tipoAnimal = animal.toLowerCase();
        if (!RecintosZoo.animais[tipoAnimal]) 
        {
            return "Animal inválido";
        }
        if (!Number.isInteger(quantidade) || quantidade <= 0) 
        {
            return "Quantidade inválida";
        }

        const animalInfo = RecintosZoo.animais[tipoAnimal];
        const biomas = animalInfo.biomas;
        const tamanhoAnimal = animalInfo.tamanho;

        const recintosViaveis = RecintosZoo.recintos.filter(recinto => 
        {
            
            if (!biomas.includes(recinto.bioma)) return false;

            // Checar espaço necessário
            let espaçoLivre = recinto.tamanhoTotal;
            let quantidadeExistente = 0;

            for (const [animalExistente, qtd] of Object.entries(recinto.animaisExistentes)) {
                if (animalExistente === tipoAnimal || (animalExistente === 'macacos' && tipoAnimal === 'macaco')) {
                    quantidadeExistente += qtd;
                } else if (animalExistente === 'leões' && tipoAnimal === 'leão') {
                    return false; 
                } else if (animalExistente === 'gazelas' && tipoAnimal === 'gazela') {
                    return false; 
                }
            }

            if (tipoAnimal === 'hipopotamo') {
                if (recinto.bioma !== 'savana e rio') return false;
                if (quantidadeExistente > 0 && quantidadeExistente + quantidade > 1) return false; 
            }
            if (tipoAnimal === 'macaco' && quantidade === 1) {
                return false;
            }

            // Calcular espaço necessário
            let espaçoNecessário = quantidade * tamanhoAnimal;
            if (Object.keys(recinto.animaisExistentes).length > 0) {
                espaçoNecessário += 1;
            }

            espaçoLivre -= espaçoNecessário;

            return espaçoLivre >= 0;
        });

        if (recintosViaveis.length === 0) {
            return "Não há recinto viável";
        }

        return recintosViaveis.map(recinto => {
            let espaçoLivre = recinto.tamanhoTotal;
            for (const [animalExistente, qtd] of Object.entries(recinto.animaisExistentes)) {
                if (animalExistente === tipoAnimal) {
                    espaçoLivre -= qtd * RecintosZoo.animais[tipoAnimal].tamanho;
                } else if (animalExistente === 'macacos') {
                    espaçoLivre -= qtd * RecintosZoo.animais['macaco'].tamanho;
                }
            }
            return `Recinto nro ${recinto.numero} (espaço livre: ${espaçoLivre} total: ${recinto.tamanhoTotal})`;
        }).sort((a, b) => {
            return parseInt(a.match(/Recinto nro (\d+)/)[1]) - parseInt(b.match(/Recinto nro (\d+)/)[1]);
        }).join("\n");
    }
    

}

export { RecintosZoo as RecintosZoo };
