export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatPhone(phone: string) {
  return phone.replace(/\s/g, '')
}
