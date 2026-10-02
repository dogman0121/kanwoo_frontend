interface SwipeAnimationStyles {
    translate: number
}

interface SwipeAnimationResults {
    direction: "prev" | "next"
    swiped: boolean,
    translate: number
}

interface SwipePointerCords {
    x: number,
    y: number
}

interface SwipeAnimationInterface {
    startCords: SwipePointerCords | null,
    lastCords: SwipePointerCords | null,
    lastCordsTimeMs: number | null,
    swipeAvailable: boolean,
    init: (windowWidth: number) => void,
    setScreenWidth: (windowWidth: number) => void
    start: (startCords: SwipePointerCords) => void,
    end: () => SwipeAnimationResults,
    process: (cords: SwipePointerCords) => SwipeAnimationStyles,
    destroy: () => void
}

export class SwipeAnimation implements SwipeAnimationInterface {
    SWITCH_BY_BOOST_THRESHOLD = 3
    SWITCH_BY_BOOST_SHIFT = 20
    SWITCH_BY_MOVE_THRESHOLD = 40

    startCords: SwipePointerCords | null
    screenWidth: number | null
    prevSlideAvailable: boolean
    nextSlideAvailable: boolean
    lastCords: SwipePointerCords | null
    lastCordsTimeMs: number | null
    swipeAvailable: boolean
    translation: number
    sign: number
    direction: "prev" | "next"

    constructor() {
        this.startCords = null
        this.screenWidth = null
        this.prevSlideAvailable = false
        this.nextSlideAvailable = false
        this.lastCords = null
        this.lastCordsTimeMs = null
        this.swipeAvailable = false
        this.translation = 0
        this.sign = 0
        this.direction = "next"
    }

    init(screenWidth: number) {
        this.setScreenWidth(screenWidth)
    }
    setScreenWidth(width: number) {
        this.screenWidth = width
    }
    setPrevSlideAvailable(prevSlideAvailable: boolean) {
        this.prevSlideAvailable = prevSlideAvailable
    }
    setNextSlideAvailable(nextSlideAvailable: boolean) {
        this.nextSlideAvailable = nextSlideAvailable
    }
    start(startCords: SwipePointerCords) {
        // console.log("start")
        this.startCords = startCords
        this.setLastCords(startCords, new Date().getTime())
        this.swipeAvailable = false
    }
    end(): SwipeAnimationResults {
        const swipeAvailable = this.swipeAvailable

        let dtranslate = 0
        let swiped = false
        if (swipeAvailable) {
            if (this.direction == "next" && this.nextSlideAvailable) {
                dtranslate = -100
                swiped = true
            }
            else if (this.direction == "prev" && this.prevSlideAvailable) {
                swiped = true
                dtranslate = 100
            }
        }
        this.translation = this.translation + dtranslate
        
        return {
            direction: this.direction,
            swiped: swiped,
            translate: this.translation
        }
    }
    setLastCords(cords: SwipePointerCords, timeMs: number) {
        this.lastCords = cords
        this.lastCordsTimeMs = timeMs
    }
    setTranslation(translation: number) {
        this.translation = translation
    }

    isSwipeAvailable(dx: number, translate: number, boost: number) {
        if (Math.abs(translate) > this.SWITCH_BY_MOVE_THRESHOLD) {
            return true
        } else if (boost > this.SWITCH_BY_BOOST_THRESHOLD && Math.abs(dx) > this.SWITCH_BY_BOOST_SHIFT) {
            return  true
        }

        return false
    }

    process(cords: SwipePointerCords): SwipeAnimationStyles {
        if (!this.startCords) throw new Error("No start cords for animation")
        if (!this.screenWidth) throw new Error("Failed to get window width")
        if (!this.lastCordsTimeMs || !this.lastCords) throw new Error("Failed to get last call data")

        const dx = cords.x - this.startCords.x
        const timeMs = new Date().getTime()
        const dxLastCall = cords.x - this.lastCords.x
        const dtLastCall = timeMs - this.lastCordsTimeMs

        const translate = dx / this.screenWidth * 100
        const boost = Math.abs(dxLastCall / dtLastCall)

        this.swipeAvailable = this.isSwipeAvailable(dx, translate, boost)

        this.setLastCords(cords, timeMs)

        this.direction = dx >= 0 ? "prev" : "next"
        this.sign = dx >= 0 ? -1 : 1
        if (this.direction == "prev" && this.prevSlideAvailable) {
            return {translate: this.translation + translate}
        } else if (this.direction == "next" && this.nextSlideAvailable) {
            return {translate: this.translation + translate}
        }

        return {translate: this.translation}
    }
    destroy() {

    }
}