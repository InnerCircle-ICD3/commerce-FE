import { Fragment } from "react";

interface BannerCardProps {
    image: string;
    title: string;
    description: string;
}

export const BannerCard = ({ image, title, description }: BannerCardProps) => {
    // 줄바꿈을 HTML <br> 태그로 변환 (New라는 텍스트 다음에 나오는 문장을 한칸 밑으로 내려야 해서)
    const titleWithLineBreaks = title.split("\n").map((line, i) => {
        // 각 라인에 고유한 키 생성 (내용 + 인덱스의 조합으로 고유성 확보)
        const uniqueKey = `line-${i}-${line.substring(0, 10).replace(/\s+/g, "-")}`;

        return (
            <Fragment key={uniqueKey}>
                {i > 0 && <br />}
                {line}
            </Fragment>
        );
    });

    return (
        <article className="w-full h-full overflow-hidden text-center text-white rounded-xl bg-neutral-300">
            <div className="flex relative flex-col justify-between h-full">
                <div className="relative w-full h-[70%] overflow-hidden">
                    <img 
                        src={image} 
                        alt={title.replace(/\n/g, " ")} 
                        className="object-contain w-full h-full" 
                    />
                </div>
                <div className="relative p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <h2 className="text-2xl font-bold tracking-tight leading-9">{titleWithLineBreaks}</h2>
                    <p className="mt-3 text-sm tracking-tight leading-snug">{description}</p>
                </div>
            </div>
        </article>
    );
};
