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
    await TestModel.findById(req.params.id, { correct: 0, answered: 0, percentage: 0, __v: 0 })
      .populate('questions')
      .then(test => {
        const list = test.questions.map(async element => {
          async function getImage() {
            const img = await imageToBase64(`./public/images/${element.picture}`)
            const question = [ element.text, img, element.options ]
            return question
          }
          return await getImage()
        })
        console.log(list)
        res.status(200).json(list)
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
        const answers = test.questions.map(element => {
          return element.answer
        })
        const submit = Object.values(req.body)
        test.answered = submit.length
        const results = []
        for (let i = 0; i < submit.length; i++) {
          if (submit[i] === answers[i]) {
            test.correct++
            results.push(`${Object.keys(req.body)[i]}: Correct!`)
          } else if (submit[i] === '') {
            test.answered--
            results.push(`${Object.keys(req.body)[i]}: The correct answer was ${answers[i]}`)
          } else {
            results.push(`${Object.keys(req.body)[i]}: The correct answer was ${answers[i]}`)
          }
        }
        const user = res.locals.user
        // user.studentData.testsDone.push({id: req.params.id, maxScore: test.correct, tries: 1 })
        console.log(user)
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