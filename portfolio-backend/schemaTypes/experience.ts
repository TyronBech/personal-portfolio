export default {
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    { name: 'id', title: 'ID', type: 'number' },
    { name: 'company', title: 'Company Name', type: 'string' },
    { name: 'role', title: 'Job Role', type: 'string' },
    { name: 'description', title: 'Description', type: 'array', of: [{ type: 'string' }] },
    { name: 'additional_info', title: 'Additional Info', type: 'text' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'start_date', title: 'Start Date', type: 'string' },
    { name: 'end_year', title: 'End Date', type: 'string' }
  ]
}