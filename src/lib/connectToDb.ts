import mongoose, { Connection } from 'mongoose'

interface GlobalConnection {
  isConnected: boolean
}

const connection: GlobalConnection = { isConnected: false }

export const connectToDb = async (): Promise<void> => {
  try {
    if (connection.isConnected) {
      console.log('using existing connection')
      return
    }

    const db: any = await mongoose.connect(process.env.MONGO as string)

    connection.isConnected = db.readyState === 1
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}
