import { z } from 'zod'

const createCommonErrorMap = (fieldName: string) => (issue: z.ZodIssueOptionalMessage) => {
  switch (issue.code) {
    case 'invalid_type':
    case 'invalid_enum_value':
      return { message: `Please select a valid ${fieldName}!` };
    default:
      return { message: 'Error' };
  }
};

export const registerSchema = z.object({
  fullName: z.string().min(2).max(100),
  nameBiB: z.string().min(2).max(100),
  identityNumber: z.string().min(2).max(100),
  birthDate: z.object({
    startDate: z.union([
      z.string(),
      z.null(),
      z.date(),
    ]),
    endDate: z.union([
      z.string(),
      z.null(),
      z.date(),
    ])
  }, {
    errorMap: createCommonErrorMap('date')
  }),
  gender: z.object({ value: z.string(), label: z.string() }, {
    errorMap: createCommonErrorMap('option')
  }),
  bloodType: z.object({ value: z.string(), label: z.string() }, {
    errorMap: createCommonErrorMap('option')
  }),
  sizeJersey: z.object({ value: z.string(), label: z.string() }, {
    errorMap: createCommonErrorMap('option')
  }),
  categories: z.object({ value: z.string(), label: z.string() }, {
    errorMap: createCommonErrorMap('option')
  }),
  emergencyContactName: z.string().nonempty(),
  emergencyContactPhone: z.string().nonempty().max(15),
  city: z.string().nonempty(),
  phone: z.string().nonempty().max(15),
  national: z.string().nonempty(),
  email: z.string().email().nonempty(),
  covidVaccine: z.string().nonempty()
})

export const statusScheme = z.object({
  noRegistration: z.string().nonempty(),
  email: z.string().email().nonempty()
})

export const settingHeaderScheme = z.object({
  textWhite: z.string().nonempty(),
  textRed: z.string().nonempty(),
  location: z.string().nonempty(),
  regency: z.string().nonempty(),
  state: z.string().nonempty(),
  date: z.string().nonempty(),
  time: z.string().nonempty(),
});

export const settingCategoriesScheme = z.object({
  distance: z.string().nonempty(),
  name: z.string().nonempty(),
  price: z.coerce.number({
    errorMap: createCommonErrorMap('value')
  })
});

export type TRegisterSchema = z.infer<typeof registerSchema>;
export type TStatusScheme = z.infer<typeof statusScheme>;
export type TSettingHeaderScheme = z.infer<typeof settingHeaderScheme>;
export type TSettingCategoriesScheme = z.infer<typeof settingCategoriesScheme>;

export const settingSponsorScheme = z.object({
  title: z.string().nonempty(),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'), {
      message: 'File harus berupa gambar.',
    })
    .refine((file) => file.size <= 1048576, {
      message: 'File harus kurang dari 1 MB.',
    }),
});

export type TSettingSponsorScheme = z.infer<typeof settingSponsorScheme>;

export const settingSponsorEditScheme = z.object({
  _method: z.string().optional(),
  title: z.string().nonempty(),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'), {
      message: 'File harus berupa gambar.',
    })
    .refine((file) => file.size <= 1048576, {
      message: 'File harus kurang dari 1 MB.',
    }).optional(),
});

export type TSSponsorSchemeEdit = z.infer<typeof settingSponsorEditScheme>;

export const UserSceme = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  name: z.string().nonempty(),
  phone: z.string().nonempty(),
});

export type TUserScheme = z.infer<typeof UserSceme>;

export const EditUserSceme = z.object({
  username: z.string().nonempty(),
  password: z.string().optional(),
  name: z.string().nonempty(),
  phone: z.string().nonempty(),
});

export type TEditUserScheme = z.infer<typeof EditUserSceme>;

export const loginSceme = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

export type TLoginScheme = z.infer<typeof loginSceme>;

export const contactScheme = z.object({
  nama_contact: z.string().nonempty(),
  no_whatapp: z.string().nonempty(),
});

export type TContactScheme = z.infer<typeof contactScheme>;

export const bankScheme = z.object({
  nama_bank: z.string().nonempty(),
  rekening: z.string().nonempty(),
  an: z.string().nonempty(),
});

export type TBankScheme = z.infer<typeof bankScheme>;

export const otherSettingScheme = z.object({
  keterangan: z.string().nonempty(),
  value: z.string().nonempty(),
});

export type TOtherSettingScheme = z.infer<typeof otherSettingScheme>;

export const canvaScheme = z.object({
  canva_inframe: z.string().nonempty(),
});

export type TCanvaSheme = z.infer<typeof canvaScheme>;

export type TDateValue = {
  startDate: string | null | Date,
  endDate: string | null | Date
}

export type TSelectValue = {
  value: string,
  label: string
}

export type TThemeHeader = {
  id: number,
  event_name_white: string,
  event_name_red: string,
  location: string,
  regency: string,
  state: string,
  date: string,
  time: string,
}

export type TThemeCategories = {
  id: string,
  distance: string,
  price: number,
  name: string,
}

export type TThemeSponsorship = {
  id: string,
  title: string,
  image: File,
}

export type TItemId = string | number

export type TRegistration = {
  id: string,
  registration_number: string,
  full_name: string,
  bib_name: string,
  identity_number: string,
  date_of_birth: Date | string,
  gender: string,
  bood_type: string,
  size_jersey: string,
  emergency_contact_name: string,
  emergency_contact_phone: string,
  phone: string,
  regency: string,
  state: string,
  email: string,
  covid_vaccine: string,
  status: string,
  category: TThemeCategories
}

export type TDashboardCard = {
  verified: number | string;
  unverified: number | string;
  total: number | string;
}
