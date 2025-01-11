import { itemClassesObject, IsHoveredObject } from '../types/types.ts'

const defaultClasses: itemClassesObject = {
  item: ['item-panel'],
  view: ['btn', 'item-btn', 'inactive-item-btn'],
  create: ['btn', 'item-btn', 'btn-space-above', 'inactive-item-btn'],
  update: ['btn', 'item-btn', 'btn-space-above', 'inactive-item-btn'],
  delete: ['btn', 'item-btn', 'btn-space-above', 'inactive-item-btn'],
}

export default {
  getClassNamesForListItems: function (
    isFocussed: boolean,
    isHovered: IsHoveredObject,
    isPatchUpdate: boolean
  ) {
    return {
      item: [
        ...defaultClasses.item,
        isHovered.item ? 'item-panel-hover' : '',
        isFocussed ? 'item-panel-focus' : '',
      ],
      view: [
        ...defaultClasses.view,
        ...(isHovered.view ? ['view-btn-hover', 'hover'] : []),
        ...(isFocussed ? ['view-btn-focus', 'focus'] : []),
        ...(isFocussed && isHovered.view
          ? ['view-btn-focus-hover', 'btn-focus-hover']
          : []),
      ],
      create: [
        ...defaultClasses.create,
        ...(isHovered.create ? ['create-btn-hover', 'hover'] : []),
        ...(isFocussed ? ['create-btn-focus', 'focus'] : []),
        ...(isFocussed && isHovered.create
          ? ['create-btn-focus-hover', 'btn-focus-hover']
          : []),
      ],
      delete: [
        ...defaultClasses.delete,
        ...(isHovered.delete ? ['delete-btn-hover', 'hover'] : []),
        ...(isFocussed ? ['delete-btn-focus', 'focus'] : []),
        ...(isFocussed && isHovered.delete
          ? ['delete-btn-focus-hover', 'btn-focus-hover']
          : []),
      ],
      update: [
        ...defaultClasses.update,
        ...(isHovered.update
          ? isPatchUpdate
            ? ['update-patch-btn-hover', 'hover']
            : ['update-put-btn-hover', 'hover']
          : []),
        ...(isFocussed
          ? isPatchUpdate
            ? ['update-patch-btn-focus', 'focus']
            : ['update-put-btn-focus', 'focus']
          : []),
        ...(isFocussed && isHovered.update
          ? isPatchUpdate
            ? ['update-patch-btn-focus-hover', 'btn-focus-hover']
            : ['update-put-btn-focus-hover', 'btn-focus-hover']
          : []),
      ],
    }
  },
}
