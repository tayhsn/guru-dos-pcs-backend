import { promises as fs } from 'fs';
const { readFile } = fs;

async function getConfigs (req, res) {
  const { persona } = req.body

  try {
    const allConfigs = JSON.parse( await readFile("src/mocks/config.mock.json") )

    const { persona1, persona2, persona3 } = allConfigs

    return res.send(allConfigs).status(201);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

export { getConfigs };