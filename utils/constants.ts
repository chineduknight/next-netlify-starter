export const defaultSingleObjectState: SingleObjectState = {
  processing: false,
  processed: false,
  success: false,
  errors: {},
  data: {},
  message: "",
};

export const defaultSingleObjectPayload = {
  data: {} as GenericRecord,
  errors: {},
};

export const defaultManyObjectPayload = {
  data: [],
  errors: [],
  paginationMeta: {
    currentPage: 0,
    nextPage: null,
    previousPage: null,
    totalObjects: 0,
    totalPages: 0,
    maxObjectsPerPage: 0,
  },
};

export const defaultManyObjectState: ManyObjectState = {
  processing: false,
  processed: false,
  success: false,
  errors: {},
  data: [],
  message: "",
};

export const defaultPaginatedObjectState: ManyObjectState = {
  ...defaultManyObjectState,
  paginationMeta: {
    currentPage: 0,
    nextPage: null,
    previousPage: null,
    totalObjects: 0,
    totalPages: 0,
    maxObjectsPerPage: 0,
  },
};



export const MassParts = [
  "Lord have mercy",
  "Glory be to God",
  "I believe in God",
  "Holy Holy Holy",
  "Lord Have Mercy",
]
export const seasons = [
  "Easter",
  "Lent",
  "Christmas",
  "Classical",
]
export const languages = [
  "Igbo",
  "Yoruba",
  "Hausa",
  "Other Lang",
]

export const AUDIO_FILE_OPTIONS = [".mp3", ".wav", ".ogg"];