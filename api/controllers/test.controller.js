const TestModel = require('../models/test.model')

async function getAllTests(req, res) {
  try {
    const tests = await TestModel.find({}, { correct: 0, answered: 0, percentage: 0, __v: 0 })
    res.status(200).json(tests)
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function getOneTest(req, res) {
  try {
    const list = []
    await TestModel.findById(req.params.id, { correct: 0, answered: 0, percentage: 0, __v: 0 })
      .populate('questions')
      .then(test => {
        test.questions.forEach(element => {
          console.log(element)
          const question = { question: element.text, image: element.picture, options: element.options }
          list.push(question)
        })
      })
      res.status(200).json(list)
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

function getTestStatistics(req, res) {
  try {
    const arr = res.locals.user.studentData.testsDone
    const index = arr.findIndex(object => {
      if (object.id.toString() === req.params.id) { return true }
    })
    if (index !== -1) {
      return res.status(200).json(arr[index])
    } else {
      return res.status(400).send(`Test ${req.params.id} not found in your profile`)
    }
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function createTest(req, res) {
  try {
    const test = await TestModel.create(req.body)
    res.status(200).json({ message: `Test ${test.id} created`, test })
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function submitTest(req, res) {
  try {
    const user = res.locals.user
    await TestModel.findById(req.params.id)
      .populate('questions')
      .then(test => {
        const answers = test.questions.map(element => { //correct answers
          return element.answer
        })
        const text = test.questions.map(element => { //question text
          return element.text
        })
        const ansText = test.questions.map(element => { //answer text
          const i = element.options.findIndex(option => {
            if (Object.keys(option)[0] === element.answer) { return true }
          })
          return element.options[i][element.answer]
        })
        const topics = test.questions.map(element => {
          return element.topic
        })
        const submit = Object.values(req.body)  //Submitted answers
        test.answered = submit.length
        const results = []
        for (let i = 0; i < submit.length; i++) {
          if (submit[i] === answers[i]) {                                                                               //Resp. correcta
            test.correct++
            results.push({ question: `Question ${i + 1} - '${text[i]}'`, answer: `Correct! Your answer was ${answers[i]} - '${ansText[i]}'.` })
            const index = user.studentData.statistics.findIndex(object => { //Buscar dentro de las estadísticas si se han respondido preguntas de este topic previamente
              if (object.topic.toString() === topics[i].toString()) { return true }
            })
            if (index === -1) {
              user.studentData.statistics.push({ topic: topics[i] })
              user.studentData.statistics[user.studentData.statistics.length-1].correct++
              user.studentData.statistics[user.studentData.statistics.length-1].answered++
              user.studentData.statistics[user.studentData.statistics.length-1].percentage = (user.studentData.statistics[user.studentData.statistics.length-1].correct / user.studentData.statistics[user.studentData.statistics.length-1].answered) * 100
            } else {
              user.studentData.statistics[index].correct++
              user.studentData.statistics[index].answered++
              user.studentData.statistics[index].percentage = (user.studentData.statistics[index].correct / user.studentData.statistics[index].answered) * 100
            }
          } else if (submit[i] === '') {                                                                                  //Resp. en blanco
            test.answered--
            results.push({ question: `Question ${i + 1} - '${text[i]}'`, answer: `The correct answer was ${answers[i]} - '${ansText[i]}'.` })
          } else {                                                                                                        //Resp. errónea
            results.push({ question: `Question ${i + 1} - '${text[i]}'`, answer: `The correct answer was ${answers[i]} - '${ansText[i]}'.` })
            const index = user.studentData.statistics.findIndex(object => { //Buscar dentro de las estadísticas si se han respondido preguntas de este topic previamente
              if (object.topic.toString() === topics[i].toString()) { return true }
            })
            if (index === -1) {
              user.studentData.statistics.push({ topic: topics[i] })
              user.studentData.statistics[user.studentData.statistics.length-1].answered++
              user.studentData.statistics[user.studentData.statistics.length-1].percentage = (user.studentData.statistics[user.studentData.statistics.length-1].correct / user.studentData.statistics[user.studentData.statistics.length-1].answered) * 100
            } else {
              user.studentData.statistics[index].answered++
              user.studentData.statistics[index].percentage = (user.studentData.statistics[index].correct / user.studentData.statistics[index].answered) * 100
            }
          }
        }
        const index = user.studentData.testsDone.findIndex(object => { //Buscar dentro de los tests realizados por el alumno si ya había hecho este test antes
          if (object.id.toString() === req.params.id) { return true }
        })
        if (index === -1) {
          user.studentData.testsDone.push({ id: req.params.id }) //Si no se había hecho el test antes, añadirlo a los test realizados
          user.studentData.testsDone[user.studentData.testsDone.length - 1].maxScore = test.correct //establecemos la puntación obtenida como maxScore
        } else {  //en caso de que el test ya se haya realizado previamente
          test.correct > user.studentData.testsDone[index].maxScore ? user.studentData.testsDone[index].maxScore = test.correct : user //modificar puntuación máxima si se ha superado
          user.studentData.testsDone[index].tries++// aumentar número de intentos
        }
        user.save()
        test.percentage = (test.correct / answers.length) * 100
        res.status(200).json({ correct: test.correct, answered: test.answered, percentage: test.percentage, results })
      })
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function updateTest(req, res) {
  try {
    const test = await TestModel.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({ message: `Test ${test.id} updated`, test })
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function deleteTest(req, res) {
  try {
    const test = await TestModel.findByIdAndDelete(req.params.id)
    res.status(200).send(`Test ${test.id} deleted`)
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

module.exports = {
  getAllTests,
  getOneTest,
  getTestStatistics,
  createTest,
  submitTest,
  updateTest,
  deleteTest
}