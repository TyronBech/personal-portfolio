export default {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    // --- Personal Info ---
    { name: 'first_name', title: 'First Name', type: 'string' },
    { name: 'middle_name', title: 'Middle Name', type: 'string' },
    { name: 'last_name', title: 'Last Name', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' }, // e.g., "Full Stack Web Developer"
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'message', title: 'Short Message', type: 'text' },
    { name: 'about', title: 'About Me', type: 'text' },
    { name: 'profile_image', title: 'Profile Image', type: 'image', options: { hotspot: true } },

    // --- About & Experience Images ---
    { name: 'about_image', title: 'About Image', type: 'image', options: { hotspot: true } },
    { name: 'about_image_alt', title: 'About Image Alt Text', type: 'string' },
    { name: 'experience_image', title: 'Experience Image', type: 'image', options: { hotspot: true } },
    { name: 'experience_image_alt', title: 'Experience Image Alt Text', type: 'string' },
    
    // --- Location ---
    {
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        { name: 'city', title: 'City', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' }
      ]
    },

    // --- Status ---
    {
      name: 'statuses',
      title: 'Availability Status',
      type: 'object',
      fields: [
        { name: 'work', title: 'Open to Work?', type: 'boolean' },
        { name: 'projects', title: 'Open to Projects?', type: 'boolean' }
      ]
    },

    // --- Social Links ---
    {
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Platform Name', type: 'string' },
            { name: 'url', title: 'Link', type: 'url' }
          ]
        }
      ]
    },

    // --- Education ---
    {
      name: 'school',
      title: 'Education',
      type: 'object',
      fields: [
        { name: 'name', title: 'School Name', type: 'string' },
        { name: 'branch', title: 'Branch', type: 'string' },
        { name: 'degree', title: 'Degree', type: 'string' },
        { name: 'start_year', title: 'Start Year', type: 'number' },
        { name: 'graduation_year', title: 'Graduation Year', type: 'number' }
      ]
    },

    // --- Skills ---
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
}