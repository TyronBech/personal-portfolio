export default {
  name: 'chatbot',
  title: 'Chatbot Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the chatbot.'
    },
    {
      name: 'systemInstruction',
      title: 'System Instruction',
      type: 'text',
      description: 'The system instructions used to prime the portfolio AI clone.'
    }
  ]
}
