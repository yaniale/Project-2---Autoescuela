const imageToBase64 = require('image-to-base64')

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
    let list = []
    await TestModel.findById(req.params.id, { correct: 0, answered: 0, percentage: 0, __v: 0 })
      .populate('questions')
      .then(test => {
        async function getImage(element) {
          const img = await imageToBase64(`./public/images/${element.picture}`)
          const question = { question: element.text, image: img, options: element.options }
          list.push(question)
        }
        test.questions.forEach( element => {
          getImage(element)
        })
      })
      Promise.all(list).then(result => {
        res.status(200).json(result)
      })
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
            if ( Object.keys(option)[0] === element.answer) { return true }
          })
          return element.options[i][element.answer]
        })
        const submit = Object.values(req.body)  //Submitted answers
        test.answered = submit.length
        const results = []
        for (let i = 0; i < submit.length; i++) {
          if (submit[i] === answers[i]) {
            test.correct++
            results.push(`Question ${i+1} - '${text[i]}': Correct! Your answer was ${answers[i]} - '${ansText[i]}'.`)
          } else if (submit[i] === '') {
            test.answered--
            results.push(`Question ${i+1} - '${text[i]}': The correct answer was ${answers[i]} - '${ansText[i]}'.`)
          } else {
            results.push(`Question ${i+1} - '${text[i]}': The correct answer was ${answers[i]} - '${ansText[i]}'.`)
          }
        }
        const user = res.locals.user
        const index = user.studentData.testsDone.findIndex(object => { //Buscar dentro de los tests realizados por el alumno si ya había hecho este test antes
          if (object.id.toString() === req.params.id) { return true }
        })
        if (index === -1) {
          user.studentData.testsDone.push({ id: req.params.id }) //Si no se había hecho el test antes, añadirlo a los test realizados
          user.studentData.testsDone[user.studentData.testsDone.length-1].maxScore = test.correct //establecemos la puntación obtenida como maxScore
        } else {  //en caso de que el test ya se haya realizado previamente
          test.correct > user.studentData.testsDone[index].maxScore ?  user.studentData.testsDone[index].maxScore = test.correct : user //modificar puntuación máxima si se ha superado
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
  createTest,
  submitTest,
  updateTest,
  deleteTest
}