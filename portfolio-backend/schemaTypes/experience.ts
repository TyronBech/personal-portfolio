export default {
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    { name: 'id', title: 'ID', type: 'number' },
    { name: 'company', title: 'Company Name', type: 'string' },
    { name: 'role', title: 'Job Role', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'start_year', title: 'Start Date', type: 'string' },
    { name: 'end_year', title: 'End Date', type: 'string' }
  ]
}