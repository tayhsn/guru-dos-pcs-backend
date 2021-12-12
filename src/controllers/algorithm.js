import { promises as fs } from 'fs';
const { readFile } = fs;

function getHighestRanking(userSelectedPrograms) {
  let highestRanking = 0;
  let highestPrograms = [];
  userSelectedPrograms.forEach(program => {
    if(program.ranking > highestRanking) {
      highestRanking = program.ranking
      highestPrograms = [program]; 
    } else if(program.ranking === highestRanking) {
      highestPrograms.push(program)
    }
  });

  return {
    highestRanking: highestRanking,
    highestPrograms: highestPrograms
  };
}

function compareSelectedPrograms(highestPrograms, personaPrograms) {
  let commonPrograms = 0;

  highestPrograms.forEach(program => {
    const found = personaPrograms.find(personaProgram => 
      personaProgram.nome.toLowerCase() === program.nome.toLowerCase()
    );
    if(found) {
      commonPrograms++;
    }
  });

  return commonPrograms;
}

function compareRanking(highestRanking, personaPrograms) {
  let commonHighestRanking = 0;

  personaPrograms.forEach(program => {
    if(program.ranking === highestRanking) {
      commonHighestRanking++;
    }
  });

  return commonHighestRanking;
}

function generatingComputer(commonProgramsValue, highestCommonValue, orcamento, persona) {
  if(commonProgramsValue === highestCommonValue) {
    if(orcamento === false || orcamento.valor_maximo >= persona.valor_total) {
      return {
        "message": "Computador gerado!",
        "computer": persona.componentes,
        "valor_total": persona.valor_total
      }
    } else {
      return { 
        "message": "Orçamento insuficiente.",
        "computer": persona.componentes,
        "valor_total": persona.valor_total
      }
    }
  }

  return false;
}

async function getConfigs (req, res) {
  const { userProfile } = req.body

  if(!userProfile?.selectedPrograms.length) {
    return res.status(400).json("Precisa selecionar ao menos um programa.");
  }

  try {
    const allConfigs = JSON.parse( await readFile("src/mocks/config.mock.json") )

    const { persona1, persona2, persona3 } = allConfigs

    const { highestPrograms, highestRanking } =  getHighestRanking(userProfile.selectedPrograms);
  
    const commonProgramsOne = compareSelectedPrograms(highestPrograms, persona1.programas)
    const commonProgramsTwo = compareSelectedPrograms(highestPrograms, persona2.programas)
    const commonProgramsThree = compareSelectedPrograms(highestPrograms, persona2.programas)

    const highestCommonValue = Math.max(commonProgramsOne, commonProgramsTwo, commonProgramsThree) 

    if(highestCommonValue === 0) {
      const commonRankingOne = compareRanking(highestRanking, persona1.programas);
      const commonRankingTwo = compareRanking(highestRanking, persona2.programas);
      const commonRankingThree = compareRanking(highestRanking, persona3.programas);

      const mostFrequently = Math.max(commonRankingOne, commonRankingTwo, commonRankingThree); 

      let computer;
      computer = generatingComputer(commonRankingOne, mostFrequently, userProfile.orcamento, persona1);
      if(!computer) {
        computer = generatingComputer(commonRankingTwo, mostFrequently, userProfile.orcamento, persona2);
        if(!computer) {
          computer = generatingComputer(commonRankingThree, mostFrequently, userProfile.orcamento, persona3);
        }
      }

      return res.send(computer).status(200);
    } else {
      let computer;
      computer = generatingComputer(commonProgramsOne, highestCommonValue, userProfile.orcamento, persona1);
      if(!computer) {
        computer = generatingComputer(commonProgramsTwo, highestCommonValue, userProfile.orcamento, persona2);
        if(!computer) {
          computer = generatingComputer(commonProgramsThree, highestCommonValue, userProfile.orcamento, persona3);
        }
      }

      return res.send(computer).status(200);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

export { getConfigs };