'use server'

import DAL from '@dal'
import {redirect} from 'next/navigation'
import {Prisma} from '@prisma/client'
import {clearSessionCookie, getSessionId, setSessionCookie, verifyPassword} from '@serverUtils'
import {revalidatePath} from 'next/cache'
import {ActionResponse} from '@/lib/models/actions'
import {createUserSchema, loginSchema, updateUserSchema} from '@schemas'
import {formAction} from '@mediators'

export async function signInOrRegister(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
  if (formData.has('username')) {
    return formAction(createUserSchema, formData, async data => {
      const input = {
        ...data,
        username: `${data.voornaam}.${data.familienaam}`,
        gemeente: { connect: { id: data.gemeenteId } },
        school: { connect: { id: data.schoolId }},
      } as Prisma.UserCreateInput & {passwordConfirmation?: string}
      delete input.passwordConfirmation
      const profile = await DAL.createUser(input)

      // Een sessie aanmaken in de database is niet voldoende, we moeten de sessie ook doorgeven aan de gebruiker.
      // Hiervoor gebruiken we een cookie.
      const session = await DAL.startSession(profile.id)
      await setSessionCookie(session)

      // De gebruiker is ingelogd, dus redirecten we naar de berichtenpagina.
      redirect('/berichten')
    })
  }

  return formAction(loginSchema, formData, async data => {
    const user = await DAL.getUserByEmail(data?.email)

    const errorResponse = {
      errors: {errors: ['Geen gebruiker gevonden met deze combinatie van gebruikersnaam en wachtwoord.']},
      success: false,
    }
    if (!user) return errorResponse

    const isValidPassword = verifyPassword(user.password, data.password)
    if (!isValidPassword) return errorResponse

    // Een sessie aanmaken in de database is niet voldoende, we moeten de sessie ook doorgeven aan de gebruiken.
    // Hiervoor gebruiken we een cookie.
    const session = await DAL.startSession(user.id)
    await setSessionCookie(session)

    // De gebruiker is ingelogd, dus redirecten we naar de contactenpagina.
    redirect('/contacts')
  })
}

export async function signOut(): Promise<void> {
  const sessionId = await getSessionId()
  if (sessionId) {
    await DAL.stopSession(sessionId)
    await clearSessionCookie()
  }
}

export async function updateProfile(_prevState: ActionResponse, data: FormData): Promise<ActionResponse> {
  return formAction(updateUserSchema, data, async (data, profile) => {
    await DAL.updateUser(profile.id, data)
    revalidatePath('/', 'layout')
    revalidatePath('/account', 'page')
  })
}
