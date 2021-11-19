import repository from '../repositories/repository.js'

async function getAllCategorias(req, res) {
   try {
      const data = await repository.getAllCategorias()
      res.send(data)
   } catch(err) {
      return res.status(400).json(err.message)
   }
}

export default { getAllCategorias }