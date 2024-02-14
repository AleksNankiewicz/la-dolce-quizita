import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
    },
    points: {
      type: Number,
      default: 0,
    },
    gamePlayed: {
      type: Number,
      default: 0,
    },
    gameWon: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)
const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
    },
    questions: {
      type: Array,
    },
    slug: {
      type: String,
      default: Math.floor(Math.random() * 9999999),
    },
  },
  { timestamps: true }
)
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  answears: {
    type: Array,
  },
  timePerQuestion: {
    type: Number,
  },
})
const answearSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)
export const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema)
export const Question =
  mongoose.models.Question || mongoose.model('Question', questionSchema)
export const Answear =
  mongoose.models.Answear || mongoose.model('Answear', answearSchema)
