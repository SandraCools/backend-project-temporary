import {User, Bericht, Foto, Prisma, PrismaClient} from '@prisma/client'

export const seedDev = async (prisma: PrismaClient) => {
  const roles = await prisma.role.createManyAndReturn({
    data: [
      {name: 'admin'},
      {name: 'begeleider'},
      {name: 'gebruiker'},
    ],
  })

  const groepen = await prisma.groep.createManyAndReturn({
    data: [
      {naam: 'De Herberg'},
      {naam: 'De Samaritanen'},
      {naam: 'Atelier'},
      {naam: 'Camino'},
      {naam: 'Muziek'},
      {naam: 'De ster'},
      {naam: 'David'},
      {naam: 'De Ark'},
      {naam: 'Het Paradijs'},
      {naam: 'Apocalyps'},
    ],
  })

  const gemeenten = await prisma.gemeente.createManyAndReturn({
    data: [
      {naam: 'Mol', postcode: '2400'},
      {naam: 'Balen', postcode: '2490'},
      {naam: 'Olmen', postcode: '2491'},
      {naam: 'Geel', postcode: '2440'},
      {naam: 'Dessel', postcode: '2480'},
      {naam: 'Retie', postcode: '2470'},
      {naam: 'Lommel', postcode: '2400'},
      {naam: 'Turnhout', postcode: '3920'},
      {naam: 'Meerhout', postcode: '2450'},
      {naam: 'Kasterlee', postcode: '2460'},
    ],
  })

  const scholen = await prisma.school.createManyAndReturn({
    data: [
      {naam: 'Rozenberg', gemeenteId: gemeenten[0].id},
      {naam: 'De Bosmier', gemeenteId: gemeenten[0].id},
      {naam: 'SJB College', gemeenteId: gemeenten[0].id},
      {naam: 'Mozawiek', gemeenteId: gemeenten[0].id},
      {naam: 'VBS Balen', gemeenteId: gemeenten[1].id},
      {naam: 'De Puzzel', gemeenteId: gemeenten[1].id},
      {naam: 'GBS Ginderbuiten', gemeenteId: gemeenten[0].id},
      {naam: 'Klavertje Vier', gemeenteId: gemeenten[1].id},
      {naam: 'De Bijenkorf', gemeenteId: gemeenten[1].id},
      {naam: 'VBS Olmen', gemeenteId: gemeenten[2].id},
    ],
  })



  const users = await prisma.user.createManyAndReturn({
    data: [
      {
        voornaam: 'Sandra',
        familienaam: 'Cools',
        adres: 'Teststraat',
        huisnummer: '1',
        gemeenteId: gemeenten[0].id,
        schoolId: scholen[3].id,
        groepId: undefined,
        actief: true,
        roleId: roles[0].id,
        email: 'admin@example.com',
        // Het wachtwoord is Azerty123!
        username: 'sandra.cools',
        password:
          '600000$64$1b0d18aa9c4b64c067dcdbd5bd46f01b8b2320c32219b7e09ebab0e34d1fa64f1d57bd8ad477a1f98af8c2703aaccacbb7c7171d411ccb19ce4cc0adfaa1dc78$119eb92cd068d611e5655b82faaf5f77fff7d1103f91514adb6eeb863cab4835',
      },
      {
        voornaam: 'Arthur',
        familienaam: 'Baert',
        adres: 'Teststraat',
        huisnummer: '2',
        gemeenteId: gemeenten[0].id,
        schoolId: scholen[3].id,
        groepId: groepen[0].id,
        actief: true,
        roleId: roles[1].id,
        email: 'begeleider1@example.com',
        // Het wachtwoord is Azerty123!
        username: 'arthur.baert',
        password:
          '600000$64$1b0d18aa9c4b64c067dcdbd5bd46f01b8b2320c32219b7e09ebab0e34d1fa64f1d57bd8ad477a1f98af8c2703aaccacbb7c7171d411ccb19ce4cc0adfaa1dc78$119eb92cd068d611e5655b82faaf5f77fff7d1103f91514adb6eeb863cab4835',
      },
      {
        voornaam: 'Merel',
        familienaam: 'Berkmans',
        adres: 'Teststraat',
        huisnummer: '3',
        gemeenteId: gemeenten[0].id,
        schoolId: scholen[3].id,
        groepId: groepen[1].id,
        actief: true,
        roleId: roles[1].id,
        email: 'begeleider2@example.com',
        // Het wachtwoord is Azerty123!
        username: 'merel.berckmans',
        password:
          '600000$64$1b0d18aa9c4b64c067dcdbd5bd46f01b8b2320c32219b7e09ebab0e34d1fa64f1d57bd8ad477a1f98af8c2703aaccacbb7c7171d411ccb19ce4cc0adfaa1dc78$119eb92cd068d611e5655b82faaf5f77fff7d1103f91514adb6eeb863cab4835',
      },
      {
        voornaam: 'Joris',
        familienaam: 'Bollen',
        adres: 'Teststraat',
        huisnummer: '4',
        gemeenteId: gemeenten[0].id,
        schoolId: scholen[3].id,
        groepId: groepen[2].id,
        actief: true,
        roleId: roles[1].id,
        email: 'begeleider3@example.com',
        // Het wachtwoord is Azerty123!
        username: 'joris.bollen',
        password:
          '600000$64$1b0d18aa9c4b64c067dcdbd5bd46f01b8b2320c32219b7e09ebab0e34d1fa64f1d57bd8ad477a1f98af8c2703aaccacbb7c7171d411ccb19ce4cc0adfaa1dc78$119eb92cd068d611e5655b82faaf5f77fff7d1103f91514adb6eeb863cab4835',
      },
      {
        voornaam: 'Tess',
        familienaam: 'Clee',
        adres: 'Gebruikerlaan',
        huisnummer: '1',
        gemeenteId: gemeenten[0].id,
        schoolId: scholen[3].id,
        groepId: groepen[0].id,
        actief: true,
        roleId: roles[2].id,
        email: 'gebruiker1@example.com',
        // Het wachtwoord is Azerty123!
        username: 'tess.clee',
        password:
          '600000$64$1b0d18aa9c4b64c067dcdbd5bd46f01b8b2320c32219b7e09ebab0e34d1fa64f1d57bd8ad477a1f98af8c2703aaccacbb7c7171d411ccb19ce4cc0adfaa1dc78$119eb92cd068d611e5655b82faaf5f77fff7d1103f91514adb6eeb863cab4835',
      },
      {
        voornaam: 'Lars',
        familienaam: 'De Bruyne',
        adres: 'Gebruikerlaan',
        huisnummer: '2',
        gemeenteId: gemeenten[0].id,
        schoolId: scholen[3].id,
        groepId: groepen[0].id,
        actief: true,
        roleId: roles[2].id,
        email: 'gebruiker2@example.com',
        // Het wachtwoord is test123test
        username: 'lars.debruyne',
        password:
          '600000$64$1b0d18aa9c4b64c067dcdbd5bd46f01b8b2320c32219b7e09ebab0e34d1fa64f1d57bd8ad477a1f98af8c2703aaccacbb7c7171d411ccb19ce4cc0adfaa1dc78$119eb92cd068d611e5655b82faaf5f77fff7d1103f91514adb6eeb863cab4835',
      },
      {
        voornaam: 'Alexander',
        familienaam: 'Deckers',
        adres: 'Gebruikerlaan',
        huisnummer: '3',
        gemeenteId: gemeenten[0].id,
        schoolId: scholen[3].id,
        groepId: groepen[1].id,
        actief: true,
        roleId: roles[2].id,
        email: 'gebruiker3@example.com',
        // Het wachtwoord is test123test
        username: 'alexander.deckers',
        password:
          '600000$64$1b0d18aa9c4b64c067dcdbd5bd46f01b8b2320c32219b7e09ebab0e34d1fa64f1d57bd8ad477a1f98af8c2703aaccacbb7c7171d411ccb19ce4cc0adfaa1dc78$119eb92cd068d611e5655b82faaf5f77fff7d1103f91514adb6eeb863cab4835',
      },
      {
        voornaam: 'Dries',
        familienaam: 'Geys',
        adres: 'Gebruikerlaan',
        huisnummer: '3',
        gemeenteId: gemeenten[0].id,
        schoolId: scholen[3].id,
        groepId: groepen[1].id,
        actief: true,
        roleId: roles[2].id,
        email: 'gebruiker4@example.com',
        // Het wachtwoord is test123test
        username: 'dries.geys',
        password:
          '600000$64$1b0d18aa9c4b64c067dcdbd5bd46f01b8b2320c32219b7e09ebab0e34d1fa64f1d57bd8ad477a1f98af8c2703aaccacbb7c7171d411ccb19ce4cc0adfaa1dc78$119eb92cd068d611e5655b82faaf5f77fff7d1103f91514adb6eeb863cab4835',
      },
      {
        voornaam: 'Daan',
        familienaam: 'Goris',
        adres: 'Gebruikerlaan',
        huisnummer: '4',
        gemeenteId: gemeenten[0].id,
        schoolId: scholen[3].id,
        groepId: groepen[2].id,
        actief: true,
        roleId: roles[2].id,
        email: 'gebruiker5@example.com',
        // Het wachtwoord is test123test
        username: 'daan.goris',
        password:
          '600000$64$1b0d18aa9c4b64c067dcdbd5bd46f01b8b2320c32219b7e09ebab0e34d1fa64f1d57bd8ad477a1f98af8c2703aaccacbb7c7171d411ccb19ce4cc0adfaa1dc78$119eb92cd068d611e5655b82faaf5f77fff7d1103f91514adb6eeb863cab4835',
      },
      {
        voornaam: 'Fil',
        familienaam: 'Hannes',
        adres: 'Gebruikerlaan',
        huisnummer: '5',
        gemeenteId: gemeenten[0].id,
        schoolId: scholen[3].id,
        groepId: groepen[2].id,
        actief: true,
        roleId: roles[2].id,
        email: 'gebruiker6@example.com',
        // Het wachtwoord is test123test
        username: 'fil.hannes',
        password:
          '600000$64$1b0d18aa9c4b64c067dcdbd5bd46f01b8b2320c32219b7e09ebab0e34d1fa64f1d57bd8ad477a1f98af8c2703aaccacbb7c7171d411ccb19ce4cc0adfaa1dc78$119eb92cd068d611e5655b82faaf5f77fff7d1103f91514adb6eeb863cab4835',
      },
    ],
  })

  const fotos = prisma.foto.createMany({
    data: [
      {
        url: 'https://www.pexels.com/photo/people-silhouette-during-sunset-853168/',
        uploadedAt: new Date(),
        gebruikerId: users[2].id,
      },
      {
        url: 'https://www.pexels.com/photo/silhouette-photography-of-group-of-people-jumping-during-golden-time-1000445/',
        uploadedAt: new Date(),
        gebruikerId: users[2].id,
      },
      {
        url: 'https://www.pexels.com/photo/smiling-women-and-men-sitting-on-green-grass-1231230/',
        uploadedAt: new Date(),
        gebruikerId: users[2].id,
      },
      {
        url: 'https://www.pexels.com/photo/people-taking-group-picture-3184398/',
        uploadedAt: new Date(),
        gebruikerId: users[4].id,
      },
      {
        url: 'https://www.pexels.com/photo/photo-of-people-near-wooden-table-3184418/',
        uploadedAt: new Date(),
        gebruikerId: users[4].id,
      },
      {
        url: 'https://www.pexels.com/photo/group-of-people-standing-indoors-3184396/',
        uploadedAt: new Date(),
        gebruikerId: users[5].id,
      },
      {
        url: 'https://www.pexels.com/photo/group-of-people-taking-photo-1963622/',
        uploadedAt: new Date(),
        gebruikerId: users[5].id,
      },
      {
        url: 'https://www.pexels.com/photo/men-s-white-button-up-dress-shirt-708440/',
        uploadedAt: new Date(),
        gebruikerId: users[5].id,
      },
      {
        url: 'https://www.pexels.com/photo/group-of-friends-walking-on-beach-shore-7148445/',
        uploadedAt: new Date(),
        gebruikerId: users[5].id,
      },
      {
        url: 'https://www.pexels.com/photo/multi-cultural-people-3184419/',
        uploadedAt: new Date(),
        gebruikerId: users[5].id,
      },
    ],
  })

  const berichten = [
    prisma.bericht.create({
      data: {
        onderwerp: `Onderwerp 1`,
        bericht: `Dit is bericht nummer 1`,
        verzondenOp: new Date(),
        gelezen: false,
        verzenderId: users[0].id,
        ontvangers: {
          connect: [
            {id: users[1].id},
            {id: users[2].id},
            {id: users[3].id},
          ],
        },
      },
    }),
    prisma.bericht.create({
      data: {
        onderwerp: `Onderwerp 2`,
        bericht: `Dit is bericht nummer 2`,
        verzondenOp: new Date(),
        gelezen: false,
        verzenderId: users[1].id,
        ontvangers: {
          connect: [
            {id: users[4].id},
            {id: users[5].id},
            {id: users[6].id},
            {id: users[7].id},
            {id: users[8].id},
            {id: users[9].id},
          ],
        },
      },
    }),
    prisma.bericht.create({
      data: {
        onderwerp: `Onderwerp 3`,
        bericht: `Dit is bericht nummer 3`,
        verzondenOp: new Date(),
        gelezen: false,
        verzenderId: users[1].id,
        ontvangers: {
          connect: [
            {id: users[4].id},
            {id: users[5].id},
            {id: users[6].id},
            {id: users[7].id},
            {id: users[8].id},
            {id: users[9].id},
          ],
        },
      },
    }),
    prisma.bericht.create({
      data: {
        onderwerp: `Onderwerp 4`,
        bericht: `Dit is bericht nummer 4`,
        verzondenOp: new Date(),
        gelezen: false,
        verzenderId: users[1].id,
        ontvangers: {
          connect: [
            {id: users[4].id},
            {id: users[5].id},
            {id: users[6].id},
            {id: users[7].id},
            {id: users[8].id},
            {id: users[9].id},
          ],
        },
      },
    }),
    prisma.bericht.create({
      data: {
        onderwerp: `Onderwerp 5`,
        bericht: `Dit is bericht nummer 5`,
        verzondenOp: new Date(),
        gelezen: false,
        verzenderId: users[1].id,
        ontvangers: {
          connect: [
            {id: users[4].id},
            {id: users[5].id},
            {id: users[6].id},
            {id: users[7].id},
            {id: users[8].id},
            {id: users[9].id},
          ],
        },
      },
    }),
    prisma.bericht.create({
      data: {
        onderwerp: `Onderwerp 6`,
        bericht: `Dit is bericht nummer 6`,
        verzondenOp: new Date(),
        gelezen: false,
        verzenderId: users[1].id,
        ontvangers: {
          connect: [
            {id: users[4].id},
            {id: users[5].id},
            {id: users[6].id},
            {id: users[7].id},
            {id: users[8].id},
            {id: users[9].id},
          ],
        },
      },
    }),
    prisma.bericht.create({
      data: {
        onderwerp: `Onderwerp 7`,
        bericht: `Dit is bericht nummer 7`,
        verzondenOp: new Date(),
        gelezen: false,
        verzenderId: users[1].id,
        ontvangers: {
          connect: [
            {id: users[4].id},
            {id: users[5].id},
            {id: users[6].id},
            {id: users[7].id},
            {id: users[8].id},
            {id: users[9].id},
          ],
        },
      },
    }),
    prisma.bericht.create({
      data: {
        onderwerp: `Onderwerp 8`,
        bericht: `Dit is bericht nummer 8`,
        verzondenOp: new Date(),
        gelezen: false,
        verzenderId: users[1].id,
        ontvangers: {
          connect: [
            {id: users[4].id},
            {id: users[5].id},
            {id: users[6].id},
            {id: users[7].id},
            {id: users[8].id},
            {id: users[9].id},
          ],
        },
      },
    }),
    prisma.bericht.create({
      data: {
        onderwerp: `Onderwerp 9`,
        bericht: `Dit is bericht nummer 9`,
        verzondenOp: new Date(),
        gelezen: false,
        verzenderId: users[1].id,
        ontvangers: {
          connect: [
            {id: users[4].id},
            {id: users[5].id},
            {id: users[6].id},
            {id: users[7].id},
            {id: users[8].id},
            {id: users[9].id},
          ],
        },
      },
    }),
    prisma.bericht.create({
      data: {
        onderwerp: `Onderwerp 10`,
        bericht: `Dit is bericht nummer 10`,
        verzondenOp: new Date(),
        gelezen: false,
        verzenderId: users[9].id,
        ontvangers: {
          connect: [
            {id: users[2].id},
          ],
        },
      },
    }),
  ]

  await Promise.all([berichten, fotos])
}
