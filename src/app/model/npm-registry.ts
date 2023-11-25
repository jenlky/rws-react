export interface NpmObject {
  flags?: object
  package: Package
  score?: object
  searchScore?: string
}

export interface Author {
  name: string
}

export interface Package {
  author: Author
  date: string
  description?: string
  keywords?: string[]
  links?: object
  maintainers?: object[]
  name: string
  publisher?: object
  scope?: string
  version?: string
}
