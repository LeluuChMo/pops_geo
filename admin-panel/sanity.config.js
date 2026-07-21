import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export default defineConfig({
  name: 'default',
  title: 'poppers.ge',

  projectId: '156rdx1d',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('კონტენტი')
          .items([
            orderableDocumentListDeskItem({
              type: 'catalogProduct',
              title: 'პროდუქტების რიგითობა (Drag & Drop)',
              S,
              context
            }),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'catalogProduct'
            )
          ])
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes
  }
})