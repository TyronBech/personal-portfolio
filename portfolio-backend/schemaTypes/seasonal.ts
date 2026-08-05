export default {
  name: 'seasonal',
  title: 'Seasonal Decorations',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Holiday / Season Name',
      type: 'string',
      description: 'Internal key for theme, e.g. "halloween", "christmas", or "birthday"',
    },
    {
      name: 'title',
      title: 'Display Title',
      type: 'string',
      description: 'Readable title, e.g. "Halloween Season" or "Merry Christmas"',
    },
    {
      name: 'start_date',
      title: 'Start Date (MM-DD)',
      type: 'string',
      description: 'Start date in MM-DD format, e.g. "10-24" for Oct 24',
    },
    {
      name: 'end_date',
      title: 'End Date (MM-DD)',
      type: 'string',
      description: 'End date in MM-DD format, e.g. "11-02" for Nov 2',
    },
    {
      name: 'hero_image',
      title: 'Home Page Seasonal Hero / Profile Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Dedicated picture for ProfileFlipCard on the main section',
    },
    {
      name: 'about_image',
      title: 'About Page Seasonal Image (Optional)',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional seasonal picture to replace the default About Me image',
    },
    {
      name: 'is_active',
      title: 'Enable / Force Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle whether this seasonal theme is enabled',
    },
  ],
}
