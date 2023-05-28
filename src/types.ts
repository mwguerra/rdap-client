export type DomainExtension = string
export type RDAPServer = string
export type TLDData = [DomainExtension[], RDAPServer[]]

export interface DNSList {
  description: string;
  publication: string;
  services: [string[], string[]];
  version: string;
}

export interface RdapLink {
  value: string
  rel: string
  href: string
  hreflang?: string[];
  type?: string
  media?: string;
  title?: string;
}

type RdapStatus =
  | "validated"
  | "renew prohibited"
  | "update prohibited"
  | "transfer prohibited"
  | "delete prohibited"
  | "proxy"
  | "private"
  | "removed"
  | "obscured"
  | "associated"
  | "active"
  | "inactive"
  | "locked"
  | "pending create"
  | "pending renew"
  | "pending transfer"
  | "pending update"
  | "pending delete";

type RdapNoticeAndRemarkTypes =
  | "result set truncated due to authorization"
  | "result set truncated due to excessive load"
  | "result set truncated due to unexplainable reasons"
  | "object truncated due to authorization"
  | "object truncated due to excessive load"
  | "object truncated due to unexplainable reasons";
export interface RdapNotice {
  title?: string
  type?: RdapNoticeAndRemarkTypes;
  description: string[]
  links?: RdapLink[]
}
export interface RdapEvent {
  eventAction: string
  eventDate: string
  eventActor?: string
  status?: RdapStatus[]
  links?: RdapLink[];
}
export interface RdapNameserver {
  objectClassName: string;
  handle?: string;
  ldhName?: string;
  unicodeName?: string;
  ipAddresses?: {
    v6?: string[];
    v4: string[];
  };
  entities?: RdapEntity[];
  status?: RdapStatus[];
  remarks?: RdapNotice[];
  links?: RdapLink[];
  port43?: string;
  events?: RdapEvent[];
}
export interface PublicId { type: string, identifier: string }
export interface RdapEntity {
  objectClassName: string
  handle?: string
  vcardArray?: [
    string,
    Array<[ string, object, string, string ] | [ string, object, string, string[] ]>
  ],
  roles: string[]
  publicIds: PublicId[]
  entities: RdapEntity[]
  events: RdapEvent[]
  links: RdapLink[]
  legalRepresentative: string
}

export interface RdapRawResponse {
  objectClassName: string
  handle: string
  ldhName: string
  nameservers: RdapNameserver[]
  secureDNS: { delegationSigned: boolean }
  links: RdapLink[]
  entities: RdapEntity[]
  events: RdapEvent[]
  status: RdapStatus[]
  notices: RdapNotice[]
  rdapConformance: string[]
  port43: string
}
