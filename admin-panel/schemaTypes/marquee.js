export default {
  name: 'marqueeSettings',
  title: 'მორბენალი სტრიქონი',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'სტრიქონის ტექსტი',
      type: 'string',
      description: 'ჩაწერეთ ტექსტი, რომელიც იმოძრავებს საიტის თავში'
    },
    {
      name: 'isActive',
      title: 'გამოჩნდეს სტრიქონი?',
      type: 'boolean',
      initialValue: true
    }
  ]
}