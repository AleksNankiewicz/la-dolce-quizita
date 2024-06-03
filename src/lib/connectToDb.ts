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

    const db: any = await mongoose.connect(
      'mongodb+srv://aleksnankiewicz:BXGNcSNV3dQQrzbW@cluster0.2joxpdm.mongodb.net/italian-quiz?retryWrites=true&w=majority' as any
    )

    connection.isConnected = db.readyState === 1
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  }
}
