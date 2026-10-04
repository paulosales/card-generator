import { useTranslation } from 'react-i18next'
import { FONT_OPTIONS } from '../../data/templates'
import type { CardData, SocialLinks } from '../../types'
import { AccordionSection } from './AccordionSection'
import { ColorField } from './fields/ColorField'
import { PhotoUploadField } from './fields/PhotoUploadField'
import { SelectField } from './fields/SelectField'
import { TextField } from './fields/TextField'
import { ToggleField } from './fields/ToggleField'
import { TemplatePicker } from './TemplatePicker'

interface CardFormProps {
  card: CardData
  onFieldChange: <K extends keyof CardData>(field: K, value: CardData[K]) => void
  onSocialChange: <K extends keyof SocialLinks>(field: K, value: string) => void
  onQrChange: <K extends keyof CardData['qr']>(field: K, value: CardData['qr'][K]) => void
  shareUrl: string
}

export function CardForm({ card, onFieldChange, onSocialChange, onQrChange, shareUrl }: CardFormProps) {
  const { t } = useTranslation()

  return (
    <form className="flex flex-col gap-4" aria-label={t('design.heading')} onSubmit={(e) => e.preventDefault()}>
      <AccordionSection
        title={t('design.sections.personal.title')}
        description={t('design.sections.personal.description')}
        defaultOpen
      >
        <TextField
          label={t('design.fields.fullName.label')}
          name="fullName"
          value={card.fullName}
          onChange={(value) => onFieldChange('fullName', value)}
          placeholder={t('design.fields.fullName.placeholder')}
          required
        />
        <TextField
          label={t('design.fields.jobTitle.label')}
          name="jobTitle"
          value={card.jobTitle}
          onChange={(value) => onFieldChange('jobTitle', value)}
          placeholder={t('design.fields.jobTitle.placeholder')}
        />
        <TextField
          label={t('design.fields.company.label')}
          name="company"
          value={card.company}
          onChange={(value) => onFieldChange('company', value)}
          placeholder={t('design.fields.company.placeholder')}
        />
      </AccordionSection>

      <AccordionSection
        title={t('design.sections.contact.title')}
        description={t('design.sections.contact.description')}
        defaultOpen
      >
        <TextField
          label={t('design.fields.email.label')}
          name="email"
          type="email"
          value={card.email}
          onChange={(value) => onFieldChange('email', value)}
          placeholder={t('design.fields.email.placeholder')}
        />
        <TextField
          label={t('design.fields.phone.label')}
          name="phone"
          type="tel"
          value={card.phone}
          onChange={(value) => onFieldChange('phone', value)}
          placeholder={t('design.fields.phone.placeholder')}
        />
        <TextField
          label={t('design.fields.whatsapp.label')}
          name="whatsapp"
          type="tel"
          value={card.whatsapp}
          onChange={(value) => onFieldChange('whatsapp', value)}
          placeholder={t('design.fields.whatsapp.placeholder')}
        />
        <TextField
          label={t('design.fields.website.label')}
          name="website"
          type="url"
          value={card.website}
          onChange={(value) => onFieldChange('website', value)}
          placeholder={t('design.fields.website.placeholder')}
        />
        <TextField
          label={t('design.fields.address.label')}
          name="address"
          value={card.address}
          onChange={(value) => onFieldChange('address', value)}
          placeholder={t('design.fields.address.placeholder')}
        />
      </AccordionSection>

      <AccordionSection
        title={t('design.sections.social.title')}
        description={t('design.sections.social.description')}
      >
        <TextField
          label={t('design.fields.linkedin.label')}
          name="linkedin"
          type="url"
          value={card.social.linkedin}
          onChange={(value) => onSocialChange('linkedin', value)}
          placeholder={t('design.fields.linkedin.placeholder')}
        />
        <TextField
          label={t('design.fields.instagram.label')}
          name="instagram"
          type="url"
          value={card.social.instagram}
          onChange={(value) => onSocialChange('instagram', value)}
          placeholder={t('design.fields.instagram.placeholder')}
        />
        <TextField
          label={t('design.fields.twitter.label')}
          name="twitter"
          type="url"
          value={card.social.twitter}
          onChange={(value) => onSocialChange('twitter', value)}
          placeholder={t('design.fields.twitter.placeholder')}
        />
        <TextField
          label={t('design.fields.github.label')}
          name="github"
          type="url"
          value={card.social.github}
          onChange={(value) => onSocialChange('github', value)}
          placeholder={t('design.fields.github.placeholder')}
        />
        <TextField
          label={t('design.fields.facebook.label')}
          name="facebook"
          type="url"
          value={card.social.facebook}
          onChange={(value) => onSocialChange('facebook', value)}
          placeholder={t('design.fields.facebook.placeholder')}
        />
      </AccordionSection>

      <AccordionSection
        title={t('design.sections.photo.title')}
        description={t('design.sections.photo.description')}
      >
        <PhotoUploadField
          photo={card.photo}
          fullName={card.fullName}
          onChange={(photo) => onFieldChange('photo', photo)}
        />
      </AccordionSection>

      <AccordionSection title={t('design.sections.qr.title')} description={t('design.sections.qr.description')}>
        <ToggleField
          label={t('design.qr.enable')}
          checked={card.qr.enabled}
          onChange={(checked) => onQrChange('enabled', checked)}
        />
        <TextField
          label={t('design.qr.valueLabel')}
          name="qrValue"
          type="url"
          value={card.qr.value}
          onChange={(value) => onQrChange('value', value)}
          placeholder={t('design.qr.valuePlaceholder')}
          hint={t('design.qr.hint')}
        />
        <button
          type="button"
          onClick={() => onQrChange('value', shareUrl)}
          className="self-start text-xs font-medium text-blue-600 underline-offset-2 hover:underline sm:col-span-2"
        >
          {t('design.qr.useShareLink')}
        </button>
      </AccordionSection>

      <AccordionSection
        title={t('design.sections.appearance.title')}
        description={t('design.sections.appearance.description')}
      >
        <ColorField
          label={t('design.fields.primaryColor.label')}
          value={card.primaryColor}
          onChange={(value) => onFieldChange('primaryColor', value)}
        />
        <ColorField
          label={t('design.fields.secondaryColor.label')}
          value={card.secondaryColor}
          onChange={(value) => onFieldChange('secondaryColor', value)}
        />
        <SelectField
          label={t('design.fields.fontFamily.label')}
          value={card.fontFamily}
          onChange={(value) => onFieldChange('fontFamily', value as CardData['fontFamily'])}
          options={FONT_OPTIONS.map((font) => ({ value: font.id, label: t(font.labelKey) }))}
        />
        <TemplatePicker card={card} onSelect={(template) => onFieldChange('template', template)} />
      </AccordionSection>
    </form>
  )
}
