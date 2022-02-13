const QuestionModel= require('../models/question.model')
const TopicModel = require('../models/topic.model')
const TestModel = require('../models/test.model')

async function getAllQuestions(req, res) {
  try {
    const questions = await QuestionModel.find(req.query)
    res.status(200).json(questions)
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function getOneQuestion(req, res) {
  try {
    const question = await QuestionModel.findById(req.params.id)
    res.status(200).json(question)
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function createQuestion(req, res) {
  try {
    const question = await QuestionModel.create(req.body)
    res.status(200).json({ message: 'Question created', question })
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function updateQuestion(req, res) {
  try {
    const question = await QuestionModel.findByIdAndUpdate(req.params.id, req.body)
    const topic = await TopicModel.findById(question.topic)
    res.status(200).json({message: `Question for topic '${topic.title}' uptated`, question})
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function deleteQuestion(req, res) {
  try {
    const delQuestion = await QuestionModel.findByIdAndDelete(req.params.id)
    const tests = await TestModel.find({ questions: delQuestion })
    tests.forEach(test => {
      test.questions = test.questions.filter(question => {
        return question.toString() !== delQuestion.id
      })
      test.save()
    })
    res.status(200).send('Question deleted')
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

module.exports = {
  getAllQuestions,
  getOneQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion
}