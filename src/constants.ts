enum ERRORS {
  NoDomainError = "You must enter a domain.",
  DomainParseError = "Error parsing the domain.",
  UnknownTLD = 'Unable to find the top level domain.',
  RDAPError = 'Error making RDAP request.',
  RDAPResponseEmpty = 'RDAP request returned no value.',
}

export { ERRORS }