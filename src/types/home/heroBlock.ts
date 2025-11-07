interface HeroBlockManga {
    logo: string,
    name: string,
    background: string
}

export default interface HeroBlock {
    type: "manga" | "ad",
    data: HeroBlockManga
}