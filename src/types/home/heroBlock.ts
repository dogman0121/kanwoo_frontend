interface HeroBlockManga {
    logo: string,
    name: string,
    background: string,
    slug: string
}

export default interface HeroBlock {
    type: "manga" | "ad",
    data: HeroBlockManga
}