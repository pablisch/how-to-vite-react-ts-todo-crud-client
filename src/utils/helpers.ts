import axios from 'axios'

export default {
  deleteItem: async function (id: string, url: string): Promise<void> {
    console.log('Deleting:', id)
    try {
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  },
}
