export default interface Profile {
    id: number,
    avatar: string
    slug: string
    name: string
    about: string,
    links: {name: string, link: string}[]
}