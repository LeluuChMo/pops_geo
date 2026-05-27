import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default {
  name: 'catalogProduct',
  title: 'პროდუქტების გვერდი',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'catalogProduct' }),
    { name: 'title', title: 'სახელი', type: 'string' },
    { name: 'volume', title: 'მოცულობა (მლ)', type: 'string' },
    {
      name: 'powerLevel',
      title: 'სიძლიერე (1-დან 5-მდე)',
      type: 'string',
      description: 'ჩაწერე: l1, l2, l3, l4 ან l5 (დიზაინისთვის)'
    },
    { name: 'price', title: 'ფასი', type: 'number' },
    { name: 'description', title: 'დეტალური აღწერა', type: 'text' },
    { name: 'image', title: 'სურათი', type: 'image' },
    { name: 'isStock', title: 'მარაგშია', type: 'boolean' },
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
    }
  ]
}