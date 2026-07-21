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
      title: 'მარაგშია',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'volume',
      title: 'მოცულობა (მლ)',
      type: 'string',
      description: 'მაგალითად: 10მლ, 30მლ'
    },
    {
      name: 'displayLocation',
      title: 'სად გამოჩნდეს საიტზე?',
      type: 'string',
      options: {
        list: [
          { title: 'მხოლოდ პროდუქტებში', value: 'products' },
          { title: 'მთავარ გვერდზეც და პროდუქტებშიც', value: 'both' },
          { title: 'მხოლოდ მთავარ გვერდზე', value: 'home' }
        ],
        layout: 'radio'
      },
      initialValue: 'products'
    },
    {
      name: 'position',
      title: 'რიგითობის ნომერი (მაგ: 1, 2, 3...)',
      type: 'number',
      description: 'რაც უფრო ნაკლებს ჩაწერთ (მაგ: 1), მით უფრო წინ გამოჩნდება საიტზე.',
      initialValue: 1
    }
  ]
}