const TopicModel = require('../models/topic.model')

async function getAllTopics(req, res) {
  try {
    const topics = await TopicModel.find()
    res.status(200).json(topics)
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function getOneTopic(req, res) {
  try {
    const topic = await TopicModel.findById(req.params.id)
    if(!topic) return res.status(400).send('Topic not found')
    res.status(200).sendFile(topic.content, {root: 'content'})
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function createTopic(req, res) {
  try {
    const topic = await TopicModel.create(req.body)
    res.status(200).json({ message: 'Topic created!', content: topic.content})
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function updateTopic (req, res) {
  try {
    const topic = await TopicModel.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({ message: `Topic '${topic.title}' updated`, topic})
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

async function deleteTopic(req, res) {
  try {
    const topic = await TopicModel.findByIdAndDelete(req.params.id)
    res.status(200).send(`Topic '${topic.title}' deleted`)
  } catch (error) {
    res.status(500).send(`Request error: ${error}`)
  }
}

module.exports = {
  getAllTopics,
  getOneTopic,
  createTopic,
  updateTopic,
  deleteTopic
}