import { ImgHTMLAttributes } from "react";

export default function LinkImage({link, ...props}: {link: string} & ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img 
            src={`http://www.google.com/s2/favicons?domain=${new URL(link).hostname}&sx=24&type=svg`}
            {...props}
        />
    )
}