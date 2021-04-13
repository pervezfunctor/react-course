export const fetcher: (url: string) => Promise<any> = async url => {
  const res = await fetch(url)
  const data = await res.json()

  return data
}
