export default {
  name: 'footer',
  title: 'ფუტერის მართვა',
  type: 'document',
  fields: [
    { name: 'footerText', title: 'ლოგოს ქვედა ტექსტი', type: 'string' },
    { name: 'email', title: 'ელ-ფოსტა', type: 'string' },
    { name: 'phone', title: 'ტელეფონის ნომერი', type: 'string' },
    { name: 'facebook', title: 'Facebook ლინკი', type: 'url' },
    { name: 'instagram', title: 'Instagram ლინკი', type: 'url' },
    { name: 'tiktok', title: 'TikTok ლინკი', type: 'url' },
    { name: 'whatsapp', title: 'WhatsApp ლინკი', type: 'url' },
    { name: 'copyright', title: 'Copyright ტექსტი', type: 'string' }
  ]
}