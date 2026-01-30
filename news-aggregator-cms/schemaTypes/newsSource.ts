export default {
  name: 'newsSource',
  title: 'News Source',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Source Name',
      type: 'string',
      description: 'Display name (e.g., "BBC News")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sourceId',
      title: 'Source ID',
      type: 'string',
      description: 'ID from NewsAPI (e.g., "bbc-news", "cnn", "techcrunch")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Only active sources will be shown in the app',
      initialValue: true,
    },
  ],
}