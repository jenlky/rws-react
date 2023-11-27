export interface NpmObject {
  flags?: object
  package: Package
  score?: object
  searchScore?: string
}

export interface Author {
  name: string
}

export interface Repository {
  type: string
  url: string
}

export interface Package {
  author: Author
  date: string
  description?: string
  keywords?: string[]
  links?: object
  repository?: Repository
  homepage?: string
  maintainers?: object[]
  name: string
  publisher?: object
  scope?: string
  version?: string
}
