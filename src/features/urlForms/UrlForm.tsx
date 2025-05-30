import React, { useEffect, useState } from 'react'
import { useSettings } from '../../hooks/useSettings.tsx'
import HoverButton from '../../components/HoverButton.tsx'
import SaveButton from '../../components/SaveButton.tsx'
import { SavedUrlsObject, urlSections } from '../../types/types.ts'
import SavedUrlSelector from '../../components/SavedUrlSelector.tsx'
// import { useSave } from '../../hooks/useSave.tsx'

interface UrlFormProps {
  id: string
  title: string
  placeholder: string
  defaultUrlValue: string
  isDefaultUrlValue: boolean
  onSetUrl: (value: string) => void
  onResetUrl: () => void
  setUrlBtnText: string
  resetUrlBtnText: string
  additionalButtons?: Array<{
    text: string
    onClick: () => void
    classNames?: string[]
    id: string
    ariaLabel?: string
  }>
  saveAlt: string
  onSave: (
    value: string,
    section: keyof urlSections | keyof SavedUrlsObject
  ) => void
  saveClasses?: string[]
  value: string | undefined
  section: keyof urlSections | keyof SavedUrlsObject
  isDisabled: boolean
}

const UrlForm: React.FC<UrlFormProps> = ({
  id = '',
  title,
  placeholder,
  defaultUrlValue,
  isDefaultUrlValue,
  onSetUrl,
  onResetUrl,
  setUrlBtnText,
  resetUrlBtnText,
  additionalButtons = [],
  saveAlt,
  onSave,
  saveClasses,
  value,
  section,
  isDisabled,
}) => {
  const [inputValue, setInputValue] = useState(defaultUrlValue)

  const { settings } = useSettings()
  // const { savedUrls } = useSave()

  const setUrlDisabled: boolean = inputValue === defaultUrlValue

  useEffect(() => {
    setInputValue(defaultUrlValue)
  }, [defaultUrlValue])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    console.log(
      '****()** - AVOID ERRORS - settings:',
      JSON.stringify(settings, null, 2)
    )
  }

  useEffect(() => {
    if (settings.setUrlOnChange) {
      onSetUrl(inputValue)
    }
  }, [inputValue])

  // // Validate savedUrls[section] is a string array
  // const isStringArray = (data: unknown): data is string[] =>
  //   Array.isArray(data) && data.every(item => typeof item === 'string')
  //
  // const filteredUrls = isStringArray(savedUrls[section]) ? savedUrls[section] : []

  return (
    <div id={`${id}-form`} className="url-form">
      <div className="form-title-wrapper">
        <h1 id={`${id}-title`} className="url-form-title">
          {title}
        </h1>
      </div>
      <div className="form-input-wrapper flex-container">
        <input
          id={`${id}-input`}
          className="url-input url-input-text"
          list="data"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        {/*<input type="text" list="data"*/}
        {/*       // onChange={}*/}
        {/*/>*/}

        {/*<datalist id="data">*/}
        {/*  {filteredUrls.map(item =>*/}
        {/*    <option value={item} />*/}
        {/*  )}*/}
        {/*</datalist>*/}
        <SavedUrlSelector
          alt={saveAlt}
          onSave={onSave}
          classNames={saveClasses}
          value={value}
          section={section}
          isDisabled={isDisabled}
        />
        <SaveButton
          alt={saveAlt}
          onSave={onSave}
          classNames={saveClasses}
          value={value}
          section={section}
          isDisabled={isDisabled}
        />
        <div className="url-btn-container">
          {!settings.setUrlOnChange && (
            <HoverButton
              ariaLabel={`set ${id}`}
              id={`set-${id}-btn`}
              onClick={() => onSetUrl(inputValue)}
              classNames={['btn', 'url-btn', setUrlDisabled ? 'disabled' : '']}
              disabled={setUrlDisabled}
            >
              {setUrlBtnText}
            </HoverButton>
          )}
          <HoverButton
            ariaLabel={`reset ${id}`}
            id={`reset-${id}-btn`}
            onClick={onResetUrl}
            classNames={['btn', 'url-btn', isDefaultUrlValue ? 'disabled' : '']}
            disabled={isDefaultUrlValue}
          >
            {resetUrlBtnText}
          </HoverButton>
          {additionalButtons.map((button, index) => (
            <HoverButton
              key={index}
              ariaLabel={button.ariaLabel}
              id={button.id}
              onClick={button.onClick}
              classNames={button.classNames || ['btn', 'url-btn']}
            >
              {button.text}
            </HoverButton>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UrlForm
