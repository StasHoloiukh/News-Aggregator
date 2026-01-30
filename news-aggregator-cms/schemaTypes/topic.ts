export default {
  name: 'topic',
  title: 'Topic',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Topic Name',
      type: 'string',
      description: 'e.g., "Technology", "Politics", "Business"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Articles containing these keywords in the title will be tagged with this topic',
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'color',
      title: 'Color (optional)',
      type: 'string',
      description: 'Hex color for UI display (e.g., "#3B82F6")',
      placeholder: '#3B82F6',
    },
  ],
}