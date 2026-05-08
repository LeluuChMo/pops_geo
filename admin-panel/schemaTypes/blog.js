export default {
  name: 'blog',
  title: 'ბლოგები',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'სათაური',
      type: 'string',
    },
    {
      name: 'mainImage',
      title: 'მთავარი სურათი',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'content',
      title: 'ტექსტი',
      type: 'text',
    },
  ]
}