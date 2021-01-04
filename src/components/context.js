let context = { index: 0 }

export const getContext = () => context
export const setContext = newCtx => (context = newCtx)
