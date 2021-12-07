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

  if (!id) res.send("Precisa informar o ID da Categoria");

  try {
    const data = await connection.raw(`
        select pro.id, pro.nome, pro.ranking, c.categoria, nc.nivel
        from programas as pro
        inner join categorias c on c.id = pro.id_categoria 
        inner join nivel_consumo nc on nc.id = pro.id_nivel_consumo 
        where c.id = ${id} 
        group by pro.id, c.id, nc.id 
    `)
      
    return res.send(data.rows).status(200);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

let id = 0
async function postFeedback(req, res) {
  const {
    howEasyToGenerate,
    serviceSatisfaction,
    howEasyToUnderstand,
    message,
  } = req.body;

  if(!howEasyToGenerate || !serviceSatisfaction || !howEasyToUnderstand) res.send("Informe todos os dados obrigátorios!")

  const datetime = new Date();
  const formattedDatetime = datetime.toLocaleString("pt-br");

  try {
    const feedbackSent = transport.sendMail({
      from: "<feedback@gurudospc.com>",
      to: "feedback@gurudospc.com",
      subject: `FEEDBACK ${id}`,
      text: `
        Feedback: ${id} | 
        Data e Hora: ${formattedDatetime}

        Acessibilidade de uso: ${howEasyToGenerate}
        Acessibilidade de informações: ${howEasyToUnderstand}
        Nota do serviço: ${serviceSatisfaction}
        Sugestão: ${message}
      `,
    });

    id++;

    if (feedbackSent) res.send("Feedback enviado.").status(201);
    else res.send("Problema ao enviar o feedback.").status(500);
  } catch (error) {
    return res.status(400);
  }
}

export { getAllCategorias, getProgramasByCategoriaId, postFeedback };
