import { YandexMetrikaInitParameters } from "./params";

interface YandexMetricaProps {
    id: number;
    initParameters: YandexMetrikaInitParameters;
}

export default function YandexMetrica({ id, initParameters }: YandexMetricaProps) {
    /* eslint-disable @next/next/no-img-element */
    return (
        <>
            <script type="text/javascript">
                {` (function(m,e,t,r,i,k,a){
                    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=110001347', 'ym');

                ym(${id}, 'init', ${JSON.stringify(initParameters)});
                `}
            </script>
            <noscript><div><img src="https://mc.yandex.ru/watch/110001347" style={{position: "absolute", left:"-9999px"}} alt="" /></div></noscript>
            
        </>
    )
}