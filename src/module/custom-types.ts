/**
 * @description attachment element
 * @author itxve
 */

type EmptyText = {
  text: ''
}

export type AudioElement = {
  type: 'audio'
  src: string
  children: EmptyText[]
}
