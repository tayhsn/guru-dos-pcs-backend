import { connection } from "../data/connection.js";
import { transport } from "../nodemailer.js";

async function getAllCategorias(_, res) {
  try {
    const data = await connection.select("id", "categoria").from("categorias");
    return res.send(data).status(200);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function getProgramasByCategoriaId(req, res) {
  const id = req.params.id;

  if(!id) return

  try {
    const data = await connection
      .table("programas")
      .innerJoin("categorias", "categorias.id", "=", "programas.id_categoria")
      .innerJoin(
        "nivel_consumo",
        "nivel_consumo.id",
        "=",
        "programas.id_nivel_consumo"
      )
      .select(
        "programas.id",
        "programas.nome",
        "programas.rank",
        "categorias.id",
        "categorias.categoria",
        "nivel_consumo.id",
        "nivel_consumo.nivel"
      )
      .where('programas.id_categoria', id);

    res.send(data).status(200);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function postFeedback(req, res) {
  const { generationComputerNote, computerSatisfation, howEasyToUnderstand, message } = req.body

  const id = 0
  const datetime = new Date()
  const formattedDatetime = datetime.toLocaleString("pt-br")

  try {
    transport.sendMail({
      from: '<feedback@gurudospc.com>',
      to: "feedback@gurudospc.com",
      subject: `FEEDBACK ${id}`, 
      text: `
        Feedback: ${id} | 
        Data e Hora: ${formattedDatetime}

        Satisfação geral: ${computerSatisfation},
        Nota do serviço: ${generationComputerNote},
        Acessibilidade 
        (10 muito fácil - 0 muito dificil): ${howEasyToUnderstand},
        Mensagem (opcional): ${message}
      `
    })
    
    id++
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

export { getAllCategorias, getProgramasByCategoriaId, postFeedback };
