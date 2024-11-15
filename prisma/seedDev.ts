import {Meeting, Prisma, PrismaClient, Tag} from '@prisma/client'
import {fakerNL_BE} from '@faker-js/faker'

export const seedDev = async (prisma: PrismaClient) => {
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      // Het wachtwoord is test123test
      username: 'Demo user',
      password:
        '600000$64$5ee216d27306e5093b168627b4f65f20ea21d44232ff7ea9869b2819c807ae94083783247a154ed29c8bcb6dfcfb414690cf7dbd16660090f46e115bae682fec$f0a3397fe6a343c7f11449e4b16a42522478f96e9b80d54d9978519c0956915d',
    },
  })

  const contacts: Prisma.ContactCreateManyInput[] = []

  for (let i = 0; i < 10; i++) {
    const firstName = fakerNL_BE.person.firstName()
    const lastName = fakerNL_BE.datatype.boolean() ? fakerNL_BE.person.lastName() : null
    const description = fakerNL_BE.lorem.sentence()

    const contactInfoMap: Record<string, () => string> = {
      email: () => fakerNL_BE.internet.email({firstName: firstName, lastName: lastName ?? undefined}),
      phone: () => fakerNL_BE.phone.number(),
      address: () =>
        fakerNL_BE.location.streetAddress() + ' ' + fakerNL_BE.location.zipCode() + ' ' + fakerNL_BE.location.city(),
      'work phone': () => fakerNL_BE.phone.number(),
      'work email': () => fakerNL_BE.internet.email({firstName: firstName, lastName: lastName ?? undefined}),
      'work place': () => fakerNL_BE.company.name(),
      'job title': () => fakerNL_BE.person.jobTitle(),
    }

    contacts.push({
      id: fakerNL_BE.string.uuid(),
      firstName,
      lastName,
      description,
      avatar: `https://ui-avatars.com/api/?name=${firstName}`,
      contactInfo: Object.keys(contactInfoMap)
        .filter(() => fakerNL_BE.datatype.boolean())
        .map(type => ({value: contactInfoMap[type](), type})),
      userId: user.id,
    })
  }

  const createdContacts = await prisma.contact.createManyAndReturn({data: contacts})
  const createdTags: Promise<Tag>[] = []

  for (const name of ['Family', 'Friends', 'Work', 'School', 'Acquaintances']) {
    createdTags.push(
      prisma.tag.create({
        data: {
          name,
          userId: user.id,
          contacts: {
            connect: fakerNL_BE.helpers.arrayElements(createdContacts, fakerNL_BE.number.int({min: 0, max: 4})).map(contact => ({id: contact.id})),
          }
        },
      }),
    )
  }

  const createdMeetings: Promise<Meeting>[] = []
  for (let i = 0; i < 10; i++) {
    const date = fakerNL_BE.date.recent()
    createdMeetings.push(
      prisma.meeting.create({
        data: {
          id: fakerNL_BE.string.uuid(),
          title: fakerNL_BE.lorem.sentence(),
          description: fakerNL_BE.lorem.paragraph(),
          date: date,
          contactId: fakerNL_BE.helpers.arrayElement(createdContacts).id,
          userId: user.id,
        },
      }),
    )
  }

  await Promise.all([createdTags, createdMeetings])
}
