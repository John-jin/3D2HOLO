import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import GiftMedia from "./GiftMedia";
import SectionBadge from "./SectionBadge";

const cards = [
  {
    href: "/zh/pet-3d-photo-gift",
    img: "/images/dog.jpg",
    videoSrc: "/videos/gift-pet.mp4",
    title: "宠物照片",
    desc: "一张最喜欢的照片就够——AI 把宠物的照片变成会动的 3D 打印。",
    width: 800,
    height: 1066,
  },
  {
    href: "/zh/fans",
    img: "/images/fans.jpg",
    videoSrc: "/videos/gift-fans.mp4",
    title: "粉丝同人 & 小卡",
    desc: "动漫画面、偶像照片和游戏原画，加上真实动效——为粉丝和收藏家。",
    width: 506,
    height: 900,
    objectPosition: "50% 20%",
  },
  {
    href: "/zh/sports-3d-photo-gift",
    img: "/images/nba.jpg",
    videoSrc: "/videos/nba.mp4",
    title: "运动 & NBA 瞬间",
    desc: "走动时会变化的海报——球馆效果，用你自己的照片。",
    width: 604,
    height: 900,
    objectPosition: "50% 15%",
  },
  {
    href: "/zh/custom-3d-photo",
    img: "/images/butterfly.jpg",
    videoSrc: "/videos/gift-birthday.mp4",
    title: "任意喜欢的照片",
    desc: "上传多角度序列或单张照片，浏览器里免费设计。",
    width: 673,
    height: 1206,
  },
];

export default function GiftSection() {
  return (
    <section id="gifts" className="overflow-hidden px-6 py-6 md:px-10 md:py-7">
      <div className="flex flex-col items-center gap-5 text-center">
        <SectionBadge>为送礼而生</SectionBadge>
        <h2 className="max-w-3xl text-3xl font-semibold text-slate-900 md:text-5xl">
          一张会被人珍藏的 3D 照片
        </h2>
        <p className="max-w-2xl text-[15px] leading-8 text-slate-600 md:text-[17px]">
          当对方倾斜照片、画面动起来的那一刻，它就不再是一张普通的打印——而是礼物本身。用你已有的照片就能做。
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative block overflow-hidden rounded-[30px] border border-slate-900/10 bg-white shadow-[0_20px_60px_-50px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-[4px] hover:bg-slate-50"
          >
            <GiftMedia
              src={card.img}
              videoSrc={card.videoSrc}
              alt={card.title}
              width={card.width}
              height={card.height}
              objectPosition={card.objectPosition}
              className="aspect-[4/3] w-full"
            />
            <div className="p-6">
              <h3 className="text-[19px] font-semibold leading-7 text-slate-900">
                {card.title}
              </h3>
              <p className="mt-3 text-[15px] leading-8 text-slate-600">
                {card.desc}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-cyan-700 transition group-hover:text-cyan-600">
                开始制作
                <ArrowIcon />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
