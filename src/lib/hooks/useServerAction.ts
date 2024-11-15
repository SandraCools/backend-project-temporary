import {useState} from 'react'

/**
 * Een eenvoudige utility hook die ons helpt bij het aanroepen van een server action.
 * Deze hook voorziet een wrapper rond de actie die bijhoudt of de actie al dan niet bezig is.
 *
 * @param action De server action.
 * @return Een 2-tuple met een boolean die aangeeft of de actie bezig is en een functie om de action aan te roepen.
 */
function useServerAction<T, R>(
  action: (params: T) => Promise<R>,
): [boolean, (params: T) => Promise<R | undefined>, R | undefined] {
  const [isPending, setIsPending] = useState(false)
  const [errors, setErrors] = useState<R>()

  const callServerAction = async (params: T): Promise<R> => {
    setIsPending(true)
    const returnValue = await action(params)
    setIsPending(false)
    setErrors(returnValue ?? undefined)
    return returnValue
  }

  return [isPending, callServerAction, errors]
}

export default useServerAction
