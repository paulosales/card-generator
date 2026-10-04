/** Shape every locale resource file must satisfy — enforced at compile time. */
export interface FieldText {
  label: string
  placeholder?: string
  hint?: string
}

export interface SectionText {
  title: string
  description: string
}

export interface TemplateText {
  label: string
  description: string
}

export interface AppTranslations {
  header: {
    title: string
    subtitle: string
  }
  languageSwitcher: {
    label: string
  }
  nav: {
    design: string
    view: string
  }
  common: {
    cancel: string
    save: string
    close: string
    copy: string
    copied: string
    download: string
    share: string
    edit: string
    preview: string
    reset: string
    remove: string
    optional: string
    loading: string
  }
  design: {
    heading: string
    subtitle: string
    sections: {
      personal: SectionText
      contact: SectionText
      social: SectionText
      photo: SectionText
      qr: SectionText
      appearance: SectionText
    }
    fields: {
      fullName: FieldText
      jobTitle: FieldText
      company: FieldText
      email: FieldText
      phone: FieldText
      whatsapp: FieldText
      website: FieldText
      address: FieldText
      linkedin: FieldText
      instagram: FieldText
      twitter: FieldText
      github: FieldText
      facebook: FieldText
      primaryColor: FieldText
      secondaryColor: FieldText
      fontFamily: FieldText
      template: FieldText
    }
    photo: {
      upload: string
      change: string
      remove: string
      hint: string
      tooLarge: string
      invalidType: string
    }
    qr: {
      enable: string
      valueLabel: string
      valuePlaceholder: string
      hint: string
      useShareLink: string
    }
    resetButton: string
    resetConfirm: string
    previewButton: string
  }
  templates: {
    classic: TemplateText
    minimalist: TemplateText
    modernGradient: TemplateText
    corporate: TemplateText
    creativeDiagonal: TemplateText
    darkElegant: TemplateText
    neonTech: TemplateText
    pastelSoft: TemplateText
    geometricBold: TemplateText
    luxuryGold: TemplateText
  }
  fonts: {
    system: string
    helvetica: string
    georgia: string
    verdana: string
    mono: string
  }
  share: {
    button: string
    title: string
    description: string
    linkLabel: string
    copyLink: string
    copied: string
    scanHint: string
    sizeWarning: string
    openInNewTab: string
  }
  view: {
    emptyTitle: string
    emptyDescription: string
    createCta: string
    editButton: string
    saveContactButton: string
    savedToast: string
    importedToast: string
    invalidLinkToast: string
    offlineReady: string
  }
  install: {
    prompt: string
    installNow: string
    dismiss: string
    installedBadge: string
  }
  toast: {
    copyLinkSuccess: string
    copyLinkError: string
  }
  footer: {
    tagline: string
    privacyNote: string
  }
}
