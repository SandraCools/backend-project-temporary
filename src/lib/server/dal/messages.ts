import 'server-only'
import {Bericht, Prisma} from '@prisma/client'
import {prismaClient} from './utils/prismaClient'
import {BerichtMetInfo} from '@/lib/models/messages'


/**
 * Bericht(en) ophalen
 */
export async function getMessage(id: string): Promise<BerichtMetInfo> {
  return prismaClient.bericht.findUniqueOrThrow({
    where: {id},
    include: {
      verzender: {
        select: {
          voornaam: true,
          familienaam: true,
        },
      },
      ontvangers: {
        select: {
          voornaam: true,
          familienaam: true,
        },
      },
    }
  })
}
export async function getMessages(): Promise<BerichtMetInfo[]> {
  return prismaClient.bericht.findMany({
    orderBy: {verzondenOp: 'desc'},
    include: {
      verzender: {
        select: {
          voornaam: true,
          familienaam: true,
        },
      },
      ontvangers: {
        select: {
          voornaam: true,
          familienaam: true,
        },
      }
    }
  })
}
export async function getMessagesInbox(profileId: string): Promise<BerichtMetInfo[]> {
  return prismaClient.bericht.findMany({
    where: {
      ontvangers: {
        some: {
          id: profileId, // Enkel berichten waarbij het Id van de huidige gebruiker bij de ontvangers zit.
        },
      },
    },
    orderBy: {verzondenOp: 'desc'},
    include: {
      verzender: {
        select: {
          voornaam: true,
          familienaam: true,
        },
      },
      ontvangers: {
        select: {
          voornaam: true,
          familienaam: true,
        },
      }
    }
  })
}
export async function getMessagesSent(profileId: string): Promise<BerichtMetInfo[]> {
  return prismaClient.bericht.findMany({
    where: {
      verzenderId: profileId, // Enkel berichten waarbij het Id van de huidige gebruiker de verzenderId is.
    },
    orderBy: {verzondenOp: 'desc'},
    include: {
      verzender: {
        select: {
          voornaam: true,
          familienaam: true,
        },
      },
      ontvangers: {
        select: {
          voornaam: true,
          familienaam: true,
        },
      }
    }
  })
}

/**
 * Nieuw bericht maken
 * Gebruiker geeft zelf ontvanger(s) in, verzender wordt opgehaald uit het profiel van de ingelogde gebruiker.
 * VerzenderId moeten we apart meegeven, want de client weet anders niet welke Id hiervoor gebruikt moet worden..
 */
export interface  CreateBerichtParams extends Prisma.BerichtCreateWithoutVerzenderInput{
  userId: string
  ontvangerIds: string []
}
export async function createMessage({userId, ontvangerIds, ...bericht}: CreateBerichtParams): Promise<BerichtMetInfo> {
  return prismaClient.bericht.create({
    data: {
      ...bericht,
      verzender: {
        connect: { id: userId },
      },
      ontvangers: {
        connect: ontvangerIds.map(id => ({ id })),
      },
    },
    include: {
      verzender: {
        select: {
          voornaam: true,
          familienaam: true,
        },
      },
      ontvangers: {
        select: {
          voornaam: true,
          familienaam: true,
        },
      },
    }
  })
}

/**
 * Bericht verwijderen
 */
export async function deleteMessage(userId: string, id: string): Promise<void> {
  const bericht = await prismaClient.bericht.findUnique({
    where: { id },
    select: {
      verzenderId: true,
      ontvangers: true,
    },
  });
  if (bericht) {
    const isVerzenderOfOntvanger = userId === bericht.verzenderId || (bericht.ontvangers.find((o) => o.id === userId));
    const isAdmin = prismaClient.user.findUnique({where: {id: userId}}).role.name === 'admin';

    if(!isVerzenderOfOntvanger && !isAdmin) {
      throw new Error("U heeft geen toestemming om dit bericht te verwijderen.")
    }
    await prismaClient.bericht.delete({where: {id}})
  }
  throw new Error("Bericht niet gevonden.")
}

/**
 * Bericht updaten
 * De berichttekst en de verzender/ontvanger kunnen niet geupdatet worden.
 * Een bericht kan wel op gelezen/ongelezen gezet worden
 */
export async function toggleReadMessage({ id, gelezen }: { id: string, gelezen: boolean }): Promise<Bericht> {
  return await prismaClient.bericht.update({
    where: {id},
    data: {
      gelezen: !gelezen, // Toggle de gelezen status
    },
  });
}