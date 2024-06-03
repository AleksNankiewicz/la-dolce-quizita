import mongoose from 'mongoose'
import { string } from 'zod'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
    quizCoins: {
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
    streak: {
      type: Number,
      default: 0,
    },
    lastGameDate: {
      type: Date,
    },
    permissions: {
      type: Array,
    },
    slug: {
      type: Number,
      default: Math.floor(Math.random() * 99999999),
    },
    quizesPlayed: {
      type: Array,
      default: [],
    },
    records: {
      type: Array,
      default: [],
    },
    selectedBadge: {
      type: String,
    },
    selectedProfileFrame: {
      type: String,
    },
    level: {
      type: Number,
      default: 1,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    badges: {
      type: Array,
    },
    profileFrames: {
      type: Array,
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
    level: {
      type: String,
    },
    records: {
      type: Array,
      default: [],
    },
    categorySlug: {
      type: String,
    },
    categoryName: {
      type: String,
    },
    access: {
      type: String,
      default: 'All',
    },
    questionsPercent: {
      type: Number,
      default: 100,
    },
    author: {
      type: String,
    },
    playCount: {
      type: Number,
      default: 0,
    },
    reward: {
      type: Object,
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

  time: {
    type: Number,
    default: 20,
  },
  desc: {
    type: String,
  },
  points: {
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

const categorySchema = new mongoose.Schema({
  parentCategory: {
    type: String,
  },
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
  slug: {
    type: String,
  },
})

const levelSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  threshold: {
    type: Number,
    required: true,
  },
  badge: {
    type: String, // Możesz przechowywać ścieżkę do obrazka odznaki
    default: null, // Domyślnie brak odznaki
  },
  profileFrame: {
    type: String, // Możesz przechowywać ścieżkę do obrazka obramówki profilowej
    default: null, // Domyślnie brak obramówki
  },
})

const shopItemSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
  },
  promotion: {
    type: Number,
  },
  type: {
    type: String,
  },
  img: {
    type: String,
  },
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)
export const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema)

export const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema)

export const Question =
  mongoose.models.Question || mongoose.model('Question', questionSchema)
export const Answear =
  mongoose.models.Answear || mongoose.model('Answear', answearSchema)

export const Level =
  mongoose.models.Level || mongoose.model('Level', levelSchema)
export const ShopItem =
  mongoose.models.ShopItem || mongoose.model('ShopItem', shopItemSchema)
