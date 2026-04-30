export default {
  name: 'product',
  type: 'document',
  title: 'პროდუქტები',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'პროდუქტის სახელი'
    },
    {
      name: 'price',
      type: 'number',
      title: 'ფასი'
    },
    {
      name: 'image',
      type: 'image',
      title: 'პროდუქტის ფოტო',
      options: { hotspot: true }
    },
    {
  name: 'isStock',
  title: 'მარაგშია?',
  type: 'boolean',
  initialValue: true
}
  ]
}