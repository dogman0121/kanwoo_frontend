export default interface CurrentProfile {
    id: number,
    avatar: string
    slug: string
    name: string
    about: string,
    links: {name: string, link: string}[]
}
