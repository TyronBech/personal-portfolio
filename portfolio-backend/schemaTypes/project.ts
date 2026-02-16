export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'id', title: 'ID', type: 'number' },
    { name: 'name', title: 'Project Name', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { 
      name: 'technologies', 
      title: 'Technologies Used', 
      type: 'array', 
      of: [{ type: 'string' }] 
    },
    { name: 'repository', title: 'GitHub Repo', type: 'url' },
    { name: 'type', title: 'Project Type', type: 'string' }, // e.g. "CLI Application"
    { name: 'year', title: 'Year', type: 'number' },
    { 
      name: 'project_image', 
      title: 'Project Image', 
      type: 'image',
      options: { hotspot: true }
    }
  ]
}