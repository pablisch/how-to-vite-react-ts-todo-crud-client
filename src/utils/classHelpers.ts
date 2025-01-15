import { itemClassesObject, IsHoveredObject } from '../types/types.ts'

const defaultClasses: itemClassesObject = {
  item: ['item-panel'],
  view: ['btn', 'item-btn', 'unfocussed-item-btn'],
  create: ['btn', 'item-btn', 'btn-space-above', 'unfocussed-item-btn'],
  update: ['btn', 'item-btn', 'btn-space-above', 'unfocussed-item-btn'],
  delete: ['btn', 'item-btn', 'btn-space-above', 'unfocussed-item-btn'],
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
        ...(isFocussed ? ['view-btn-focus', 'focus-item-btn'] : []),
        ...(isFocussed && isHovered.view
          ? ['hover-focus-view-item-btn', 'hover-focus-item-btn']
          : []),
      ],
      create: [
        ...defaultClasses.create,
        ...(isHovered.create ? ['create-btn-hover', 'hover'] : []),
        ...(isFocussed ? ['create-btn-focus', 'focus-item-btn'] : []),
        ...(isFocussed && isHovered.create
          ? ['hover-focus-create-item-btn', 'hover-focus-item-btn']
          : []),
      ],
      delete: [
        ...defaultClasses.delete,
        ...(isHovered.delete ? ['delete-btn-hover', 'hover'] : []),
        ...(isFocussed ? ['delete-btn-focus', 'focus-item-btn'] : []),
        ...(isFocussed && isHovered.delete
          ? ['hover-focus-delete-item-btn', 'hover-focus-item-btn']
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
            ? ['update-patch-btn-focus', 'focus-item-btn']
            : ['update-put-btn-focus', 'focus-item-btn']
          : []),
        ...(isFocussed && isHovered.update
          ? isPatchUpdate
            ? ['hover-focus-patch-item-btn', 'hover-focus-item-btn']
            : ['hover-focus-put-item-btn', 'hover-focus-item-btn']
          : []),
      ],
    }
  },
}
