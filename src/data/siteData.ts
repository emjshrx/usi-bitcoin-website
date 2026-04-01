import config from "./config.json";
import localeIt from "./site.json";
import localeEn from "./site.en.json";

type LocaleSite = typeof localeIt;

function assertSameLength(a: unknown[], b: unknown[], label: string) {
  if (a.length !== b.length) {
    throw new Error(
      `[siteData] ${label}: locale has ${a.length} entries, config has ${b.length}. Keep arrays aligned.`,
    );
  }
}

/** Merge locale copy with shared URLs and asset paths from `config.json`. */
export function mergeSite(locale: LocaleSite) {
  assertSameLength(locale.social.links, config.social.links, "social.links");
  assertSameLength(locale.partners.items, config.partners.items, "partners.items");
  assertSameLength(locale.team.members, config.team.members, "team.members");
  assertSameLength(
    locale.cosaFacciamo.events,
    config.cosaFacciamo.events,
    "cosaFacciamo.events",
  );

  return {
    ...locale,
    brand: config.brand,
    images: config.images,
    report: {
      ...locale.report,
      url: config.report.url,
      coverImage: config.report.coverImage,
    },
    join: {
      ...locale.join,
      joinUrl: config.join.joinUrl,
      email: config.join.email,
      qrImage: config.join.qrImage,
    },
    social: {
      ...locale.social,
      links: locale.social.links.map((link, i) => ({
        label: link.label,
        url: config.social.links[i].url,
      })),
    },
    joinTeam: { ...locale.joinTeam, url: config.joinTeam.url },
    cosaFacciamo: {
      ...locale.cosaFacciamo,
      events: locale.cosaFacciamo.events.map((ev, i) => ({
        ...ev,
        image: config.cosaFacciamo.events[i].image,
      })),
    },
    partners: {
      ...locale.partners,
      items: locale.partners.items.map((item, i) => ({
        ...item,
        url: config.partners.items[i].url,
        logo: config.partners.items[i].logo,
      })),
    },
    team: {
      ...locale.team,
      members: locale.team.members.map((m, i) => ({
        ...m,
        photo: config.team.members[i].photo,
        linkedinUrl: config.team.members[i].linkedinUrl,
      })),
    },
  };
}

export const siteIt = mergeSite(localeIt);
export const siteEn = mergeSite(localeEn);

export type SiteData = ReturnType<typeof mergeSite>;
