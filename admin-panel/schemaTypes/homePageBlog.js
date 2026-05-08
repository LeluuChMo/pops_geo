export default {
  name: 'homePageBlog',
  title: 'მთავარი გვერდის ბლოგი',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'სათაური',
      type: 'string',
    },
    {
      name: 'image',
      title: 'სურათი',
      type: 'image',
      options: {
        hotspot: true, 
      },
    },
    {
      name: 'description',
      title: 'აღწერა (ტექსტი)',
      type: 'text',
    },
  ],
}