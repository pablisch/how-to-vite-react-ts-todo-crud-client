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
        isHovered.item ? 'hover-item-panel' : '',
        isFocussed ? 'focus-item-panel' : '',
      ],
      view: [
        ...defaultClasses.view,
        ...(isHovered.view ? ['hover-view-item-btn', 'hover-item-btns'] : []),
        ...(isFocussed ? ['focus-view-item-btn', 'focus-item-btns'] : []),
        ...(isFocussed && isHovered.view
          ? ['hover-focus-view-item-btn', 'hover-focus-item-btns']
          : []),
      ],
      create: [
        ...defaultClasses.create,
        ...(isHovered.create ? ['hover-create-item-btn', 'hover-item-btns'] : []),
        ...(isFocussed ? ['focus-create-item-btn', 'focus-item-btns'] : []),
        ...(isFocussed && isHovered.create
          ? ['hover-focus-create-item-btn', 'hover-focus-item-btns']
          : []),
      ],
      delete: [
        ...defaultClasses.delete,
        ...(isHovered.delete ? ['hover-delete-item-btn', 'hover-item-btns'] : []),
        ...(isFocussed ? ['focus-delete-item-btn', 'focus-item-btns'] : []),
        ...(isFocussed && isHovered.delete
          ? ['hover-focus-delete-item-btn', 'hover-focus-item-btns']
          : []),
      ],
      update: [
        ...defaultClasses.update,
        ...(isHovered.update
          ? isPatchUpdate
            ? ['hover-patch-item-btn', 'hover-item-btns']
            : ['hover-put-item-btn', 'hover-item-btns']
          : []),
        ...(isFocussed
          ? isPatchUpdate
            ? ['focus-patch-item-btn', 'focus-item-btns']
            : ['focus-put-item-btn', 'focus-item-btns']
          : []),
        ...(isFocussed && isHovered.update
          ? isPatchUpdate
            ? ['hover-focus-patch-item-btn', 'hover-focus-item-btns']
            : ['hover-focus-put-item-btn', 'hover-focus-item-btns']
          : []),
      ],
    }
  },
}
