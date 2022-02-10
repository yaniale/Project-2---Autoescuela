const TestModel = require('../models/test.model')

async function getAllTests(req, res) {
  try {
    const tests = await TestModel.find({}, {correct: 0, answered: 0, percentage: 0, __v: 0})
    res.status(200).json(tests)
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function getOneTest(req, res) {
  try {
    await TestModel.findById(req.params.id, {correct: 0, answered: 0, percentage: 0, __v: 0})
    .populate('questions')
    .then(test => {
      const list = test.questions.map(element => {
        const question = [ element.text, element.picture, element.options]
        return question
      })
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

module.exports = {
  getAllTests,
  getOneTest,
  createTest
}