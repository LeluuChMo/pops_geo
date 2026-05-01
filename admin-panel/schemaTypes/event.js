export default {
  name: 'event',
  title: 'მხარდამჭერი ივენთები',
  type: 'document',
  fields: [
    {
      name: 'link',
      title: 'ინსტაგრამის/ვებ-გვერდის ლინკი',
      type: 'url'
    },
    {
      name: 'logo',
      title: 'ლოგო/სურათი',
      type: 'image',
      options: { hotspot: true }
    }
  ]
}