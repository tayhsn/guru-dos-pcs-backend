import { promises as fs } from 'fs';
const { readFile } = fs;

//qual o maior ranking? 
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

async function getConfigs (req, res) {
  const { userProfile } = req.body

  if(!userProfile?.selectedPrograms.length) {
    return res.status(400).json("Precisa selecionar ao menos um programa.");
  }

  try {
    const allConfigs = JSON.parse( await readFile("src/mocks/config.mock.json") )

    const { persona1, persona2, persona3 } = allConfigs

    const result =  getHighestRanking(userProfile.selectedPrograms);

    return res.send(result).status(201);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

export { getConfigs };