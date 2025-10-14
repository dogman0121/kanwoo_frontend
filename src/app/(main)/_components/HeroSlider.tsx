import pauseFunction from "@/lib/pauseFunction"

export default async function HeroSlider() {
    const pause = await pauseFunction(100)

    return (
        <>{pause}</>
    )
}