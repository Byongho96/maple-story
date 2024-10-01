/**
 * Random uuid generator with 21 symbols (A-Za-z0-9_-)
 * @returns string
 */
export function getUuid() {
  const alphabet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-'
  const id = []
  for (let i = 0; i < 21; i++) {
    id[i] = alphabet[(Math.random() * 64) | 0]
  }

  return id.join('')
}
